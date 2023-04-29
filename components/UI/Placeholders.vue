<script setup lang="ts">
const props = defineProps<{ text: string }>();

const placeholders = usePlaceholder(props.text);
</script>

<template>
  <div class="bg-black/50 p-3 text-white rounded-2xl font-bold">
    {{ placeholders.toUpperCase() }}
  </div>
</template>
