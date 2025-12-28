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
      <h1 className="text-3xl font-semibold text-green-500 pb-1">Welcome Back</h1>
      <p className="text-gray-50 text-sm">
        Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
      </p>
      <div className="py-7 space-y-4">
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
        <div className="flex justify-end">
          <p className="text-sm text-green-300">Forgot Password?</p>
        </div>
        <Button type="submit" className="w-full">
          {isMutating && <Spinner />}Sign In
        </Button>
      </div>
      <div className="justify-center flex">
        <p className="text-green-500 text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-green-300 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}
