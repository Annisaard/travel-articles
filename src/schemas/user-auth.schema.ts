import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Required field"),
  password: Yup.string().required("Required field"),
});
export type SignInSchemaType = Yup.InferType<typeof SignInSchema>;

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Required field"),
  username: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
});
export type SignUpSchemaType = Yup.InferType<typeof SignUpSchema>;
