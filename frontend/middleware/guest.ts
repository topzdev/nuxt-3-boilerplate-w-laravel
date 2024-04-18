export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Guest Middleware')
    const auth = useAuthStore();
    if (auth.isLoggedIn) {
        return navigateTo("/", {
            replace: true,
        })
    }
})
