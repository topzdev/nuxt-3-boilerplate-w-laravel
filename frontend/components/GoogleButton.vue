<script setup lang="ts">
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

const auth = useAuthStore();
const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  console.log("Access Token: ", response.access_token);
  await auth.oauthLogin('google', response.access_token);
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});
</script>

<template>
  <div>
    <Button :disabled="!isReady" @click="()=> login()" class="bg-blue-500">Login with Google</Button>
  </div>
</template>


<style scoped>

</style>