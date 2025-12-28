import { SelectField } from "@/components/fragments/SelectField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateArticle } from "@/hooks/services/use-articles/fetcher";
import { useFetchAllCategories } from "@/hooks/services/use-categories/fetcher";
import { ArticleSchema, ArticleSchemaType } from "@/schemas/article.schema";
import { useFormik } from "formik";
import React from "react";
import { toast } from "sonner";

type ArticleFormType = {
  initialValues: ArticleSchemaType;
  type: "edit" | "add";
};
export default function ArticleForm({ initialValues, type }: ArticleFormType) {
  const { createArticle, isLoading } = useCreateArticle();
  const { data: dataCategory, isLoading: loadingCategories } = useFetchAllCategories();
  const formik = useFormik<ArticleSchemaType>({
    initialValues,
    validationSchema: ArticleSchema,
    onSubmit: async (values) => {
      try {
        await createArticle({
          data: {
            title: values.title,
            description: values.description,
            cover_image_url: values.cover_image_url,
            category: values.category,
          },
        });
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
  });

  const categories =
    dataCategory?.data.map((item: any) => ({
      label: item.name,
      value: item.id?.toString(),
    })) ?? [];
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <Input
        label="Title"
        name="title"
        placeholder="Input title"
        value={formik.values.title}
        error={formik.touched.title ? formik.errors.title : undefined}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Textarea
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <div>
        <label htmlFor="cover_image_url" className="block text-sm font-medium text-gray-700">
          Cover Image
        </label>
        {/* <ImageUpload onImageUpload={handleImageUpload} />
        {formData.cover_image_url && (
          <img src={formData.cover_image_url} alt="Cover Preview" className="mt-2 w-64" />
        )} */}
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        {loadingCategories ? (
          <div className="mt-1 text-sm text-gray-500">Loading categories...</div>
        ) : (
          <SelectField
            items={categories}
            placeholder="Select category"
            value={formik.values.category}
            onValueChange={(value) => {
              formik.setFieldValue("category", value);
            }}
          />
        )}
      </div>
    </form>
  );
}
