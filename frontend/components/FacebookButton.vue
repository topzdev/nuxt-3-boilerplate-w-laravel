<template>
  <Button :loading="loading" :disabled="loading" class="bg-blue-500" @click="logInWithFacebook">Login with Facebook</Button>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const auth = useAuthStore();
const loading = ref(false);

function logInWithFacebook() {
  window.FB.login(function (response: any) {
    if (response.authResponse) {
      // Now you can redirect the user or do an AJAX request
      // here I sent authResponse From Facebook to My Request API
      SocialLogin(response.authResponse)
    } else {
      console.log('User cancelled login or did not fully authorize.')
    }
  })
  return false
}

function initFacebook() {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: config.public.facebookAppId, //App ID, You will need to change this
      cookie: true, // This is important, it's not enabled by default
      xfbml: true,
      version: 'v11.0' // version v16.0
    })
  }
}

function loadFacebookSDK(d: any, s: any, id: any) {
  const fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  const js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}

async function SocialLogin(response: any) {
  loading.value = true;
  await auth.oauthLogin('facebook', response.accessToken);
  loading.value = false;
}

onMounted(() => {
  loadFacebookSDK(document, 'script', 'facebook-jssdk')
  initFacebook()
  // if (this.$store.state.auth.redirect) {
  //   localStorage.setItem('redirect', this.$store.state.auth.redirect)
  // }
  window.SocialLogin = SocialLogin
})


</script>

<style scoped>

</style>