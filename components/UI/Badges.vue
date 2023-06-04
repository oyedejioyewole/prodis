<script setup lang="ts">
defineProps<{
  badges: Badges;
  bot: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-x-1">
    <code class="dark:text-white">Badges:</code>

    <!-- Badges: START -->
    <div class="flex items-center gap-x-2" v-if="Array.isArray(badges)">
      <div v-for="(badge, index) of badges" :key="index">
        <UIIcon type="large" :name="badge" :custom="true" />
        <h1
          class="inline-flex items-center gap-x-1 rounded-xl bg-blurple px-3 py-1 dark:text-white"
          v-if="bot"
        >
          Bot
          <UIIcon
            name="patch-check"
            class="dark:text-white"
            type="normal"
            v-if="badge === 'verified-bot'"
          />
        </h1>
      </div>
    </div>
    <h3 v-else class="text-lg dark:text-white">None 🤪</h3>
    <!-- Badges: END -->
  </div>
</template>
