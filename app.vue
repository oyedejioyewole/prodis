<script setup lang="ts">
useState<RequestMetadata>("metadata", () => ({
  friends: { pending: false },
  lookup: { pending: false },
  account: { pending: false },
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
