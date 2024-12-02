"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AtSign, Eye, EyeOff, Key, Loader, LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SocialBtn } from "./social-btn";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Inputs = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, searchParams, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <Card className="h-fit flex flex-col justify-between w-full max-w-lg px-5">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-center gap-x-2 text-2xl font-semibold uppercase">
          <LockKeyhole size={24} />
          Auth
        </CardTitle>
        <CardDescription className="text-center">Welcome back!</CardDescription>
        {searchParams.get("error") && (
          <div className="alert text-error">
            {searchParams.get("error") === "CredentialsSignin"
              ? "Invalid email or password"
              : searchParams.get("error")}
          </div>
        )}
        {searchParams.get("success") && (
          <div className="alert text-success">
            {searchParams.get("success")}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="h-full flex flex-col gap-4"
        >
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

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting && <Loader className="animate-spin" />}Sign in
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <SocialBtn />
        <Button variant="link" asChild>
          <Link className="link" href={`/sign-up?callbackUrl=${callbackUrl}`}>
            Don&apos;t have an account?
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
