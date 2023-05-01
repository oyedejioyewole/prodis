<script setup lang="ts">
import type { RequestMetadata } from "~/project";

const requestMetadata = useState<RequestMetadata>("metadata");

useHead({
  title: "Home",
});
</script>

<template>
  <section
    class="min-h-screen flex flex-col gap-y-20 items-center justify-center"
  >
    <NuxtErrorBoundary>
      <HomeSearchForm />
      <LazyUILoading v-if="requestMetadata.global.pending" />
      <LazyHomeResults
        v-else-if="
          !requestMetadata.global.pending && requestMetadata.global.response
        "
        class="flex gap-x-10 border-blurple border dark:border-2 p-10 rounded-2xl items-center"
      />

      <template #error="{ error }">
        <HomeSearchForm
          @clear-errors="error.value = null"
          id="error-search-form"
        />
        <div class="flex flex-col items-center">
          <LazySvgoError class="w-32 fill-blurple" />
          <h1 class="text-lg dark:text-white font-bold">
            {{
              (error.value.message as string).includes("Not Found")
                ? "Oops, the account doesn't exist 😅"
                : (error.value.message as string).includes("Failed to fetch")
                ? "Oops, there was an error sending the request 🤪"
                : error.value.message
            }}
          </h1>
        </div>
      </template>
    </NuxtErrorBoundary>
  </section>
</template>
