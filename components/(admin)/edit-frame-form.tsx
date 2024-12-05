"use client";

import useSWR from "swr";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, FilePenLine, Loader, RefreshCw } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { useToast } from "@/hooks/use-toast";

import { fetcher } from "@/lib/utils";
import { Frame } from "@/lib/models/frame-model";

interface EditFrameFormProps {
  frameId: string;
  categories: string[];
}

export const EditFrameForm = ({ frameId, categories }: EditFrameFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: frame, error } = useSWR(
    `/api/admin/portfolio/${frameId}`,
    fetcher
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { trigger: updateFrame, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/portfolio/${frameId}`,
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

      toast({ title: "Frame updated successfully" });
      router.push("/portfolio");
    }
  );

  const { register, handleSubmit, setValue } = useForm<Frame>();

  useEffect(() => {
    if (!frame) return;
    const { title = "", description = "", image } = frame;

    setValue("title", title);
    setValue("description", description);
    setValue("category", selectedCategory);
    setValue("image", image);
    setImagePreview(image);
  }, [frame, selectedCategory, setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadHandler = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const resSign = await fetch("/api/cloudinary-signin", { method: "POST" });
      const { signature, timestamp } = await resSign.json();

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
      setValue("image", data.secure_url);
      setImagePreview(data.secure_url);
      toast({ title: "Image uploaded successfully" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formSubmit = async (formData: any) => {
    await updateFrame(formData);
  };

  const FormInput = ({ id, name }: { id: keyof Frame; name: string }) => (
    <div className="flex flex-col w-full">
      <Label htmlFor={id} className="mb-2">
        <p>{name}*</p>
      </Label>

      {name === "Description" ? (
        <Textarea id={id} {...register(id)} rows={6} />
      ) : (
        <Input type="text" id={id} {...register(id)} className="w-full" />
      )}
    </div>
  );

  if (error) return <p>{error.message}</p>;

  if (!frame) return <Loader className="animate-spin" />;

  return (
    <Card className="w-full max-w-xl h-fit py-5 px-10">
      <CardHeader className="px-0 py-2">
        <CardTitle className="mb-4 flex justify-center items-center gap-4">
          <FilePenLine />
          Edit frame
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-2">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">
              <p>Category</p>
            </Label>
            <Select
              disabled={isUpdating}
              name="category"
              required
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormInput name="Title" id="title" />
          <FormInput name="Description" id="description" />
          <div className="flex items-center gap-10">
            {imagePreview && (
              <Image
                width={80}
                height={80}
                src={imagePreview}
                alt="Image preview"
                className="object-cover aspect-square"
              />
            )}
            {frame.image === "/placeholder.png" && (
              <Input
                type="file"
                id="imageFile"
                onChange={uploadHandler}
                className="w-[220px] p-2"
              />
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/portfolio")}
              className="flex-1"
            >
              <Ban />
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating} className="flex-1">
              {isUpdating ? <Loader className="animate-spin" /> : <RefreshCw />}
              Update
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-0 gap-2">
        <Separator className="mt-4" />
        <p className="text-xs text-muted-foreground">
          * Поле не є обов&apos;язковим до заповнення
        </p>
      </CardFooter>
    </Card>
  );
};
