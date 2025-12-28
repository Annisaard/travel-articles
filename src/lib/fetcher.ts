import { apiCall } from "./axios";
import { handleError } from "@/lib/utils";

export const fetcher = (url: string) => apiCall.get(url).then((res: any) => res.data);

export const fetcherPost = async (url: string, { arg }: { arg: unknown }) => {
  try {
    const res = await apiCall.post(url, arg);
    return res.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const fetcherPut = async (url: string, { arg }: { arg: unknown }) => {
  try {
    const res = await apiCall.put(url, arg);
    return res.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
