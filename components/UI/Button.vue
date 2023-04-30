<script setup lang="ts">
defineProps<{
  type?: `menu-${"active" | "inactive"}` | "normal";
  action?: "submit";
}>();
</script>

<template>
  <button
    class="rounded-lg transition focus:outline-none"
    :class="{
      'bg-white/30': type === 'menu-active',
      'bg-blurple p-3 text-white disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-70 dark:hover:opacity-80 focus-visible:outline-black/50 dark:focus-visible:outline-white/50 rounded-lg focus-visible:outline-offset-4':
        type === 'normal',
      'px-3 py-1 hover:bg-white/30 focus-visible:outline-black/50 dark:focus-visible:outline-white/50':
        type && type.includes('menu'),
    }"
    :type="action ?? undefined"
  >
    <slot />
  </button>
</template>
