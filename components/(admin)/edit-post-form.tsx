"use client";

import useSWR from "swr";
import Image from "next/image";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { ValidationRule, useForm } from "react-hook-form";
import { Ban, FilePenLine, Loader, RefreshCw, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";

import { Post } from "@/lib/models/post-model";

import { formatId, fetcher } from "@/lib/utils";

export const EditPostForm = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const { toast } = useToast();

  const { data: post, error } = useSWR(`/api/admin/posts/${postId}`, fetcher);

  const { trigger: updatePost, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/posts/${postId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();

      if (!res.ok) {
        toast({
          title: data.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Публікацію оновлено" });
      router.push("/blog");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Post>();

  useEffect(() => {
    if (!post) return;
    setValue("title", post.title);
    setValue("description", post.description);
    setValue("images", post.images);
  }, [post, setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadHandler = async (e: any) => {
    const newImages = [...getValues("images")];

    try {
      const resSign = await fetch("/api/cloudinary-signin", { method: "POST" });
      const { signature, timestamp } = await resSign.json();

      const files = e.target.files;

      if (files.length + newImages.length > 20) {
        toast({
          title: "Ви можете завантажити максимум 20 зображень",
          variant: "destructive",
        });
        return;
      }

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        newImages.push(data.secure_url);
      }

      setValue("images", newImages as ["string"]);
      toast({ title: "Зображення успішно завантажено" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
      return;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formSubmit = async (formData: any) => {
    await updatePost(formData);
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
    placeholder,
  }: {
    id: keyof Post;
    name: string;
    required?: boolean;
    placeholder?: string;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="flex flex-col w-full">
      <Label htmlFor={id} className="mb-2">
        {errors[id]?.message ? (
          <p className="text-destructive">{errors[id]?.message}</p>
        ) : (
          <p>{name}</p>
        )}
      </Label>
      {name === "Description" ? (
        <Textarea
          id={id}
          {...register(id, {
            required: required && `${name} обов'язкове поле`,
          })}
          placeholder={placeholder}
          rows={8}
        />
      ) : (
        <Input
          type="text"
          id={id}
          {...register(id, {
            required: required && `* ${name} обов'язкове поле`,
            pattern,
          })}
          placeholder={placeholder}
          className="w-full"
        />
      )}
    </div>
  );

  if (error) return <p>{error.message}</p>;

  if (!post) return <Loader className="animate-spin" />;

  return (
    <Card className="w-full max-w-lg h-fit p-5">
      <CardHeader className="px-0 py-2">
        <CardTitle className="mb-4 flex justify-center items-center gap-4">
          <FilePenLine />
          Редагувати публікацію
        </CardTitle>
        <CardDescription className="flex items-center justify-between gap-8">
          <span>ID публікації:</span>
          <span>{formatId(postId)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 py-2">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <FormInput name="Title" id="title" required />
          <div className="space-y-2">
            <Label htmlFor="images">Виберіть зображення</Label>
            <div className="flex flex-wrap gap-2">
              {getValues("images")?.map((imageUrl: string, index: number) => (
                <div key={index} className="relative">
                  <Image
                    width={40}
                    height={40}
                    src={imageUrl}
                    alt={`image-${index}`}
                    className="object-cover aspect-square"
                  />
                  <Button
                    size="icon"
                    type="button"
                    variant="secondary"
                    className="p-0 w-6 h-6 absolute top-0 right-0 rounded-none text-muted-foreground hover:text-primary"
                    onClick={() => {
                      const updatedImages = getValues("images").filter(
                        (_, i) => i !== index
                      );
                      setValue("images", updatedImages as ["string"]);
                    }}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Input multiple type="file" id="imageFile" onChange={uploadHandler} />
          <FormInput name="Description" id="description" required />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/products")}
              className="flex-1"
            >
              <Ban />
              Відхилити
            </Button>
            <Button type="submit" disabled={isUpdating} className="flex-1">
              {isUpdating ? <Loader className="animate-spin" /> : <RefreshCw />}
              Оновити
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
