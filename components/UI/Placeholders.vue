<script setup lang="ts">
const props = defineProps<{ text: string }>();

const placeholders = usePlaceholder(props.text);
</script>

<template>
  <div
    class="rounded-2xl bg-black/50 p-3 font-bold text-white dark:bg-white/20"
  >
    {{ placeholders.toUpperCase() }}
  </div>
</template>
