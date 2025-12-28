"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { SignInSchema, SignInSchemaType } from "@/schemas/user-auth.schema";
import { useAuthLogin } from "@/hooks/services/use-auth/fetcher";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const { trigger, isMutating } = useAuthLogin();
  const handleLogin = async (email: string, password: string) => {
    try {
      await trigger({ identifier: email, password });
      toast.success("Login successfully");
      router.replace("/dashboard");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const formik = useFormik<SignInSchemaType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Welcome Back</h1>
      <p>
        Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
      </p>
      <div>
        <Input
          placeholder="Example@email.com"
          label="Email"
          name="email"
          value={formik.values.email}
          error={formik.touched.email ? formik.errors.email : undefined}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          placeholder="Enter password"
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <p>Forgot Password</p>
      </div>
      <Button type="submit"> {isMutating && <Spinner />}Sign In</Button>
      <p>
        Don't have an account?{" "}
        <a href="/sign-up" className="">
          Sign Up
        </a>
      </p>
    </form>
  );
}
