import { apiCall } from "@/lib/axios";
import { fetcher, fetcherPost, fetcherPut } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import configs from "@/hooks/services/config";
import { buildQuery } from "@/lib/utils";
import { ArticlePayload, ArticleQueryParams, ArticleResponseType } from "./types";

export const useFetchAllArticle = (params?: ArticleQueryParams) => {
  const query = buildQuery(params);
  const url = query ? `${configs.endpointArticle}?${query}` : configs.endpointArticle;
  const { data, error, isLoading } = useSWR<ArticleResponseType>(url, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  return {
    data,
    error,
    isLoading,
  };
};

export const useFetchArticleById = (id: string) => {
  const { data, error, isLoading } = useSWR(`${configs.endpointArticle}/${id}`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  return {
    data,
    error,
    isLoading,
  };
};
export const deleteArticle = async (id: string) => {
  try {
    const { data } = await apiCall.delete(`${configs.endpointArticle}/${id}`);
    return data;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export const useCreateArticle = () => {
  const { data, error, trigger, isMutating } = useSWRMutation(configs.endpointArticle, fetcherPost);
  const payload: ArticlePayload = data || [];
  return {
    data: payload,
    error,
    createArticle: trigger,
    isLoading: isMutating,
  };
};

export const useUpdateArticle = (id: string) => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    `${configs.endpointArticle}/${id}`,
    fetcherPut,
  );
  const payload: ArticlePayload = data || [];
  return {
    data: payload,
    error,
    updateArticle: trigger,
    isLoading: isMutating,
  };
};
