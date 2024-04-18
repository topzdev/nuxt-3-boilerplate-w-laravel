// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'shadcn-nuxt',  'nuxt-vue3-google-signin'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    public: {
      backendUrl: '', // can be overridden by NUXT_PUBLIC_BACKEND_URL environment variable,
      apiUrl: '', // can be overridden by NUXT_PUBLIC_API_URL environment variable,
      facebookAppId : '', // can be overridden by NUXT_PUBLIC_FACEBOOK_APP_ID environment variable,
    }
  },
  //@ts-ignore
  googleSignIn: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  }
})
