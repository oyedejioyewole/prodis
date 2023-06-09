<script setup lang="ts">
const requestMetadata = useState<RequestMetadata>("metadata");
const customIcons = [
  "battlenet",
  "ebay",
  "epicgames",
  "leagueoflegends",
  "riotgames",
];

const isImageLoading = ref(true);

const postLazyLoad = () => (isImageLoading.value = false);
</script>

<template>
  <div
    v-if="
      requestMetadata.global.response &&
      'profile' in requestMetadata.global.response
    "
  >
    <div class="flex flex-col gap-y-6">
      <!-- 1st section (Account information)  -->
      <div
        class="relative flex flex-col rounded-2xl bg-black/10 p-10 dark:bg-white/10 dark:text-white"
      >
        <!-- Heading -->
        <h1 class="font-serif text-3xl 2xl:text-4xl">Account Information</h1>

        <!-- Account badges? -->
        <UIBadgesOrFeatures
          :badges="requestMetadata.global.response.profile.badges"
          :bot="requestMetadata.global.response.profile.bot ?? false"
          type="display"
          class="w-fit"
        />

        <!-- Verified account? -->
        <h3 class="inline-flex items-center gap-x-1 text-lg">
          Your are
          <span class="font-serif">
            {{
              requestMetadata.global.response.profile.verified
                ? "verified"
                : "not verified"
            }}
          </span>
          <UIIcon
            :name="`${
              requestMetadata.global.response.profile.verified
                ? 'patch-check'
                : 'patch-exclamation'
            }`"
            type="normal"
          />
        </h3>

        <!-- Has nitro? -->
        <h3 class="inline-flex items-center gap-x-1 text-lg">
          Your account
          {{
            requestMetadata.global.response.profile.nitroStatus.includes(
              "nitro"
            )
              ? "has"
              : "doesn't have"
          }}
          <div class="flex">
            <UIIcon name="nitro" :custom="true" />
            <UIIcon
              name="plus"
              type="large"
              v-if="
                requestMetadata.global.response.profile.nitroStatus === 'nitro'
              "
            />
          </div>
        </h3>

        <!-- Account language -->
        <h3 class="text-lg">
          Your default language is
          <span class="font-serif">{{
            requestMetadata.global.response.profile.locale
          }}</span>
        </h3>

        <!-- Multi-factor authentication state -->
        <h3 class="text-lg">
          You have multi-factor authentication
          <span class="font-serif">{{
            requestMetadata.global.response.profile
              .multiFactorAuthenticationStatus
          }}</span>
        </h3>

        <!-- Joined at -->
        <h3 class="text-lg">
          Joined on the
          <span class="font-serif">
            {{ requestMetadata.global.response.profile.createdAt }}
          </span>
        </h3>

        <button
          class="absolute bottom-8 right-10 ml-auto inline-flex cursor-pointer items-center gap-2"
          @click="
            useDownload(
              requestMetadata.global.response.profile.download,
              'account'
            )
          "
        >
          Save (JSON)
          <UIIcon name="save" type="normal" />
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
              useDownload(
                requestMetadata.global.response.guilds.download,
                'guilds'
              )
            "
          >
            Save (JSON)
            <UIIcon name="save" type="normal" />
          </span>
        </h1>
        <div
          class="flex flex-wrap items-center gap-2"
          v-if="requestMetadata.global.response.guilds.sanitized.length > 0"
        >
          <button
            v-for="(guild, index) of requestMetadata.global.response.guilds
              .sanitized"
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
            <UIPlaceholders :text="guild.name" v-else />
          </button>
        </div>
        <h2 class="text-lg" v-else>Oops, you aren't in any guilds 😪</h2>
        <!-- END -->
      </div>

      <!-- 3rd section (Connections) -->
      <div class="flex flex-col gap-y-4 p-10 2xl:gap-y-2">
        <!-- START -->
        <h1
          class="inline-flex items-center justify-between font-serif text-3xl dark:text-white 2xl:text-4xl"
        >
          Connections
          <span
            class="inline-flex cursor-pointer items-center gap-x-2 font-sans text-lg"
            @click="
              useDownload(
                requestMetadata.global.response.connections.download,
                'connections'
              )
            "
          >
            Save (JSON)
            <UIIcon name="save" type="normal" />
          </span>
        </h1>
        <div
          class="flex flex-wrap gap-x-2"
          v-if="
            requestMetadata.global.response.connections.sanitized.length > 0
          "
        >
          <div
            v-for="(connection, index) of requestMetadata.global.response
              .connections.sanitized"
            :key="index"
          >
            <UIIcon
              :name="connection.type"
              class="dark:text-white"
              type="large"
              v-if="!customIcons.includes(connection.type)"
            />
            <UIIcon :custom="true" :name="connection.type" v-else />
          </div>
        </div>
        <h2 class="text-lg" v-else>
          Oops, you haven't connected any accounts 😪
        </h2>
        <!-- END -->
      </div>
    </div>
  </div>
</template>
