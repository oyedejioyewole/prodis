<script setup lang="ts">
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
  const { nanoid } = await import("nanoid");
  const {
    public: {
      discord: { id, redirectUrl, baseURL },
    },
  } = useRuntimeConfig();

  await navigateTo(
    `${baseURL}/oauth2/authorize?client_id=${id}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}&response_type=code&scope=${encodeURIComponent(
      "identify connections email guilds"
    )}&state=${nanoid(128)}`,
    { external: true }
  );
};
</script>

<template>
  <section class="flex min-h-screen flex-col gap-10 py-10 md:flex-row">
    <!-- Account section -->
    <section
      class="flex flex-auto flex-col justify-center gap-y-4"
      :class="{
        'items-center': !(
          requestMetadata.global.response &&
          'profile' in requestMetadata.global.response
        ),
      }"
    >
      <NuxtErrorBoundary>
        <!-- Results (if any) -->
        <LazyAccountResults
          v-if="
            !requestMetadata.global.pending &&
            requestMetadata.global.response &&
            'profile' in requestMetadata.global.response
          "
        />

        <!-- Default view -->
        <div v-else class="contents text-center">
          <h1 class="font-serif text-3xl dark:text-white md:text-4xl">
            Whenever you're ready
          </h1>

          <!-- Login button -->
          <UIButton
            type="normal"
            class="px-10 py-5 text-lg"
            @click="navigateToDiscord()"
          >
            Login <UIIcon name="door-open-fill" type="normal" color="white" />
          </UIButton>
        </div>

        <template #error="{ error }">
          <h1>{{ error.value.message }}</h1>
        </template>
      </NuxtErrorBoundary>
    </section>

    <!-- Get Friends section -->
    <AccountGetFriendsSection
      class="my-auto flex h-fit w-full flex-none flex-col justify-center gap-y-10 overflow-y-scroll rounded-lg border-2 border-dashed border-black/40 px-10 py-20 dark:border-white/30 dark:text-white md:w-1/2 lg:w-[40%] 2xl:w-1/4"
    />
    <UIModal content="faq" />
  </section>
</template>
