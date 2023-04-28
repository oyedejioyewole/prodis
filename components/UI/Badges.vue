<script setup lang="ts">
const props = defineProps<{
  badgeNumber: number;
  type: "display" | "tooltip";
}>();

const badge = useBadge(props.badgeNumber);
</script>

<template>
  <div class="flex items-center gap-x-2">
    <code
      class="dark:text-white"
      :class="{
        'text-lg': type === 'display',
      }"
      >Badges:</code
    >

    <!-- Badges: START -->
    <NuxtIcon
      name="badges/house-of-bravery"
      class="text-white"
      :class="{
        'text-5xl': type === 'display',
        'text-2xl': type === 'tooltip',
      }"
      v-if="badge === 'hypesquad-online-house-1'"
    />
    <NuxtIcon
      name="badges/house-of-brilliance"
      class="dark:text-white"
      :class="{
        'text-5xl': type === 'display',
        'text-2xl': type === 'tooltip',
      }"
      v-else-if="badge === 'hypesquad-online-house-2'"
    />
    <NuxtIcon
      name="badges/house-of-balance"
      class="dark:text-white"
      :class="{
        'text-4xl': type === 'display',
        'text-2xl': type === 'tooltip',
      }"
      v-else-if="badge === 'hypesquad-online-house-3'"
    />
    <h3 v-else class="text-lg dark:text-white">
      This account has no badges 🤪
    </h3>
    <!-- Badges: END -->
  </div>
</template>
