export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Auth Middleware')
    const auth = useAuthStore();
    const authConfig = to.meta.auth;
    const isPublic = authConfig === false
    const isGuest = authConfig === 'guest';
    const isAuth = authConfig === true;
    const loginRoute = '/login';
    const authRoute = '/';


    // if auth = false then ignore the page still render
    if (authConfig === false) {
        return;
    }

    // if auth = 'guest' check if authenticated then redirect to auth pages
    if (isGuest && !auth.isLoggedIn) {
        return;
    }

    if (auth.isLoggedIn) {
        if (isGuest) {
            return navigateTo(authRoute, {
                replace: true
            })
        }
        return
    }

    // if (loginRoute && loginRoute === to.path) {
    //     return
    // }
    //

    // if auth = true check if unauthenticated then redirect to login page

    if (isAuth || authConfig === undefined) {
        if (auth.isLoggedIn) {
            return navigateTo(authRoute);
        } else {
            return navigateTo(loginRoute)
        }
        return;
    }

})
