const SHORTENER_SERVICE_ENDPOINT = 'https://localhost:3001';
const API_TOKEN = process.env.NEXT_PUBLIC_SHORTENER_API_TOKEN;

export const doFetch = async (url: string, requestInit: RequestInit | undefined) => {
    return (await fetch(url, requestInit)).json();
}

export const getShortenerServiceEndpoint = () => {
    return SHORTENER_SERVICE_ENDPOINT;
}

export const  getPostFetcher = (body: any) => {
    return async () => {
        const url = `${getShortenerServiceEndpoint()}create`;
        const request: RequestInit = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + API_TOKEN, 
            },
        }

        return await doFetch(url, request);
    }
}