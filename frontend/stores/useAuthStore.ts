import {defineStore} from 'pinia';
import {FetchContext, FetchResponse} from "ofetch";

export type Credentials = {
    email: string,
    password: string
}

export type RegisterInfo = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string
}

export type User = {
    id: number,
    provider: string | null,
    provider_id: number,
    firstname: string,
    lastname: string,
    email: string,
    email_verified_at: string,
    updated_at: string,
    created_at: string,
}

type LoginResponse = {
    user: User,
    access_token: string
}

export const useAuthStore = defineStore('auth', () => {
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter();

    const access_token  = useCookie('access_token');
    const user = useCookie('user')

    const isLoggedIn = computed(() => !!user.value);
    const fetchUser = async () => {
        const {data, error} = await useApiFetch<User>(`${runtimeConfig.public.apiUrl}/user`, {
            method: 'GET',
        })
        console.log(error)
        user.value = data.value;
    }

    const login = async (credentials: Credentials) => {
        console.log('Logging in...');
        const {data, error} = await useFetch(`${runtimeConfig.public.backendUrl}/login`, {
            method: 'POST',
            body: credentials,
            onResponse(context: FetchContext & { response: FetchResponse<R> }): Promise<void> | void {
                access_token.value = context.response._data.access_token
            }
        })
        console.log(error);
        await fetchUser();

        await router.push('/')
    }

    const oauthLogin = async (provider: 'google' | 'facebook', provider_access_token: string = '') => {
        console.log('Oauth login....')
        const {data, error} = await useFetch(`${runtimeConfig.public.backendUrl}/oauth`, {
            method: 'POST',
            body: {
                provider,
                access_token: provider_access_token
            },
            onResponse(context: FetchContext & { response: FetchResponse<any> }): Promise<void> | void {
                access_token.value = context.response._data.access_token
            }
        })
        console.log(error);
        await fetchUser();

        await router.push('/')
    }

    const register = async (info: RegisterInfo) => {
        console.log('Logging in...');
        const {data, error} = await useFetch(`${runtimeConfig.public.backendUrl}/register`, {
            method: 'POST',
            body: info,
            onResponse(context: FetchContext & { response: FetchResponse<any> }): Promise<void> | void {
                access_token.value = context.response._data.access_token
            }
        })
        console.log(error);
        // access_token.value = data.value.access_token;
        await fetchUser();

        await router.push('/')
    }

    const logout = async () => {
        await useApiFetch(`${runtimeConfig.public.backendUrl}/logout`, {
            method: 'POST'
        })
        access_token.value = null;
        user.value = null;

        await router.push('/login')
    }



    return {user, login, logout, fetchUser, register, access_token, isLoggedIn, oauthLogin}
})