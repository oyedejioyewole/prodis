<script setup lang="ts">
import { useModal } from "~/composables/useModal";

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
        <UIIcon
          :name="$colorMode.value === 'dark' ? 'book-fill' : 'book'"
          type="large"
        />
      </button>
    </h2>
    <NuxtErrorBoundary>
      <AccountGetFriendsSearchForm />
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
          <LazySvgoError class="w-32 fill-blurple" />
          <h1 class="text-center text-lg font-bold dark:text-white">
            {{
              (error.value.message as string).includes("Unauthorized")
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
