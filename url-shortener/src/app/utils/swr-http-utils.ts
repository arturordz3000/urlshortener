const SHORTENER_SERVICE_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = process.env.NEXT_PUBLIC_SHORTENER_API_TOKEN;

export const doFetch = async (url: string, requestInit: RequestInit | undefined) => {
    return (await fetch(url, requestInit)).json();
}

export const getShortenerServiceEndpoint = () => {
    return SHORTENER_SERVICE_ENDPOINT;
}

export const getPostFetcher = (url: string | undefined) => {
    return async () => {
        const endpoint = `${getShortenerServiceEndpoint()}`;
        const request: RequestInit = {
            method: 'POST',
            body: JSON.stringify({ url }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + API_TOKEN, 
            },
        }

        return await doFetch(endpoint, request);
    }
}

export const getGetFetcher = (hash: string) => {
    return async () => {
        const endpoint = `${getShortenerServiceEndpoint()}/${hash}`;
        const request: RequestInit = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + API_TOKEN, 
            },
        }

        return await doFetch(endpoint, request);
    }
}