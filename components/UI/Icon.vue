<script setup lang="ts">
defineProps<{ name: string; type?: "normal" | "large" }>();
</script>

<template>
  <i
    class="bi"
    :class="`bi-${name} ${
      type === 'normal' ? 'text-lg' : type === 'large' ? 'text-2xl' : ''
    }`"
  ></i>
</template>
