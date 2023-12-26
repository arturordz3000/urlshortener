import { useCallback, useState } from "react";
import useSWR from 'swr';
import { getPostFetcher } from "../utils/swr-http-utils";

export interface UseShortenerOutput {
    shorten: (url: string | undefined) => void;
    restart: () => void,
    url: string | undefined,
    isLoading: boolean;
    error: any;
    data: any;
}

export const useShortener = (): UseShortenerOutput => {
    const [url, setUrl] = useState<string | undefined>(undefined);

    const { data, error, isLoading } = useSWR(url, getPostFetcher({url}), {
        shouldRetryOnError: false,
    });

    const shorten = useCallback((url: string | undefined) => {
        setUrl(url);
    }, [setUrl]);

    const restart = useCallback(() => {
        setUrl(undefined);
    }, [setUrl]);

    return {
        shorten,
        restart,
        data,
        error,
        isLoading,
        url
    };
}