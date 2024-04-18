<script setup lang="ts">
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {definePageMeta} from "#imports";

definePageMeta({
  middleware: ['guest']
})

const auth = useAuthStore();

const {user, access_token, isLoggedIn} = storeToRefs(auth);

const credentials = ref({
  firstname: "Christian",
  lastname: "Lugod",
  email: "christianlugod05@gmail.com",
  password: "2559069dev",
  password_confirmation: "2559069dev"
})

const handleSubmit = async () => {
  try {
    await auth.register(credentials.value);
  } catch (e) {
    console.log(e.error);
  }
}

</script>

<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="grid w-full max-w-sm items-center gap-1.5 mx-auto">
      <template>
        <Label for="firstname">Firstname</Label>
        <Input v-model="credentials.firstname" id="firstname" type="text" placeholder="Firstname"/>

        <Label for="lastname">Lastname</Label>
        <Input v-model="credentials.lastname" id="lastname" type="text" placeholder="Lastname"/>

        <Label for="email">Email</Label>
        <Input v-model="credentials.email" id="email" type="email" placeholder="Email"/>

        <Label for="password">Password</Label>
        <Input v-model="credentials.password" id="password" type="password" placeholder="Email"/>


        <Label for="confirm_password">Confirm Password</Label>
        <Input v-model="credentials.password_confirmation" id="confirm_password" type="password" placeholder="Email"/>


        <Button @click="handleSubmit">Register</Button>
      </template>

    </div>
  </div>
</template>