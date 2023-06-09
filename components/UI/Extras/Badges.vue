<script setup lang="ts">
defineProps<{
  badges: Extract<Badges, AccountBadgesKeys[]>;
  bot: boolean;
}>();
</script>
<template>
  <!-- Badges: START -->
  <div class="flex items-center gap-x-2">
    <div v-for="(badge, index) of badges" :key="index">
      <LazyUIIcon :name="badge" :custom="true" />
      <h1
        class="inline-flex items-center gap-x-1 rounded-xl bg-blurple px-3 py-1 dark:text-white"
        v-if="bot"
      >
        Bot
        <LazyUIIcon
          name="patch-check"
          class="dark:text-white"
          type="normal"
          v-if="badge === 'verified-bot'"
        />
      </h1>
    </div>
  </div>
  <!-- Badges: END -->
</template>
