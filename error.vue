<script setup lang="ts">
useHead({ title: "Oops" });
const error = useError();
</script>

<template>
  <LazyNuxtLayout>
    <div
      v-if="error"
      class="flex min-h-screen flex-col items-center justify-center gap-y-5"
    >
      <LazyUIIcon :custom="true" name="error" />
      <h1 class="text-lg dark:text-white">{{ error.message }}</h1>

      <LazyUIButton type="normal" @click="navigateTo('/')"
        >Go to home</LazyUIButton
      >
    </div>
  </LazyNuxtLayout>
</template>
