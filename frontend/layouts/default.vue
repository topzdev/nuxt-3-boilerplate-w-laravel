<script lang="ts" setup>

const auth = useAuthStore();

const handleLogout = async () => {
  await auth.logout();
}

</script>

<template>
  <div>
    <template v-if="auth.isLoggedIn">
      <Button color="destruction" @click="handleLogout">Logout</Button>
      {{auth.user}}
    </template>
    <slot/>
  </div>
</template>

<style scoped></style>
