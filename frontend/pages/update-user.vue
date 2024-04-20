<script setup lang="ts">
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {type Credentials, definePageMeta, type RegisterInfo} from "#imports";
import {useForm} from "vee-validate";

definePageMeta({
  auth: 'auth'
})

const auth = useAuthStore();

const { handleSubmit, isSubmitting, defineField, resetForm} = useForm<UpdateUser>({
  initialValues: {
    firstname: "",
    lastname: "",
    email: "",
  }
});

watch(() => auth.user, (prevValue, oldValue) =>{
  if (auth.user) {
    resetForm({
      values: {
        lastname: auth.user?.lastname,
        firstname: auth.user?.firstname,
        email: auth.user?.email
      }
    })
  }
}, {
  immediate: true
})

const onSubmit = handleSubmit(async (values)=> {
  try {
    await auth.updateUser(values);
  } catch (e: any) {
  }
});

const [firstname, firstnameAttrs] = defineField('firstname');
const [lastname, lastnameAttrs] = defineField('lastname');
const [email, emailAttrs ] = defineField('email');

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
      <Button :disabled="isSubmitting" @click="onSubmit">Save</Button>

    </div>
  </div>
</template>