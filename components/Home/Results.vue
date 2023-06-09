<script setup lang="ts">
const requestMetadata = useState<RequestMetadata>("metadata");
</script>

<template>
  <div
    v-if="
      requestMetadata.lookup.response &&
      'username' in requestMetadata.lookup.response
    "
  >
    <!-- Profile avatar -->
    <LazyNuxtImg
      :src="requestMetadata.lookup.response.avatar"
      quality="100"
      loading="lazy"
      class="rounded-2xl"
    />

    <div class="flex flex-col items-center gap-y-5 md:items-start md:gap-y-2">
      <!-- Username & discriminator -->
      <h1 class="font-serif text-2xl dark:text-white">
        {{ requestMetadata.lookup.response.username }}#{{
          requestMetadata.lookup.response.discriminator
        }}
      </h1>

      <div class="contents gap-y-2">
        <!-- Badges (if any) -->
        <h2 class="inline-flex items-center gap-x-1">
          <b class="font-serif text-lg dark:text-white">Badges:</b>
          <LazyUIExtrasBadges
            :badges="requestMetadata.lookup.response.badges"
            :bot="requestMetadata.lookup.response.bot ?? false"
            v-if="Array.isArray(requestMetadata.lookup.response.badges)"
            class="w-fit"
          />
          <h3 class="text-lg dark:text-white" v-else>None 🤪</h3>
        </h2>

        <!-- Account creation date -->
        <h2 class="text-center dark:text-white md:text-left">
          Has been a member since
          {{ requestMetadata.lookup.response.createdOn }}
        </h2>

        <!-- Save JSON -->
        <button
          class="group hidden w-fit cursor-pointer items-center gap-x-2 dark:text-white md:inline-flex"
          @click="
            useDownload(
              requestMetadata.lookup.response.download,
              requestMetadata.lookup.response.download.user
            )
          "
        >
          <LazyUIIcon name="save" type="normal" />
          <span class="opacity-0 transition group-hover:opacity-100"
            >Save (JSON)</span
          >
        </button>

        <LazyUIButton type="normal" class="flex gap-x-2 md:hidden">
          <LazyUIIcon name="save" type="normal" />
          Save
        </LazyUIButton>
      </div>
    </div>
  </div>
</template>
