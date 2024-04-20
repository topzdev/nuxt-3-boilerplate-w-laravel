<script setup lang="ts">
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import * as yup from 'yup';
import {useForm} from "vee-validate";
import type {Credentials} from "~/stores/useAuthStore";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

definePageMeta({
  auth: 'guest'
})

const auth = useAuthStore();

const alert = ({
  message: '',
  show: false,
})

const { handleSubmit, isSubmitting, defineField} = useForm<Credentials>({
  initialValues: {
    email: "christianlugod05@gmail.com",
    password: "2559069dev"
  }
});

const onSubmit = handleSubmit(async (values)=> {
  try {
    await auth.login(values)
  } catch (e: any) {
    console.log('Login Error',e.message);

    alert.message = e.message;
    alert.show = true;
  }
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs ] = defineField('password');
</script>

<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="grid w-full max-w-sm items-center gap-1.5 mx-auto">


      <Alert v-if="alert.show" variant="destructive">
        <AlertDescription>
          {{alert.message}}
        </AlertDescription>
      </Alert>


      <Label for="email">Email</Label>
      <Input v-model="email" v-bind="emailAttrs" id="email" type="email" placeholder="Email"/>
      <Label for="email">Password</Label>
      <Input v-model="password" v-bind="passwordAttrs" type="password" placeholder="Password"/>
      <Button :loading="isSubmitting" :disabled="isSubmitting" @click="onSubmit">Login</Button>

      <hr>
      <GoogleButton/>
      <FacebookButton/>

    </div>
  </div>
</template>