"use client";

import LoadMore from "@/components/load-more";
import { NextImage } from "@/components/next-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useFetchAllArticle } from "@/hooks/services/use-articles/fetcher";
import { ArticleQueryParams, ArticleType } from "@/hooks/services/use-articles/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [search, setSearch] = useState("");

  const params: ArticleQueryParams = {
    "pagination[page]": page,
    "pagination[pageSize]": 10,
    populate: "*",
  };

  const { data: dataArticle, isLoading } = useFetchAllArticle(params);

  useEffect(() => {
    if (!dataArticle?.data) return;

    setArticles((prev) => [...prev, ...dataArticle.data]);

    const pagination = dataArticle.meta?.pagination;
    if (pagination && page >= pagination.pageCount) {
      setHasMore(false);
    }
  }, [dataArticle, page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Article</h1>
        <Button onClick={() => router.push("/articles/add")}>+ Add Article</Button>
      </div>
      <div>
        <Input
          label={""}
          name="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<LoadMore />}
        endMessage={<p className="text-center text-gray-600 py-4">No more articles to load.</p>}
      >
        <div className="flex flex-col gap-3">
          {articles.map((item) => (
            <Card key={item.id} className="flex gap-3 p-3">
              <NextImage
                src={item.cover_image_url}
                width={40}
                height={40}
                className="rounded-sm object-cover h-10 w-10"
                alt={item.title}
              />

              <div className="space-y-1">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-500">Creator: {item.user?.username}</p>
                <p className="text-sm line-clamp-2">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
