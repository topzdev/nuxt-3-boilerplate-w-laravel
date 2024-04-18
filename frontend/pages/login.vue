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
  email: "christianlugod05@gmail.com",
  password: "2559069dev"
})

const handleSubmit = async () => {
   await auth.login(credentials.value);
}



</script>

<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="grid w-full max-w-sm items-center gap-1.5 mx-auto">

      <template>
        <Label for="email">Email</Label>
        <Input v-model="credentials.email" id="email" type="email" placeholder="Email"/>
        <Label for="email">Password</Label>
        <Input v-model="credentials.password" id="email" type="password" placeholder="Email"/>

        <Button @click="handleSubmit">Login</Button>

        <hr>
        <GoogleButton/>
        <FacebookButton/>
      </template>

    </div>
  </div>
</template>