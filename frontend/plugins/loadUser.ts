export default defineNuxtPlugin(async (nuxtApp) => {
    const auth = useAuthStore();

    if (!auth.isLoggedIn && auth.access_token) {
        await auth.fetchUser();
    }
})
