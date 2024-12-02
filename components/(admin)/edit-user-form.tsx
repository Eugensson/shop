"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { Ban, Loader, RefreshCw, UserPen } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { ValidationRule, useForm } from "react-hook-form";

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

import { useToast } from "@/hooks/use-toast";

import { formatId } from "@/lib/utils";
import { User } from "@/lib/models/user-model";
import { Switch } from "@/components/ui/switch";

export const EditUserForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const { toast } = useToast();

  const { data: user, error } = useSWR(`/api/admin/users/${userId}`);

  const { trigger: updateUser, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/users/${userId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();

      if (!res.ok) toast({ title: data.message, variant: "destructive" });

      toast({ title: "User updated successfully" });

      router.push("/users");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<User>();

  useEffect(() => {
    if (!user) return;
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("isAdmin", user.isAdmin);
  }, [user, setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formSubmit = async (formData: any) => {
    await updateUser(formData);
  };

  if (error) return <p>{error.message}</p>;

  if (!user) return <Loader className="animate-spin" />;

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof User;
    name: string;
    required?: boolean;
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
      <Input
        type="text"
        id={id}
        {...register(id, {
          required: required && `* ${name} is required`,
          pattern,
        })}
        className="w-full"
      />
    </div>
  );

  return (
    <Card className="w-full max-w-md h-fit p-5">
      <CardHeader>
        <CardTitle className="mb-8 flex justify-center items-center gap-4">
          <UserPen />
          Edit User
        </CardTitle>
        <CardDescription className="flex items-center justify-between gap-8 mb-8">
          <span> UserID:</span>
          <span>{formatId(userId)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-8">
          <FormInput name="Name" id="name" required />
          <FormInput name="Email" id="email" required />

          <Label className="flex items-center gap-3">
            Admin
            <Switch
              id="isAdmin"
              checked={!!watch("isAdmin")}
              onCheckedChange={(checked) => setValue("isAdmin", checked)}
            />
          </Label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/users")}
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
    </Card>
  );
};
