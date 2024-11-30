"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AtSign,
  Eye,
  EyeOff,
  Key,
  Loader,
  LockKeyhole,
  User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialBtn } from "@/components/(auth)/social-btn";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, searchParams, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        );
      } else {
        const data = await res.json();

        throw new Error(data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "Email is duplicate"
          : err.message;

      toast({
        variant: "destructive",
        title: error || "error",
      });
    }
  };

  return (
    <Card className="h-fit flex flex-col justify-between w-full max-w-lg px-5">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-center gap-x-2 text-2xl font-semibold uppercase">
          <LockKeyhole size={24} />
          Auth
        </CardTitle>
        <CardDescription className="text-center">
          Create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="h-full flex flex-col gap-4"
        >
          <>
            <Label htmlFor="name" className="text-xs">
              {errors.name?.message ? (
                <p className="text-destructive">{errors.name.message}</p>
              ) : (
                <p>Name</p>
              )}
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                autoComplete="off"
                placeholder="Joe Doe"
                className="pl-10"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <User
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </>
          <>
            <Label htmlFor="email" className="text-xs">
              {errors.email?.message ? (
                <p className="text-destructive">{errors.email.message}</p>
              ) : (
                "Email"
              )}
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="text"
                autoComplete="off"
                placeholder="joe.doe@example.com"
                className="pl-10"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Email is invalid",
                  },
                })}
              />
              <AtSign
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </>
          <>
            <Label htmlFor="password" className="text-xs">
              {errors.password?.message ? (
                <p className="text-destructive">{errors.password.message}</p>
              ) : (
                "Password"
              )}
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="******"
                autoComplete="off"
                type={isVisiblePassword ? "text" : "password"}
                className="px-10"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <Key
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              {isVisiblePassword ? (
                <EyeOff
                  size={20}
                  onClick={() =>
                    setIsVisiblePassword((prevState) => !prevState)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              ) : (
                <Eye
                  size={20}
                  onClick={() =>
                    setIsVisiblePassword((prevState) => !prevState)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </>
          <>
            <Label htmlFor="confirmPassword" className="text-xs">
              {errors.confirmPassword?.message ? (
                <p className="text-destructive">
                  {errors.confirmPassword.message}
                </p>
              ) : (
                "Confirm Password"
              )}
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="off"
                placeholder="******"
                className="pl-10"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                })}
              />
              <Key
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting && <Loader className="animate-spin" />}Create an
            account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <SocialBtn />
        <Button variant="link" asChild>
          <Link className="link" href={`/sign-in?callbackUrl=${callbackUrl}`}>
            Already have an account?
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
