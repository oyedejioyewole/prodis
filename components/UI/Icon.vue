<script setup lang="ts">
defineProps<{
  name: IconNames;
  type?: "normal" | "large";
  custom?: boolean;
  color?: `#${string}` | string;
}>();
</script>

<template>
  <i
    class="bi"
    :class="`bi-${name} ${
      type === 'normal' ? 'md:text-lg' : type === 'large' ? 'text-2xl' : ''
    } ${
      color
        ? color.startsWith('#')
          ? `text-[${color}]`
          : `text-${color}`
        : 'text-blurple'
    }`"
    v-if="!custom"
  ></i>

  <LazySvgoLogo
    filled
    class="aspect-square w-12"
    v-else-if="custom && name === 'logo'"
  />
  <LazySvgoError
    class="w-32 fill-blurple"
    v-else-if="custom && name === 'error'"
  />

  <!-- Badges: START -->
  <LazySvgoBadgesActiveDeveloper
    class="w-6 fill-[#2EA967]"
    v-if="custom && name === 'active-developer'"
  />
  <LazySvgoBadgesBugHunterLevel1
    class="w-6"
    v-else-if="custom && name === 'bug-hunter-level-1'"
  />
  <LazySvgoBadgesBugHunterLevel2
    class="w-6"
    v-else-if="custom && name === 'bug-hunter-level-2'"
  />
  <LazySvgoBadgesEarlySupporter
    class="w-6"
    v-else-if="custom && name === 'early-supporter'"
  />
  <LazySvgoBadgesEarlyVerifiedBotDeveloper
    class="w-6"
    v-else-if="custom && name === 'early-verified-bot-developer'"
  />
  <LazySvgoBadgesHypesquadHouseOfBalance
    class="w-6 fill-[#45ddc0]"
    v-else-if="custom && name === 'house-of-balance'"
  />
  <LazySvgoBadgesHypesquadHouseOfBravery
    class="w-6 fill-[#9c84ef]"
    v-else-if="custom && name === 'house-of-bravery'"
  />
  <LazySvgoBadgesHypesquadHouseOfBrilliance
    class="w-6 fill-[#f47b67]"
    v-else-if="custom && name === 'house-of-brilliance'"
  />
  <LazySvgoBadgesHypesquadEvents
    class="w-6"
    v-else-if="custom && name === 'hypesquad-events'"
  />
  <LazySvgoBadgesModeratorProgramAlumni
    class="w-6 fill-blurple"
    v-else-if="custom && name === 'moderator-programs-alumni'"
  />
  <LazySvgoBadgesPartneredServerOwner
    class="w-6 fill-[#4087ED]"
    v-else-if="custom && name === 'partnered-server-owner'"
  />
  <LazySvgoBadgesStaff
    class="w-6 fill-[#7289DA]"
    v-else-if="custom && name === 'staff'"
  />
  <LazySvgoBadgesNitro class="w-6" v-else-if="custom && name === 'nitro'" />
  <!-- Badges: END -->

  <!-- Brands: START -->
  <LazySvgoBrandsBattlenet
    class="w-6"
    v-else-if="custom && name === 'battlenet'"
  />
  <LazySvgoBrandsEbay class="w-8" v-else-if="custom && name === 'ebay'" />
  <LazySvgoBrandsEpicgames
    class="w-6"
    v-else-if="custom && name === 'epicgames'"
  />
  <LazySvgoBrandsLeagueoflegends
    class="w-6"
    v-else-if="custom && name === 'leagueoflegends'"
  />
  <LazySvgoBrandsRiotgames
    class="w-6"
    v-else-if="custom && name === 'riotgames'"
  />
  <!-- Brands: END -->
</template>
