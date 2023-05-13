<script setup lang="ts">
import type { RequestMetadata } from "~/project";

useHead({
  title: "Account",
});

const requestMetadata = useState<RequestMetadata>("metadata");
const { session } = await useSession();

watch(session, (_new) => {
  if (_new && "processed" in _new) {
    requestMetadata.value.global = {
      pending: false,
      response: _new.processed,
    };
  }
});

const navigateToDiscord = async () => {
  const {
    public: {
      discord: { id, redirectUrl, baseURL },
    },
  } = useRuntimeConfig();
  const { csrf } = useCsrf() as { csrf: string };

  await navigateTo(
    `${baseURL}/oauth2/authorize?client_id=${id}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}&response_type=code&scope=${encodeURIComponent(
      "identify connections email guilds"
    )}&state=${csrf}`,
    { external: true }
  );
};
</script>

<template>
  <section class="flex min-h-screen py-10 gap-x-10">
    <!-- Account section -->
    <section
      class="flex-auto flex flex-col gap-y-4 justify-center"
      :class="{
        'items-center': !(
          requestMetadata.global.response &&
          'profile' in requestMetadata.global.response
        ),
      }"
    >
      <NuxtErrorBoundary>
        <!--  Results (if any) -->
        <LazyAccountResults
          v-if="
            !requestMetadata.global.pending &&
            requestMetadata.global.response &&
            'profile' in requestMetadata.global.response
          "
        />

        <!-- Default (if any) -->
        <div v-else class="contents">
          <h1 class="text-4xl font-serif dark:text-white">
            Whenever you're ready
          </h1>

          <!-- Login button -->
          <UIButton
            type="normal"
            class="px-10 py-5 text-lg"
            @click="navigateToDiscord()"
          >
            Login <UIIcon name="door-open-fill" type="normal" />
          </UIButton>
        </div>

        <template #error="{ error }">
          <h1>{{ error.value.message }}</h1>
        </template>
      </NuxtErrorBoundary>
    </section>

    <!-- Get Friends section -->
    <AccountGetFriendsSection
      class="flex-none flex flex-col gap-y-10 w-[40%] 2xl:w-1/4 border-black/40 dark:border-white/30 border-2 rounded-lg px-10 dark:text-white border-dashed justify-center overflow-y-scroll h-fit my-auto py-20"
    />
    <UIModal content="guide" />
  </section>
</template>
