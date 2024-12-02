"use client";

import {
  AtSign,
  Ban,
  Eye,
  EyeOff,
  Key,
  Loader,
  RefreshCw,
  User,
  UserCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const EditProfileForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue("name", session.user.name!);
      setValue("email", session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        toast({
          title: "Profile updated successfully",
        });
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };
        await update(newSession);
      } else {
        const data = await res.json();
        toast({
          title: data.message || "error",
          variant: "destructive",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast({
        title: error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-fit flex flex-col justify-between w-full max-w-lg px-5">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-center gap-x-2 text-2xl font-semibold capitalize text-muted-foreground">
          <UserCog size={28} />
          Profile info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-4"
        >
          <Label htmlFor="name" className="text-xs space-y-1">
            {errors.name?.message ? (
              <span className="text-xs text-destructive">
                {errors.name.message}
              </span>
            ) : (
              <span>Name</span>
            )}
            <div className="relative">
              <Input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
                className={cn(
                  "pl-10",
                  errors.name?.message ? "border-destructive" : ""
                )}
              />
              <User
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </Label>
          <Label htmlFor="email" className="text-xs space-y-1">
            {errors.email?.message ? (
              <span className="text-xs text-destructive">
                {errors.email.message}
              </span>
            ) : (
              <span>Email</span>
            )}
            <div className="relative">
              <Input
                type="text"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Email is invalid",
                  },
                })}
                className={cn(
                  "pl-10",
                  errors.email?.message && "border-destructive"
                )}
              />
              <AtSign
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </Label>
          <Label htmlFor="password" className="text-xs space-y-1">
            {errors.confirmPassword?.message ? (
              <span className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </span>
            ) : (
              <span>New Password</span>
            )}
            <div className="relative">
              <Input
                type={isVisiblePassword ? "text" : "password"}
                id="password"
                {...register("password", {})}
                className={cn(
                  "pl-10",
                  errors.confirmPassword?.message && "border-destructive"
                )}
              />
              <Key
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              {isVisiblePassword ? (
                <EyeOff
                  size={20}
                  onClick={() => setIsVisiblePassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                />
              ) : (
                <Eye
                  size={20}
                  onClick={() => setIsVisiblePassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                />
              )}
            </div>
          </Label>
          <Label htmlFor="confirmPassword" className="text-xs space-y-1">
            {errors.confirmPassword?.message ? (
              <span className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </span>
            ) : (
              <span>Confirm New Password</span>
            )}
            <div className="relative">
              <Input
                type={isVisiblePassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    return (
                      password === value ||
                      "New Password and Confirm New Password should match!"
                    );
                  },
                })}
                className={cn(
                  "pl-10",
                  errors.confirmPassword?.message && "border-destructive"
                )}
              />
              <Key
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </Label>

          <div className="flex items-center gap-4 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/")}
              className="flex-1"
            >
              <Ban />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <RefreshCw />
              )}
              Update
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
