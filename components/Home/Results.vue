<script setup lang="ts">
import type { RequestMetadata, APILookupResponse } from "~/project";

const requestMetadata = useState<RequestMetadata>("metadata");

const downloadInformation = async (payload: APILookupResponse["download"]) => {
  const { saveAs } = await import("file-saver");
  saveAs(
    new Blob([JSON.stringify(payload)], { type: "application/json" }),
    `${payload.user}.json`,
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
          :badges="requestMetadata.global.response.badges"
          type="display"
        />
        <h2 class="dark:text-white">
          Has been a member since
          {{ requestMetadata.global.response.createdAt }}
        </h2>

        <a
          class="inline-flex items-center gap-x-2 cursor-pointer group w-fit dark:text-white"
          @click="downloadInformation(requestMetadata.global.response.download)"
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
