<template>
  <section v-if="$route.name === 'index'" class="flex flex-col gap-y-4">
    <UIIcon
      name="snow3"
      class="text-blurple text-7xl animate-spin duration-1000 block"
    />
    <h1 class="dark:text-white text-lg">Loading ...</h1>
  </section>
  <section
    v-else-if="$route.name === 'account'"
    class="flex flex-col gap-y-4 w-1/2 items-center mx-auto"
  >
    <NuxtIcon
      name="snowflake-search"
      class="text-8xl 2xl:text-9xl text-blurple block circular-motion-animation"
    />
    <h1 class="font-bold">Loading ...</h1>
  </section>
</template>

<style></style>
