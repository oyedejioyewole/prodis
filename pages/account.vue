<script setup lang="ts">
import type { RequestMetadata } from "~/project";

useHead({
  title: "Account",
});

const { csrf } = useCsrf();
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

const discordOAuthURLComponents = {
  client_id: useRuntimeConfig().public.discord.id,
  redirect_uri: encodeURIComponent(
    useRuntimeConfig().public.discord.redirectUrl
  ),
  response_type: "code",
  scope: encodeURIComponent("identify connections email guilds"),
  state: encodeURIComponent(csrf as string),
};

const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordOAuthURLComponents.client_id}&redirect_uri=${discordOAuthURLComponents.redirect_uri}&response_type=${discordOAuthURLComponents.response_type}&scope=${discordOAuthURLComponents.scope}&state=${discordOAuthURLComponents.state}`;
</script>

<template>
  <main class="flex min-h-screen py-10 gap-x-10">
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
        <!-- v-else-if Results -->
        <LazyAccountResults
          v-if="
            !requestMetadata.global.pending &&
            requestMetadata.global.response &&
            'profile' in requestMetadata.global.response
          "
        />
        <section v-else class="contents">
          <h1 class="text-4xl font-serif dark:text-white">
            Whenever you're ready
          </h1>

          <!-- Login button -->
          <NuxtLink :to="discordOAuthUrl" class="w-fit">
            <UIButton type="normal" class="px-10 py-5 text-lg">
              Login <UIIcon name="door-open-fill" type="normal" />
            </UIButton>
          </NuxtLink>
        </section>

        <template #error="{ error }">
          <h1>{{ error.value.message }}</h1>
        </template>
      </NuxtErrorBoundary>
    </section>
    <AccountGetFriendsSection
      class="flex-none flex flex-col gap-y-10 w-[40%] 2xl:w-1/4 border-black/40 dark:border-white/30 border-2 rounded-lg px-10 dark:text-white border-dashed justify-center overflow-y-scroll h-fit my-auto py-20"
    />
    <UIModal content="guide" />
  </main>
</template>
