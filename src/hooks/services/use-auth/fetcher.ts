import { apiCall } from "@/lib/axios";
import Cookies from "js-cookie";
import { fetcherPost } from "@/lib/fetcher";
import { LoginPayload, RegisterPayload } from "./types";
import useSWRMutation from "swr/mutation";
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from "@/lib/constants";
import configs from "@/hooks/services/config";
import { handleError } from "@/lib/utils";

export const loginService = async (url: string, { arg }: { arg: LoginPayload }) => {
  try {
    const res = await apiCall.post(url, arg);

    const { jwt, user } = res.data;

    Cookies.set(ACCESS_TOKEN_KEY, jwt);
    Cookies.set(USER_ID_KEY, JSON.stringify(user));

    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const useAuthLogin = () => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    `${configs.endpointAuth}`,
    loginService,
  );
  const payload: LoginPayload = data || [];
  return {
    data: payload,
    error,
    trigger,
    isMutating,
  };
};

export const useAuthRegister = () => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    `${configs.endpointAuth}/register`,
    fetcherPost,
  );
  const payload: RegisterPayload = data || [];
  return {
    data: payload,
    error,
    trigger,
    isMutating,
  };
};
