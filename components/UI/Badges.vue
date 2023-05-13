<script setup lang="ts">
defineProps<{
  badges: Badges;
  type: "display" | "tooltip";
  bot: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-x-2">
    <code
      class="dark:text-white"
      :class="{
        'text-lg': type === 'display',
      }"
      >Badges:</code
    >

    <!-- Badges: START -->
    <div class="flex gap-x-2 items-center" v-if="Array.isArray(badges)">
      <div v-for="(badge, index) of badges" :key="index">
        <LazySvgoBadgesActiveDeveloper
          class="w-6 fill-[#2EA967]"
          v-if="badge === 'active-developer'"
        />
        <LazySvgoBadgesBugHunterLevel1
          class="w-6"
          v-else-if="badge === 'bug-hunter-level-1'"
        />
        <LazySvgoBadgesBugHunterLevel2
          class="w-6"
          v-else-if="badge === 'bug-hunter-level-2'"
        />
        <LazySvgoBadgesEarlySupporter
          class="w-8"
          v-else-if="badge === 'early-supporter'"
        />
        <LazySvgoBadgesEarlyVerifiedBotDeveloper
          class="w-8"
          v-else-if="badge === 'early-verified-bot-developer'"
        />
        <LazySvgoBadgesHypesquadHouseOfBalance
          class="w-8 fill-[#45ddc0]"
          v-else-if="badge === 'house-of-balance'"
        />
        <LazySvgoBadgesHypesquadHouseOfBravery
          class="w-6 fill-[#9c84ef]"
          v-else-if="badge === 'house-of-bravery'"
        />
        <LazySvgoBadgesHypesquadHouseOfBrilliance
          class="w-8 fill-[#f47b67]"
          v-else-if="badge === 'house-of-brilliance'"
        />
        <LazySvgoBadgesHypesquadEvents
          class="w-6"
          v-else-if="badge === 'hypesquad-events'"
        />
        <LazySvgoBadgesModeratorProgramAlumni
          class="w-6 fill-blurple"
          v-else-if="badge === 'moderator-programs-alumni'"
        />
        <LazySvgoBadgesPartneredServerOwner
          class="w-6 fill-[#4087ED]"
          v-else-if="badge === 'partnered-server-owner'"
        />
        <LazySvgoBadgesStaff
          class="w-6 fill-[#7289DA]"
          v-else-if="badge === 'staff'"
        />
        <h1
          class="dark:text-white inline-flex items-center gap-x-1 bg-blurple px-3 py-1 rounded-xl"
          v-else-if="bot"
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
    <h3 v-else class="text-lg dark:text-white">
      This account has no badges 🤪
    </h3>
    <!-- Badges: END -->
  </div>
</template>
