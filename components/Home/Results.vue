<script setup lang="ts">
import type { RequestMetadata, APILookupResponse } from "~/project";
import { useDownload } from "~/composables/useDownload";

const requestMetadata = useState<RequestMetadata>("metadata");
</script>

<template>
  <div
    v-if="
      requestMetadata.global.response &&
      'username' in requestMetadata.global.response
    "
  >
    <!-- Profile avatar -->
    <NuxtImg
      :src="requestMetadata.global.response.avatarURL"
      quality="100"
      loading="lazy"
      class="rounded-2xl"
    />

    <div class="flex flex-col gap-y-5">
      <!-- Username & discriminator -->
      <h1 class="font-serif text-2xl dark:text-white">
        {{ requestMetadata.global.response.username }}#{{
          requestMetadata.global.response.discriminator
        }}
      </h1>

      <div class="flex flex-col gap-y-2">
        <!-- Badges (if any) -->
        <UIBadges
          :badges="requestMetadata.global.response.badges"
          type="display"
          :bot="requestMetadata.global.response.bot ?? false"
        />

        <!-- Account creation date -->
        <h2 class="dark:text-white">
          Has been a member since
          {{ requestMetadata.global.response.createdAt }}
        </h2>

        <!-- Save JSON -->
        <a
          class="inline-flex items-center gap-x-2 cursor-pointer group w-fit dark:text-white"
          @click="
            useDownload<APILookupResponse['download']>(
              requestMetadata.global.response.download,
              requestMetadata.global.response.download.user
            )
          "
        >
          <UIIcon name="save" type="normal" />
          <span class="group-hover:opacity-100 opacity-0 transition"
            >Save (JSON)</span
          >
        </a>
      </div>
    </div>
  </div>
</template>
