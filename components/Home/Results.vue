<script setup lang="ts">
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

    <div class="flex flex-col items-center gap-y-5 md:items-start md:gap-y-2">
      <!-- Username & discriminator -->
      <h1 class="font-serif text-2xl dark:text-white">
        {{ requestMetadata.global.response.username }}#{{
          requestMetadata.global.response.discriminator
        }}
      </h1>

      <div class="contents gap-y-2">
        <!-- Badges (if any) -->
        <UIBadges
          :badges="requestMetadata.global.response.badges"
          type="display"
          :bot="requestMetadata.global.response.bot ?? false"
        />

        <!-- Account creation date -->
        <h2 class="text-center dark:text-white md:text-left">
          Has been a member since
          {{ requestMetadata.global.response.createdAt }}
        </h2>

        <!-- Save JSON -->
        <button
          class="group hidden w-fit cursor-pointer items-center gap-x-2 dark:text-white md:inline-flex"
          @click="
            useDownload(
              requestMetadata.global.response.download,
              requestMetadata.global.response.download.user
            )
          "
        >
          <UIIcon name="save" type="normal" />
          <span class="opacity-0 transition group-hover:opacity-100"
            >Save (JSON)</span
          >
        </button>

        <UIButton type="normal" class="flex gap-x-2 md:hidden">
          <UIIcon name="save" type="normal" />
          Save
        </UIButton>
      </div>
    </div>
  </div>
</template>
