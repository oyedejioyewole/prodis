<script setup lang="ts">
import type { DiscordUser, RequestMetadata } from "~/project";

const requestMetadata = useState<RequestMetadata>("metadata");

const downloadLookedUpInformation = async (payload: DiscordUser) => {
  const { saveAs } = await import("file-saver");
  saveAs(
    new Blob([JSON.stringify(payload)], { type: "application/json" }),
    `${payload.username}-${payload.discriminator}.json`,
    { autoBom: true }
  );
};
</script>

<template>
  <section
    v-if="
      requestMetadata.global.response &&
      'username' in requestMetadata.global.response
    "
  >
    <NuxtImg
      :src="requestMetadata.global.response.image"
      quality="100"
      loading="lazy"
      class="rounded-2xl"
    />

    <div class="flex flex-col gap-y-5">
      <!-- Username and discriminator -->
      <h1 class="font-serif text-2xl dark:text-white">
        {{ requestMetadata.global.response.username }}#{{
          requestMetadata.global.response.discriminator
        }}
      </h1>

      <div class="flex flex-col gap-y-2">
        <UIBadges
          :badge-number="requestMetadata.global.response.public_flags"
          type="display"
        />
        <h2 class="dark:text-white">
          Has been a member since
          {{ requestMetadata.global.response.createdAt }}
        </h2>

        <a
          class="inline-flex items-center gap-x-2 cursor-pointer group w-fit dark:text-white"
          @click="
            downloadLookedUpInformation(
              requestMetadata.global.response.original
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
  </section>
</template>
