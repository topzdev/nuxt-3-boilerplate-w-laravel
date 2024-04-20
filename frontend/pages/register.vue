<script setup lang="ts">
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {type Credentials, definePageMeta, type RegisterInfo} from "#imports";
import {useForm} from "vee-validate";

definePageMeta({
  auth: 'guest'
})

const auth = useAuthStore();

const { handleSubmit, isSubmitting, defineField} = useForm<RegisterInfo>({
  initialValues: {
    firstname: "Christian",
    lastname: "Lugod",
    email: "christianlugod05@gmail.com",
    password: "2559069dev",
    password_confirmation: "2559069dev"
  }
});

const onSubmit = handleSubmit(async (values)=> {
  await auth.login(values)
});

const [firstname, firstnameAttrs] = defineField('firstname');
const [lastname, lastnameAttrs] = defineField('lastname');
const [email, emailAttrs ] = defineField('email');
const [password, passwordAttrs ] = defineField('password');
const [passwordConfirmation, passwordConfirmationAttrs ] = defineField('password_confirmation');

</script>

<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="grid w-full max-w-sm items-center gap-1.5 mx-auto">
        <div>
          <Label for="firstname">Firstname</Label>
          <Input v-model="firstname" v-bind="firstnameAttrs" id="firstname" type="text" placeholder="Firstname"/>
        </div>

        <div>
          <Label for="lastname">Lastname</Label>
          <Input v-model="lastname" v-bind="lastnameAttrs" id="lastname" type="text" placeholder="Lastname"/>
        </div>

        <div>
          <Label for="email">Email</Label>
          <Input v-model="email" v-bind="emailAttrs" id="email" type="email" placeholder="Email"/>
        </div>

        <div>
          <Label for="password">Password</Label>
          <Input v-model="password" v-bind="passwordAttrs" id="password" type="password" placeholder="Email"/>
        </div>

        <div>
          <Label for="confirm_password">Confirm Password</Label>
          <Input v-model="passwordConfirmation" v-bind="passwordConfirmationAttrs" id="confirm_password" type="password" placeholder="Email"/>
        </div>

        <Button :disabled="isSubmitting" @click="onSubmit">Register</Button>

    </div>
  </div>
</template>