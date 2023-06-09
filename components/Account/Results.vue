<script setup lang="ts">
const requestMetadata = useState<RequestMetadata>("metadata");

const isImageLoading = ref(true);

const postLazyLoad = () => (isImageLoading.value = false);
</script>

<template>
  <div v-if="requestMetadata.account.response">
    <div class="flex flex-col gap-y-6">
      <!-- 1st section (Account information)  -->
      <div
        class="relative flex flex-col gap-y-5 rounded-2xl bg-black/10 p-10 dark:bg-white/10 dark:text-white"
      >
        <!-- Heading -->
        <h1 class="font-serif text-3xl 2xl:text-4xl">Account Information</h1>

        <div class="space-y-2">
          <!-- Account badges? -->
          <h2 class="inline-flex items-center gap-x-1">
            <b class="font-serif text-lg dark:text-white">Badges:</b>
            <LazyUIExtrasBadges
              :badges="requestMetadata.account.response.profile.badges"
              :bot="requestMetadata.account.response.profile.bot ?? false"
              class="w-fit"
              v-if="
                Array.isArray(requestMetadata.account.response.profile.badges)
              "
            />
            <h3 class="text-lg dark:text-white" v-else>None 🤪</h3>
          </h2>

          <!-- Connected accounts -->
          <div>
            <template
              v-if="requestMetadata.account.response.connections.length > 0"
            >
              <h3 class="text-lg">You've connected the following accounts</h3>
              <LazyUIExtrasConnectedAccounts
                :connections="requestMetadata.account.response.connections"
              />
            </template>
            <h3 class="text-lg" v-else>You've not connected any account 😢</h3>
          </div>
        </div>

        <div>
          <!-- Verified account? -->
          <h3 class="flex items-center gap-x-1 text-lg">
            Your are
            <span class="font-serif">
              {{
                requestMetadata.account.response.profile.verified
                  ? "verified"
                  : "not verified"
              }}
            </span>
            <LazyUIIcon
              :name="`${
                requestMetadata.account.response.profile.verified
                  ? 'patch-check'
                  : 'patch-exclamation'
              }`"
              type="normal"
            />
          </h3>

          <!-- Has nitro? -->
          <h3 class="flex items-center gap-x-1 text-lg">
            Your account
            {{
              requestMetadata.account.response.profile.nitroStatus.includes(
                "nitro"
              )
                ? "has"
                : "doesn't have"
            }}
            <div class="flex">
              <LazyUIIcon name="nitro" :custom="true" />
              <LazyUIIcon
                name="plus"
                type="large"
                v-if="
                  requestMetadata.account.response.profile.nitroStatus ===
                  'nitro'
                "
              />
            </div>
          </h3>

          <!-- Account language -->
          <h3 class="text-lg">
            Your default language is
            <span class="font-serif">{{
              requestMetadata.account.response.profile.locale
            }}</span>
          </h3>

          <!-- Multi-factor authentication state -->
          <h3 class="text-lg">
            You have multi-factor authentication
            <span class="font-serif">{{
              requestMetadata.account.response.profile
                .multiFactorAuthenticationStatus
            }}</span>
          </h3>

          <!-- Joined at -->
          <h3 class="text-lg">
            Joined on the
            <span class="font-serif">
              {{ requestMetadata.account.response.profile.createdAt }}
            </span>
          </h3>
        </div>

        <button
          class="absolute bottom-8 right-10 ml-auto inline-flex cursor-pointer items-center gap-2"
          @click="
            useDownload(
              requestMetadata.account.response.profile.download,
              'account'
            )
          "
        >
          Save (JSON)
          <LazyUIIcon name="save" type="normal" />
        </button>
        <!-- END -->
      </div>

      <!-- 2nd section (Guilds) -->
      <div class="flex flex-col gap-y-4 p-10 2xl:gap-y-2">
        <!-- START -->
        <h1
          class="inline-flex items-center justify-between font-serif text-3xl dark:text-white 2xl:text-4xl"
        >
          Guilds
          <span
            class="inline-flex cursor-pointer items-center gap-x-2 font-sans text-lg"
            @click="
              useDownload(requestMetadata.account.response.guilds, 'guilds')
            "
          >
            Save (JSON)
            <LazyUIIcon name="save" type="normal" />
          </span>
        </h1>
        <div
          class="flex flex-wrap items-center gap-2"
          v-if="requestMetadata.account.response.guilds.length > 0"
        >
          <button
            v-for="(guild, index) of requestMetadata.account.response.guilds"
            :key="index"
            @click="useModal(true, guild)"
          >
            <LazyNuxtImg
              width="50"
              height="50"
              class="aspect-square w-[50px] rounded-2xl object-cover"
              :class="{
                'animate-pulse bg-gray-300': isImageLoading,
              }"
              :src="guild.icon"
              v-if="guild.icon"
              :alt="`${guild.name} icon`"
              @load="postLazyLoad"
            />
            <LazyUIPlaceholders :text="guild.name" v-else />
          </button>
        </div>
        <h2 class="text-lg" v-else>Oops, you aren't in any guilds 😪</h2>
        <!-- END -->
      </div>
    </div>
  </div>
</template>
