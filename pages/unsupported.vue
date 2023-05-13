<script setup lang="ts">
useHead({
  title: "Unsupported",
});

onMounted(async () => {
  const { isMobile } = useDevice();
  if (isMobile) await navigateTo("/unsupported");
});
</script>

<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center gap-y-5"
  >
    <LazySvgoError class="w-32 fill-blurple" />
    <h1 class="text-xl text-center">
      Sorry, mobile devices aren't supported. Learn why here
    </h1>
  </section>
</template>
