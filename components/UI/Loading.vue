<template>
  <div v-if="$route.name === 'index'" class="flex flex-col gap-y-4">
    <UIIcon
      name="snow3"
      class="text-blurple text-7xl animate-spin duration-1000 block"
    />
    <h1 class="dark:text-white text-lg">Loading ...</h1>
  </div>
  <div
    v-else-if="$route.name === 'account'"
    class="flex flex-col gap-y-4 w-1/2 items-center mx-auto"
  >
    <LazySvgoSnowflakeSearch class="w-24 fill-blurple" />
    <h1 class="font-bold text-lg">Loading ...</h1>
  </div>
</template>
