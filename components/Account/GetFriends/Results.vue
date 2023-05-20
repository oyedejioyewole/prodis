<script setup lang="ts">
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
      class="flex items-center justify-between rounded-lg bg-black/10 p-3 2xl:px-8"
    >
      <div
        class="flex cursor-pointer items-center gap-x-3"
        @click="useModal(true, friend)"
      >
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
        <h3 class="text-sm md:text-lg">
          {{ friend.username }}#{{ friend.discriminator }}
        </h3>
      </div>

      <span
        class="group inline-flex cursor-pointer items-center gap-x-2"
        @click="useDownload(friend.download, friend.download.user)"
      >
        <h4
          class="hidden text-sm opacity-0 transition group-hover:opacity-100 md:block"
        >
          Save
        </h4>
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
