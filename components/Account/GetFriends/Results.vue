<script setup lang="ts">
import type { RequestMetadata } from "~/project";
import { useDownload } from "~/composables/useDownload";

const requestMetadata = useState<RequestMetadata>("metadata");
</script>

<template>
  <div>
    <div
      v-if="
        requestMetadata.friends.response &&
        Array.isArray(requestMetadata.friends.response)
      "
      v-for="(friend, index) of requestMetadata.friends.response"
      :key="index"
      :ref="`friend-${index}`"
      class="flex items-center justify-between bg-black/10 p-3 2xl:px-8 rounded-lg"
    >
      <VTooltip :boundary="$refs[`friend-${index}`]">
        <div class="flex gap-x-3 items-center">
          <NuxtImg
            :src="friend.avatarURL"
            quality="100"
            loading="lazy"
            alt="Profile picture"
            class="rounded-2xl"
            width="50"
            height="50"
            :title="`${friend.username}'s profile picture`"
          />
          <h3 class="text-lg">
            {{ friend.username }}#{{ friend.discriminator }}
          </h3>
        </div>
        <template #popper>
          <UIBadges
            :badges="friend.badges"
            type="tooltip"
            :bot="friend.bot ?? false"
          />
        </template>
      </VTooltip>

      <span
        class="inline-flex items-center gap-x-2 group cursor-pointer"
        @click="useDownload(friend.download, friend.download.user)"
      >
        <h4 class="opacity-0 group-hover:opacity-100 transition">Save</h4>
        <UIIcon
          :name="$colorMode.value === 'dark' ? 'save-fill' : 'save'"
          type="normal"
        />
      </span>
    </div>
    <div
      v-else-if="
        requestMetadata.friends.response &&
        typeof requestMetadata.friends.response === 'string'
      "
    >
      {{ requestMetadata.friends.response }}
    </div>
  </div>
</template>
