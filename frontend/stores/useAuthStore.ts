import {defineStore} from 'pinia';
import {type FetchContext, type FetchResponse} from "ofetch";

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

export type UpdateUser =  Pick<User,  'email' | 'firstname' | 'lastname'>

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
    is_facebook_registered?: boolean,
}

type LoginResponse = {
    user: User,
    access_token: string
}

export const useAuthStore = defineStore('auth', () => {
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter();

    const access_token = useCookie<string | null>('access_token');
    const user = useCookie<User | null>('user')

    const isLoggedIn = computed(() => !!user.value);
    const fetchUser = async () => {
        const {data, error} = await useApiFetch<User>(`/user`, {
            method: 'GET',
        })

        if (error.value) {
            throw error.value.data;
        }
        // @ts-ignore;
        user.value = data.value;
    }

    const updateUser = async (info: UpdateUser) => {
        const {data, error} = await useApiFetch<User>(`/update-user`, {
            method: 'POST',
            body: info,
        })

        if (error.value) {
            throw error.value.data;
        }
        await fetchUser();
        await router.push('/')
    }


    const login = async (credentials: Credentials) => {
        console.log('Logging in...');
        const {data, error} = await useFetch<LoginResponse>(`${runtimeConfig.public.backendUrl}/login`, {
            method: 'POST',
            body: credentials,
            onResponse(context: FetchContext & { response: FetchResponse<LoginResponse> }): Promise<void> | void {
                access_token.value = context.response._data.access_token
            }
        })

        if (error.value) {
            throw error.value.data;
        }
        await fetchUser();

        await router.push('/')
    }

    const oauthLogin = async (provider: 'google' | 'facebook', provider_access_token: string = '') => {
        console.log('Oauth login....')
        const {data, error} = await useFetch(`${runtimeConfig.public.backendUrl}/oauth`, {
            method: 'POST',
            watch: false,
            body: {
                provider,
                access_token: provider_access_token
            },
            onResponse(context: FetchContext & { response: FetchResponse<any> }): Promise<void> | void {
                access_token.value = context.response._data.access_token
            }
        })

        if (error.value) {
            throw error.value.data;
        }

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


        if (error.value) {
            throw error.value.data;
        }

        // access_token.value = data.value.access_token;
        await fetchUser();

        await router.push('/')
    }

    const logout = async () => {
        await useApiFetch(`/logout`, {
            method: 'POST'
        })
        access_token.value = null;
        user.value = null;

        await router.push('/login')
    };



    return {user, login, logout, fetchUser, register, access_token, isLoggedIn, oauthLogin, updateUser}
})