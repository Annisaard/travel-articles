"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchAllArticle } from "@/hooks/services/use-articles/fetcher";
import { useFetchAllCategories } from "@/hooks/services/use-categories/fetcher";
import { useFetchAllComment } from "@/hooks/services/use-comment/fetcher";

import { ArrowUpRight, Inbox, ListCollapse, MessageCircle } from "lucide-react";
import { useState } from "react";
import { TopArticle } from "./_components/top-article";

export default function Dashboard() {
  const { data: allArticles } = useFetchAllArticle();
  const { data: allCategories } = useFetchAllCategories();
  const { data: allComment } = useFetchAllComment();

  const totalCategories = allCategories?.meta?.pagination.total ?? 0;
  const totalArticles = allArticles?.meta?.pagination?.total ?? 0;
  const totalComments = allComment?.meta?.pagination?.total ?? 0;

  const dashCardFeatures = [
    {
      title: "Total Articles",
      name: "articles",
      description: `Increase from last month`,
      total: totalArticles,
    },
    {
      title: "Total Categories",
      name: "categories",
      description: `Increase from last month`,
      total: totalCategories,
    },
    {
      title: "Total Comments",
      name: "comments",
      description: "Increase from last month",
      total: totalComments,
    },
  ];
  const topFiveMostComment = allArticles?.data
    ?.map((article: any) => ({
      ...article,
      commentCount: article?.comments?.length,
    }))
    ?.sort((a: any, b: any) => b.commentCount - a.commentCount)
    ?.slice(0, 5);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <h1 className="text-red-500 font-semibold text-2xl">Dashboard</h1>
        <p className="text-gray-300 text-sm">Congratulations . You got a great response today.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashCardFeatures.map((item) => (
          <Card className="gap-2" key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium text-green-400">{item.title}</CardTitle>
              <div className="p-2 border-green-400 rounded-full">
                <ArrowUpRight size={15} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-300">+ {item.total}</div>
              <p className="text-xs text-gray-50">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        {" "}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border border-sky-900">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {/* <Overview articles={allArticles?.data} period={selectedDate!} /> */}
            </CardContent>
          </Card>
          <Card className="col-span-3 border border-sky-900">
            <CardHeader>
              <CardTitle>Top 5 Articles</CardTitle>
              <CardDescription>base on most comments.</CardDescription>
            </CardHeader>
            <CardContent>
              <TopArticle items={topFiveMostComment} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
