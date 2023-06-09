<script setup lang="ts">
defineProps<
  Partial<{
    badges: Badges;
    features: UsableGuildFeatures[];
    bot: boolean;
  }>
>();

const supportedFeatures: Array<
  Omit<
    UsableGuildFeatures,
    | "role-subscriptions-available-for-purchase"
    | "role-role-subscriptions-enabled"
  >
> = [
  "animated-banner",
  "animated-icon",
  "application-command-permissions-v2",
  "auto-moderation",
  "banner",
  "community",
  "creator-monetizable-provisional",
  "creator-store-page",
  "developer-support-server",
  "discoverable",
  "featurable",
  "invites-disabled",
  "invite-splash",
  "member-verification-gate-enabled",
  "more-stickers",
  "news",
  "partnered",
  "preview-enabled",
  "raid-alerts-disabled",
  "role-icons",
  "ticketed-events-enabled",
  "vanity-url",
  "verified",
  "vip-regions",
  "welcome-screen-enabled",
];
</script>

<template>
  <div class="flex items-center gap-x-1" v-if="badges">
    <code class="dark:text-white">Badges:</code>

    <!-- Badges: START -->
    <div class="flex items-center gap-x-2" v-if="Array.isArray(badges)">
      <div v-for="(badge, index) of badges" :key="index">
        <UIIcon :name="badge" :custom="true" />
        <h1
          class="inline-flex items-center gap-x-1 rounded-xl bg-blurple px-3 py-1 dark:text-white"
          v-if="bot"
        >
          Bot
          <UIIcon
            name="patch-check"
            class="dark:text-white"
            type="normal"
            v-if="badge === 'verified-bot'"
          />
        </h1>
      </div>
    </div>
    <h3 v-else class="text-lg dark:text-white">None 🤪</h3>
    <!-- Badges: END -->
  </div>

  <div v-else-if="features">
    <div class="flex flex-wrap items-end gap-3">
      <div
        v-for="(feature, index) of features.filter((feature) =>
          supportedFeatures.includes(feature)
        )"
        :key="index"
      >
        <UIIcon
          :custom="true"
          name="animated-banner"
          v-if="feature === 'animated-banner'"
        />
        <UIIcon
          :custom="true"
          name="animated-icon"
          v-else-if="feature === 'animated-icon'"
        />
        <UIIcon
          :custom="true"
          name="application-command-permissions-v2"
          v-else-if="feature === 'application-command-permissions-v2'"
        />
        <UIIcon
          name="shield-check"
          class="text-3xl"
          v-else-if="feature === 'auto-moderation'"
        />

        <UIIcon :custom="true" name="banner" v-else-if="feature === 'banner'" />

        <UIIcon
          :custom="true"
          name="community"
          v-else-if="feature === 'community'"
        />
        <UIIcon
          name="wallet"
          class="text-3xl"
          v-else-if="feature === 'creator-monetizable-provisional'"
        />
        <UIIcon
          name="shop"
          class="text-3xl"
          v-else-if="feature === 'creator-store-page'"
        />

        <UIIcon
          :custom="true"
          name="developer-support-server"
          v-else-if="feature === 'developer-support-server'"
        />
        <UIIcon
          name="compass"
          class="text-3xl"
          v-else-if="feature === 'discoverable'"
        />

        <UIIcon
          name="trophy"
          class="text-3xl"
          v-else-if="feature === 'featurable'"
        />

        <UIIcon
          name="envelope-slash"
          class="text-3xl"
          v-else-if="feature === 'invites-disabled'"
        />
        <UIIcon
          :custom="true"
          name="invite-splash"
          v-else-if="feature === 'invite-splash'"
        />

        <UIIcon
          name="person-check"
          class="text-3xl"
          v-else-if="feature === 'member-verification-gate-enabled'"
        />
        <UIIcon
          name="more-stickers"
          :custom="true"
          v-else-if="feature === 'more-stickers'"
        />

        <UIIcon
          name="newspaper"
          class="text-3xl"
          v-else-if="feature === 'news'"
        />

        <UIIcon
          name="partnered"
          :custom="true"
          v-else-if="feature === 'partnered'"
        />
        <UIIcon
          name="play-btn"
          class="text-3xl"
          v-else-if="feature === 'preview-enabled'"
        />

        <UIIcon
          name="bell-slash"
          class="text-3xl"
          v-else-if="feature === 'raid-alerts-disabled'"
        />
        <UIIcon
          name="role-icons"
          :custom="true"
          v-else-if="feature === 'role-icons'"
        />

        <UIIcon
          name="ticket-detailed"
          class="text-3xl"
          v-else-if="feature === 'ticketed-events-enabled'"
        />

        <UIIcon
          name="link-45deg"
          class="text-3xl"
          v-else-if="feature === 'vanity-url'"
        />

        <UIIcon
          name="patch-check"
          class="text-3xl"
          v-else-if="feature === 'verified'"
        />
        <UIIcon
          name="vip-regions"
          :custom="true"
          v-else-if="feature === 'vip-regions'"
        />

        <UIIcon
          name="welcome-screen-enabled"
          :custom="true"
          v-else-if="feature === 'welcome-screen-enabled'"
        />
      </div>
    </div>
  </div>
</template>
