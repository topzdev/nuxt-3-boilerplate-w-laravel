<script setup lang="ts">
const loading = ref(false);
import {type AuthCodeFlowErrorResponse, type AuthCodeFlowSuccessResponse, useTokenClient,} from "vue3-google-signin";

const auth = useAuthStore();
const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  console.log("Access Token: ", response.access_token);
  loading.value = true;
  await auth.oauthLogin('google', response.access_token);
  loading.value = false;
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const {isReady, login} = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});
</script>

<template>
  <Button :loading="loading" :disabled="loading || !isReady" @click="()=> login()" class="bg-blue-500">Login with Google</Button>
</template>


<style scoped>

</style>