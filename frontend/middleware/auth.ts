export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Auth Middleware')
    const auth = useAuthStore();

    if (!auth.isLoggedIn) {
       return navigateTo("/login", {
           replace: true,
       })
    }
})
