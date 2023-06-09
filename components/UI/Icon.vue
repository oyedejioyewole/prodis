<script setup lang="ts">
defineProps<{
  name: IconNames;
  type?: "normal" | "large";
  custom?: boolean;
}>();
</script>

<template>
  <i
    class="bi"
    :class="{
      [`bi-${name}`]: true,
      'md:text-lg': type === 'normal',
      'text-2xl': type === 'large',
    }"
    v-if="!custom"
  ></i>

  <template v-else>
    <!-- Site Assets: START -->
    <LazySvgoLogo filled class="aspect-square w-12" v-if="name === 'logo'" />

    <LazySvgoError class="w-32 fill-blurple" v-else-if="name === 'error'" />

    <LazySvgoGuildOwner class="w-6" v-else-if="name === 'guild-owner'" />
    <!-- Site Assets: STOP -->

    <!-- Guild Features: START -->
    <LazySvgoGuildFeaturesAnimatedBanner
      class="w-14"
      v-else-if="name === 'animated-banner'"
    />

    <LazySvgoGuildFeaturesAnimatedIcon
      class="w-8 -rotate-90"
      v-else-if="name === 'animated-icon'"
    />

    <LazySvgoGuildFeaturesApplicationCommandPermissionsV2
      class="w-16"
      v-else-if="name === 'application-command-permissions-v2'"
    />

    <LazySvgoGuildFeaturesBanner class="w-10" v-else-if="name === 'banner'" />

    <LazySvgoGuildFeaturesCommunity
      class="w-8"
      v-else-if="name === 'community'"
    />

    <LazySvgoGuildFeaturesDeveloperSupportServer
      class="w-8"
      v-else-if="name === 'developer-support-server'"
    />

    <LazySvgoGuildFeaturesInviteSplash
      class="w-12"
      v-else-if="name === 'invite-splash'"
    />

    <LazySvgoGuildFeaturesMoreStickers
      class="w-12"
      v-else-if="name === 'more-stickers'"
    />

    <LazySvgoGuildFeaturesPartnered
      class="w-8"
      v-else-if="name === 'partnered'"
    />

    <LazySvgoGuildFeaturesRoleIcons
      class="w-8"
      v-else-if="name === 'role-icons'"
    />

    <LazySvgoGuildFeaturesVipRegions
      class="w-10"
      v-else-if="name === 'vip-regions'"
    />

    <LazySvgoGuildFeaturesWelcomeScreenEnabled
      class="w-10"
      v-else-if="name === 'welcome-screen-enabled'"
    />
    <!-- Guild Features: END -->

    <!-- Badges: START -->
    <LazySvgoBadgesActiveDeveloper
      class="w-6 fill-[#2EA967]"
      v-else-if="name === 'active-developer'"
    />
    <LazySvgoBadgesBugHunterLevel1
      class="w-6"
      v-else-if="name === 'bug-hunter-level-1'"
    />
    <LazySvgoBadgesBugHunterLevel2
      class="w-6"
      v-else-if="name === 'bug-hunter-level-2'"
    />
    <LazySvgoBadgesEarlySupporter
      class="w-6"
      v-else-if="name === 'early-supporter'"
    />
    <LazySvgoBadgesEarlyVerifiedBotDeveloper
      class="w-6"
      v-else-if="name === 'early-verified-bot-developer'"
    />
    <LazySvgoBadgesHypesquadHouseOfBalance
      class="w-6 fill-[#45ddc0]"
      v-else-if="name === 'house-of-balance'"
    />
    <LazySvgoBadgesHypesquadHouseOfBravery
      class="w-6 fill-[#9c84ef]"
      v-else-if="name === 'house-of-bravery'"
    />
    <LazySvgoBadgesHypesquadHouseOfBrilliance
      class="w-6 fill-[#f47b67]"
      v-else-if="name === 'house-of-brilliance'"
    />
    <LazySvgoBadgesHypesquadEvents
      class="w-6"
      v-else-if="name === 'hypesquad-events'"
    />
    <LazySvgoBadgesModeratorProgramAlumni
      class="w-6 fill-blurple"
      v-else-if="name === 'moderator-programs-alumni'"
    />
    <LazySvgoBadgesPartneredServerOwner
      class="w-6 fill-[#4087ED]"
      v-else-if="name === 'partnered-server-owner'"
    />
    <LazySvgoBadgesStaff
      class="w-6 fill-[#7289DA]"
      v-else-if="name === 'staff'"
    />
    <LazySvgoBadgesNitro class="w-6" v-else-if="name === 'nitro'" />
    <!-- Badges: END -->

    <!-- Brands: START -->
    <LazySvgoBrandsBattlenet class="w-6" v-else-if="name === 'battlenet'" />
    <LazySvgoBrandsEbay class="w-8" v-else-if="name === 'ebay'" />
    <LazySvgoBrandsEpicgames class="w-6" v-else-if="name === 'epicgames'" />
    <LazySvgoBrandsLeagueoflegends
      class="w-6"
      v-else-if="name === 'leagueoflegends'"
    />
    <LazySvgoBrandsRiotgames class="w-6" v-else-if="name === 'riotgames'" />
    <!-- Brands: END -->
  </template>
</template>
