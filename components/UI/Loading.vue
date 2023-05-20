<template>
  <div
    v-if="$route.name === 'index'"
    class="flex w-full animate-pulse flex-col items-center justify-center gap-x-4 gap-y-10 md:flex-row"
  >
    <div class="aspect-square w-36 rounded-lg bg-black/40 md:w-48">&nbsp;</div>
    <div
      class="flex w-full flex-col items-center gap-y-5 md:w-[20%] md:items-start"
    >
      <div class="h-4 w-3/4 rounded-full bg-black/40">&nbsp;</div>
      <div class="h-4 w-1/2 rounded-full bg-black/40">&nbsp;</div>
      <div class="h-4 w-1/4 rounded-full bg-black/40">&nbsp;</div>
    </div>
  </div>
  <div v-else-if="$route.name === 'account'" class="animate-pulse space-y-4">
    <div
      class="flex h-10 w-full justify-between"
      v-for="(skeleton, index) in [...Array(3).keys()]"
      :keys="index"
    >
      <div class="w-[10%] rounded-md bg-black/40"></div>
      <div class="w-[60%] rounded-md bg-black/40"></div>
      <div class="w-1/4 rounded-md bg-black/40"></div>
    </div>
  </div>
</template>
