const SHORTENER_SERVICE_ENDPOINT = 'https://tinyurl.com/';
const API_TOKEN = process.env.SHORTENER_API_TOKEN;

export const doFetch = async (url: string, requestInit: RequestInit | undefined) => {
    return (await fetch(url, requestInit)).json();
}

export const getShortenerServiceEndpoint = () => {
    return SHORTENER_SERVICE_ENDPOINT;
}

export const  getPostFetcher = (body: any) => {
    return async () => {
        const request: RequestInit = {
            method: 'POST',
            body,
        }

        return await doFetch(`${getShortenerServiceEndpoint()}?api_token=${API_TOKEN}`, request);
    }
}