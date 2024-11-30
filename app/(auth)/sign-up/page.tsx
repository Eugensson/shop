import { Metadata } from "next";

import { SignUpForm } from "@/components/(auth)/signup-form";

export const metadata: Metadata = {
  title: "SignUp",
};

const SignUp = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <SignUpForm />
    </section>
  );
};

export default SignUp;
