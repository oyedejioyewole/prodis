<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "dark:bg-black",
  },
});

useFont([
  {
    family: "Quicksand",
    src: "/fonts/quicksand-regular.woff2",
    weight: "400",
    display: "swap",
  },
  {
    family: "Vollkorn",
    src: "/fonts/vollkorn-semibold.woff2",
    weight: "600",
    display: "swap",
  },
]);
</script>

<template>
  <div class="w-[90%] mx-auto py-5 selection:bg-blurple/50">
    <!-- Navigation -->
    <Navigation class="flex justify-between items-center" />

    <!-- Content -->
    <slot />
  </div>
</template>
