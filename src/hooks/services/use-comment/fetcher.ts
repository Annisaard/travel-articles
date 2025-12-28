import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import configs from "@/hooks/services/config";
import { buildQuery } from "@/lib/utils";

export type CommentQueryParams = {
  "pagination[page]"?: number;
  "pagination[pageSize]"?: number;
  "populate[article]"?: string;
  "sort[0]"?: string;
  "populate[user]?": string;
};
export const useFetchAllComment = (params?: CommentQueryParams) => {
  const query = buildQuery(params);
  const url = query ? `${configs.endpointComment}?${query}` : configs.endpointComment;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  return {
    data,
    error,
    isLoading,
  };
};
