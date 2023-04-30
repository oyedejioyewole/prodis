<script setup lang="ts">
import type { RequestMetadata, Modal } from "~/project";

const requestMetadata = useState<RequestMetadata>("metadata");

const openPrivacyPolicy = async () =>
  (useState<Modal>("modal").value.isOpen = true);
</script>

<template>
  <aside>
    <h2
      class="text-3xl 2xl:text-4xl font-serif inline-flex justify-between items-center"
    >
      My Friends
      <button
        type="button"
        class="focus:outline-none focus-visible:outline-black/50 dark:focus-visible:outline-white/50 focus-visible:outline-offset-4 rounded-lg"
        @click="openPrivacyPolicy"
      >
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
        class="flex flex-col gap-y-5 h-[17.5rem] overflow-y-scroll"
      />

      <template #error="{ error }">
        <AccountGetFriendsSearchForm
          @clear-errors="error.value = null"
          class="mb-10"
        />

        <div class="flex flex-col gap-y-2 items-center">
          <LazySvgoError class="w-32 fill-blurple" />
          <h1 class="text-lg dark:text-white text-center font-bold">
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
