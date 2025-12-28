import * as Yup from "yup";

export const ArticleSchema = Yup.object().shape({
  title: Yup.string().email().required("Required field"),
  description: Yup.string().required("Required field"),
  cover_image_url: Yup.string(),
  category: Yup.string().required("Required field"),
});

export type ArticleSchemaType = Yup.InferType<typeof ArticleSchema>;
