<script setup lang="ts">
defineProps<{ type?: `menu-${"active" | "inactive"}` | "normal" }>();
</script>

<template>
  <button
    class="rounded-lg transition"
    :class="{
      'bg-white/30': type === 'menu-active',
      'bg-blurple p-3 text-white disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-70 dark:hover:opacity-80':
        type === 'normal',
      'px-3 py-1': type && type.includes('menu'),
    }"
  >
    <slot />
  </button>
</template>
