<script setup lang="ts">
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Modal, RequestMetadata } from "./project";

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

useHead({
  bodyAttrs: {
    class: "dark:bg-black",
  },
});

useState<RequestMetadata>("metadata", () => ({
  friends: { pending: false },
  global: { pending: false },
}));

useState<Modal>("modal", () => ({ isOpen: false }));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
::-webkit-scrollbar {
  width: 0.35rem;
}

@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.697);
    border-radius: 999px;
  }
}

@media (prefers-color-scheme: light) {
  ::-webkit-scrollbar-thumb {
    background-color: #1919199a;
    border-radius: 999px;
  }
}

@media (prefers-color-scheme: system) {
  ::-webkit-scrollbar-thumb {
    background-color: #1919199a;
    border-radius: 999px;
  }
}
</style>
