"use client";

import React from "react";
import ArticleForm from "../_components/article-form";

export default function Page() {
  const initialValues = {
    title: "",
    description: "",
    category: "",
    cover_image_url: "",
  };
  return (
    <div>
      <div className="pb-4 pt-2">
        <h1>Create User Management</h1>
      </div>
      <ArticleForm initialValues={initialValues} type="add" />
    </div>
  );
}
