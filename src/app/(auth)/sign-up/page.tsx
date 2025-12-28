"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { SignUpSchema, SignUpSchemaType } from "@/schemas/user-auth.schema";
import { useAuthRegister } from "@/hooks/services/use-auth/fetcher";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  const router = useRouter();
  const { trigger, isMutating } = useAuthRegister();
  const handleRegister = async (email: string, password: string, username: string) => {
    try {
      await trigger({ username, email, password });
      toast.success("Account created successfully");

      router.replace("/sign-in");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const formik = useFormik<SignUpSchemaType>({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      handleRegister(values.email, values.password, values.username);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-3xl font-semibold text-green-500 pb-1">
        Hi, Welcome to <span className="text-green-300 font-bold">Travelnesia</span>
      </h1>
      <p className="text-gray-50 text-xs">Start your new account</p>
      <div className="py-7 space-y-4">
        <Input
          placeholder="Enter your name"
          label="Username"
          name="username"
          value={formik.values.username}
          error={formik.touched.username ? formik.errors.username : undefined}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" className=" border-gray-50" />
          <Label htmlFor="terms" className="font-normal text-xs text-gray-50">
            I agree to the Terms and Conditions
          </Label>
        </div>
        <Button type="submit" className="w-full">
          {isMutating && <Spinner />}Sign Up
        </Button>
      </div>
      <div className="justify-center flex">
        <p className="text-green-500 text-sm"></p>{" "}
        <p>
          Already have an account?{" "}
          <a href="/sign-in" className="text-green-300 font-medium">
            Log In
          </a>
        </p>
      </div>
    </form>
  );
}
