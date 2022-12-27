<script setup lang="ts">
useState<Modal>("modal", () => ({
  isOpen: false,
  payload: {},
}));
</script>

<template>
  <NuxtPage />
</template>
