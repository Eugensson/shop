import { Metadata } from "next";

import { SignInForm } from "@/components/(auth)/signin-form";

export const metadata: Metadata = {
  title: "SignIn",
};

const SignIn = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <SignInForm />
    </section>
  );
};

export default SignIn;
