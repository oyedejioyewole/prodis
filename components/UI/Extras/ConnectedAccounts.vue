<script setup lang="ts">
defineProps<{ connections: APICallbackProcessedResponse["connections"] }>();
</script>

<template>
  <div class="flex flex-wrap gap-x-2">
    <div
      v-for="(connection, index) in connections"
      :key="index"
      class="tooltip"
      :data-tooltip-name="connection.name"
    >
      <LazyUIIcon :name="connection.type" type="normal" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  @apply relative inline-block cursor-pointer;

  &::before {
    transform: translateX(-50%);
    transition: opacity 0.3s, visibility 0.3s;

    @apply invisible absolute -top-[30px] left-1/2 whitespace-nowrap rounded-[5px] bg-black/50 px-[10px] py-[5px] text-[14px] font-bold text-white opacity-0 backdrop-blur-sm content-[attr(data-tooltip-name)];
  }

  &:hover::before {
    @apply visible opacity-100;
  }
}
</style>
