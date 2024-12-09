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
      const res = await fetch("/api/auth/sign-up", {
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
          `/sign-in?callbackUrl=${callbackUrl}&success=Account has been created`
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
          Реєстрація
        </CardTitle>
        <CardDescription className="text-center">
          Створити аккаунт
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
                <p>Ім&apos;я користувача</p>
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
                  required: "Ім'я користувача - обов'язкове поле",
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
          <>
            <Label htmlFor="confirmPassword" className="text-xs">
              {errors.confirmPassword?.message ? (
                <p className="text-destructive">
                  {errors.confirmPassword.message}
                </p>
              ) : (
                "Підтвердження пароля"
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
                  required: "Обов'язкове до заповнення поле",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Паролі повинні співпадати!";
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
            {isSubmitting && <Loader className="animate-spin" />}Створити
            аккаунт
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <SocialBtn />
        <Button variant="link" asChild>
          <Link className="link" href={`/sign-in?callbackUrl=${callbackUrl}`}>
            Маєте обліковий запис?
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
