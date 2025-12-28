import { apiCall } from "@/lib/axios";
import { fetcher, fetcherPost, fetcherPut } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import configs from "@/hooks/services/config";
import { CategoryPayload } from "./types";

export const useFetchAllCategories = () => {
  const { data, error, isLoading } = useSWR(`${configs.endpointCategories}`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  return {
    data,
    error,
    isLoading,
  };
};

export const useFetchCategoriesById = (id: string) => {
  const { data, error, isLoading } = useSWR(`${configs.endpointCategories}/${id}`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  return {
    data,
    error,
    isLoading,
  };
};
export const deleteCategories = async (id: string) => {
  try {
    const { data } = await apiCall.delete(`${configs.endpointCategories}/${id}`);
    return data;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export const useCreateCategories = () => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    configs.endpointCategories,
    fetcherPost,
  );
  const payload: CategoryPayload = data || [];
  return {
    data: payload,
    error,
    createArticle: trigger,
    isLoading: isMutating,
  };
};

export const useUpdateCategories = (id: string) => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    `${configs.endpointCategories}/${id}`,
    fetcherPut,
  );
  const payload: CategoryPayload = data || [];
  return {
    data: payload,
    error,
    updateArticle: trigger,
    isLoading: isMutating,
  };
};
