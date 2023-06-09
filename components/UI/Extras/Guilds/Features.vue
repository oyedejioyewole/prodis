<script setup lang="ts">
defineProps<{ features: UsableGuildFeatures[] }>();

const supportedFeatures = [
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
] satisfies Omit<
  UsableGuildFeatures,
  | "role-subscriptions-available-for-purchase"
  | "role-role-subscriptions-enabled"
>[];
</script>

<template>
  <!-- Guild features: START -->
  <div class="flex flex-wrap items-end gap-3">
    <div
      v-for="(feature, index) of features.filter((feature) =>
        supportedFeatures.includes(feature)
      )"
      :key="index"
    >
      <LazyUIIcon
        :custom="true"
        name="animated-banner"
        v-if="feature === 'animated-banner'"
      />
      <LazyUIIcon
        :custom="true"
        name="animated-icon"
        v-else-if="feature === 'animated-icon'"
      />
      <LazyUIIcon
        :custom="true"
        name="application-command-permissions-v2"
        v-else-if="feature === 'application-command-permissions-v2'"
      />
      <LazyUIIcon
        name="shield-check"
        class="text-3xl"
        v-else-if="feature === 'auto-moderation'"
      />

      <LazyUIIcon
        :custom="true"
        name="banner"
        v-else-if="feature === 'banner'"
      />

      <LazyUIIcon
        :custom="true"
        name="community"
        v-else-if="feature === 'community'"
      />
      <LazyUIIcon
        name="wallet"
        class="text-3xl"
        v-else-if="feature === 'creator-monetizable-provisional'"
      />
      <LazyUIIcon
        name="shop"
        class="text-3xl"
        v-else-if="feature === 'creator-store-page'"
      />

      <LazyUIIcon
        :custom="true"
        name="developer-support-server"
        v-else-if="feature === 'developer-support-server'"
      />
      <LazyUIIcon
        name="compass"
        class="text-3xl"
        v-else-if="feature === 'discoverable'"
      />

      <LazyUIIcon
        name="trophy"
        class="text-3xl"
        v-else-if="feature === 'featurable'"
      />

      <LazyUIIcon
        name="envelope-slash"
        class="text-3xl"
        v-else-if="feature === 'invites-disabled'"
      />
      <LazyUIIcon
        :custom="true"
        name="invite-splash"
        v-else-if="feature === 'invite-splash'"
      />

      <LazyUIIcon
        name="person-check"
        class="text-3xl"
        v-else-if="feature === 'member-verification-gate-enabled'"
      />
      <LazyUIIcon
        name="more-stickers"
        :custom="true"
        v-else-if="feature === 'more-stickers'"
      />

      <LazyUIIcon
        name="newspaper"
        class="text-3xl"
        v-else-if="feature === 'news'"
      />

      <LazyUIIcon
        name="partnered"
        :custom="true"
        v-else-if="feature === 'partnered'"
      />
      <LazyUIIcon
        name="play-btn"
        class="text-3xl"
        v-else-if="feature === 'preview-enabled'"
      />

      <LazyUIIcon
        name="bell-slash"
        class="text-3xl"
        v-else-if="feature === 'raid-alerts-disabled'"
      />
      <LazyUIIcon
        name="role-icons"
        :custom="true"
        v-else-if="feature === 'role-icons'"
      />

      <LazyUIIcon
        name="ticket-detailed"
        class="text-3xl"
        v-else-if="feature === 'ticketed-events-enabled'"
      />

      <LazyUIIcon
        name="link-45deg"
        class="text-3xl"
        v-else-if="feature === 'vanity-url'"
      />

      <LazyUIIcon
        name="patch-check"
        class="text-3xl"
        v-else-if="feature === 'verified'"
      />
      <LazyUIIcon
        name="vip-regions"
        :custom="true"
        v-else-if="feature === 'vip-regions'"
      />

      <LazyUIIcon
        name="welcome-screen-enabled"
        :custom="true"
        v-else-if="feature === 'welcome-screen-enabled'"
      />
    </div>
  </div>
  <!-- Guild features: END -->
</template>
