"use client";

import React from "react";
import { useFetchArticleById } from "@/hooks/services/use-articles/fetcher";
import { useParams } from "next/navigation";
import ArticleForm from "../../_components/article-form";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading } = useFetchArticleById(id);
  const initialValues = {
    title: data?.title ?? "",
    description: data?.description ?? "",
    category: data?.category.id.toString() ?? "",
    cover_image_url: data?.cover_image_url ?? "",
  };
  return (
    <div>
      <div className="pb-4 pt-2">
        <h1>Edit User Management</h1>
      </div>
      <ArticleForm initialValues={initialValues} type="edit" idArticle={id} />
    </div>
  );
}
