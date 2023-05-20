<script setup lang="ts">
defineProps<{
  name: IconNames | Exclude<ConnectionTypes, IconNames>;
  type: "normal" | "large" | "custom";
}>();
</script>

<template>
  <i
    class="bi"
    :class="`bi-${name} ${
      type === 'normal' ? 'md:text-lg' : type === 'large' ? 'text-2xl' : ''
    }`"
  ></i>
</template>
