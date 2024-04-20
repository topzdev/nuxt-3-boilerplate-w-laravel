<script lang="ts" setup>

const auth = useAuthStore();
const loading = ref(false);
const handleLogout = async () => {
  loading.value = true
  await auth.logout();
  loading.value = false
}

</script>

<template>
  <NuxtLoadingIndicator />
  <div class="">
    <div class="flex w-full justify-center gap-x-5 py-4">
      <nuxt-link href="/">Home</nuxt-link>
      <nuxt-link href="/guest-only">Guest Only</nuxt-link>
      <nuxt-link href="/auth-only">Auth Only</nuxt-link>
      <nuxt-link href="/public-only">Public Only</nuxt-link>
      <nuxt-link href="/login">Login</nuxt-link>
      <nuxt-link href="/register">Register</nuxt-link>

      <Button :loading="loading" :disabled="loading" v-if="auth.isLoggedIn" color="destruction" class="absolute right-2 top-2" @click="handleLogout">Logout</Button>
    </div>
    <div class="w-[500px] absolute top-2 left-2 mx-auto" v-if="auth.isLoggedIn">
      <pre>
      {{ auth.user }}
      </pre>
    </div>
    <slot/>
  </div>
</template>

<style scoped></style>
