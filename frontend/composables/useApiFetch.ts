import {type UseFetchOptions, useRequestHeaders} from "nuxt/app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
    const runtimeConfig = useRuntimeConfig();
    let headers: any = {
        referer: 'http://127.0.0.1:8000'
    };
    const access_token = useCookie('access_token');

    if (access_token.value) {
        headers['Authorization'] = `Bearer ${access_token.value}`
    }

    if (process.server) {
        headers = {
            ...headers,
        }
    }
    console.log('Headers', headers);
    return useFetch(`${runtimeConfig.public.apiUrl}${path}`, {
        watch: false,
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    })

}
