<script setup lang="ts">
const { isDesktop } = useDevice();
const requestMetadata = useState<RequestMetadata>("metadata");
</script>

<template>
  <aside>
    <h2
      class="inline-flex items-center justify-between font-serif text-3xl 2xl:text-4xl"
    >
      My Friends
      <button
        type="button"
        class="rounded-lg focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-black/50 dark:focus-visible:outline-white/50"
        @click="useModal(true)"
      >
        <span class="sr-only">Open the Guide</span>
        <UIIcon name="book" type="large" />
      </button>
    </h2>
    <NuxtErrorBoundary>
      <AccountGetFriendsSearchForm v-if="isDesktop" />
      <p class="text-lg dark:text-white" v-else>
        Sorry you're device is not supported
      </p>

      <LazyUILoading v-if="requestMetadata.friends.pending" />
      <AccountGetFriendsResults
        v-else-if="
          !requestMetadata.friends.pending && requestMetadata.friends.response
        "
        class="flex h-[17.5rem] flex-col gap-y-5 overflow-y-scroll"
      />

      <template #error="{ error }">
        <AccountGetFriendsSearchForm
          @clear-errors="error.value = null"
          class="mb-10"
        />

        <div class="flex flex-col items-center gap-y-2">
          <UIIcon :custom="true" name="error" />
          <h1 class="text-center text-lg font-bold dark:text-white">
            {{
              (error.value.message as string).includes("Unauthorized") ||
              (error.value.message as string).includes("401")
                ? "Oops, looks like you've got an inactive token 😅"
                : (error.value.message as string).includes("Failed to fetch")
                ? "Oops, there was an error sending the request 🤪"
                : error.value.message
            }}
          </h1>
        </div>
      </template>
    </NuxtErrorBoundary>
  </aside>
</template>
