<script setup lang="ts">
useHead({ title: "Oopsie" });
const error = useError();
</script>

<template>
  <NuxtLayout>
    <div
      v-if="error"
      class="flex min-h-screen flex-col items-center justify-center gap-y-5"
    >
      <LazySvgoError class="w-32 fill-blurple" />
      <h1 class="text-lg dark:text-white">{{ error.message }}</h1>

      <UIButton type="normal" @click="navigateTo('/')">Go to home</UIButton>
    </div>
  </NuxtLayout>
</template>
