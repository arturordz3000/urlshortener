import useSWR from "swr";
import { getGetFetcher } from "../utils/swr-http-utils";

export interface UseRedirectOutput {
    isLoading: boolean;
    error: any;
    data: any;
}

export const useRedirect = (hash: string) => {
    const { data, error, isLoading } = useSWR(hash, getGetFetcher(hash), {
        shouldRetryOnError: false,
    });

    return {
        isLoading,
        data,
        error
    };
}