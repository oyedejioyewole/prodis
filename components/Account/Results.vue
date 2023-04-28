<script setup lang="ts">
import type { RequestMetadata } from "~/project";

const requestMetadata = useState<RequestMetadata>("metadata");
</script>

<template>
  <section
    v-if="
      requestMetadata.global.response &&
      'profile' in requestMetadata.global.response
    "
  >
    <div class="flex flex-col gap-y-6">
      <!-- 1st section  -->
      <div class="flex flex-col">
        <h1 class="font-serif text-3xl 2xl:text-4xl dark:text-white">
          Account Information
        </h1>

        <UIBadges
          :badge-number="requestMetadata.global.response.profile.badges"
          type="display"
          class="w-fit"
        />

        <div class="inline-flex gap-x-1 items-center text-lg">
          <h2 class="dark:text-white">
            This account is
            {{
              requestMetadata.global.response.profile.verified
                ? "verified"
                : "not verified"
            }}
          </h2>
          <UIIcon
            :name="`${
              requestMetadata.global.response.profile.verified
                ? 'check2-circle'
                : 'x-circle'
            }`"
            type="normal"
            class="text-white"
          />
        </div>
        <h2 class="text-lg dark:text-white">
          This account has multi-factor authentication
          {{
            requestMetadata.global.response.profile
              .twoFactorAuthenticationStatus
          }}
        </h2>
        <h2 class="text-lg dark:text-white">
          Has been a user since the
          {{ requestMetadata.global.response.profile.createdAt }}
        </h2>
      </div>

      <!-- 2nd section -->
      <div class="flex flex-col gap-y-2">
        <h1 class="text-3xl 2xl:text-4xl font-serif dark:text-white">Guilds</h1>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(guild, index) of requestMetadata.global.response.guilds
              .sanitized"
            :key="index"
            class="cursor-pointer"
          >
            <LazyNuxtImg
              width="50"
              height="50"
              class="rounded-2xl"
              :src="guild.icon"
              v-if="guild.icon"
              :alt="`${guild.name} icon`"
              :title="guild.name"
            />
          </div>
        </div>
      </div>

      <!-- 3rd section -->
      <div class="flex flex-col gap-y-2">
        <h1 class="text-3xl 2xl:text-4xl font-serif dark:text-white">
          Connections
        </h1>
        <div class="flex flex-wrap gap-x-2">
          <div
            v-for="(connection, index) of requestMetadata.global.response
              .connections.sanitized"
            :key="index"
          >
            <UIIcon
              :name="connection.type"
              class="dark:text-white"
              type="large"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
