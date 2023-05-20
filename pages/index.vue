<script setup lang="ts">
const requestMetadata = useState<RequestMetadata>("metadata");

useHead({
  title: "Home",
});
</script>

<template>
  <section
    class="flex min-h-screen flex-col items-center justify-center gap-y-20"
  >
    <NuxtErrorBoundary>
      <HomeSearchForm />
      <LazyUILoading v-if="requestMetadata.global.pending" />
      <LazyHomeResults
        v-else-if="
          !requestMetadata.global.pending && requestMetadata.global.response
        "
        class="order-1 flex flex-col items-center gap-10 rounded-2xl border border-blurple p-10 dark:border-2 md:flex-row"
      />

      <template #error="{ error }">
        <HomeSearchForm
          @clear-errors="error.value = null"
          id="error-search-form"
        />
        <div class="flex flex-col items-center">
          <LazySvgoError class="w-32 fill-blurple" />
          <h1 class="text-lg font-bold dark:text-white">
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
