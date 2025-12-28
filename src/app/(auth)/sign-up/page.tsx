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
      <h1>Hi, Welcome to Travelnesia</h1>
      <p>Start your new account</p>
      <div>
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
          <Checkbox id="terms" />
          <Label htmlFor="terms">I agree to the Terms and Conditions</Label>
        </div>
      </div>
      <Button type="submit"> {isMutating && <Spinner />}Sign Up</Button>
      <p>
        Already have an account?
        <a href="/sign-in" className="">
          Log In
        </a>
      </p>
    </form>
  );
}
