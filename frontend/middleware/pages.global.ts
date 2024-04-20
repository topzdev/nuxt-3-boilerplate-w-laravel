export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Auth Middleware')
    const auth = useAuthStore();

    if (!(to.path === '/update-user')) {
        if (auth.user && auth.user.is_facebook_registered) {
            return navigateTo('/update-user');
        }
    }

    return ;
})
