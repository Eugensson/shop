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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialBtn } from "@/components/(auth)/social-btn";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

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
          Логування
        </CardTitle>
        <CardDescription className="text-center">
          З поверненням!
        </CardDescription>
        {searchParams.get("error") && (
          <div className="alert text-error">
            {searchParams.get("error") === "CredentialsSignin"
              ? "Помилкові дані електронної пошти або пароля"
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
                "Електронна пошта"
              )}
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="text"
                autoComplete="off"
                placeholder="example@mail.com"
                className="pl-10"
                {...register("email", {
                  required: "Електронна пошта - обов'язкове поле",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Не вірний формат електронної пошти",
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
                "Пароль"
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
                  required: "Пароль - обов'язкове поле",
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
            {isSubmitting && <Loader className="animate-spin" />}Вхід
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <SocialBtn />
        <Button variant="link" asChild>
          <Link className="link" href={`/sign-up?callbackUrl=${callbackUrl}`}>
            Не маєте облікового запису?
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
