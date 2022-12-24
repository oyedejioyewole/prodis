<script setup lang="ts">
const session = useState<{
  user: {
    username: string;
    discriminator: string;
    accent_color: string;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    verified: boolean;
    image_url: string;
    access_token: string;
    email: string;
    flags?: number;
    guilds: Array<{
      name: string;
      icon: string | null;
      owner: boolean;
    }> | null;
    connections: Array<{
      name: string;
      type: string;
      verified: boolean;
    }> | null;
  };
}>("session");
</script>

<template>
  <div>
    <div v-for="{ type, name } in session.user.connections" :key="name">
      <NuxtIcon
        name="brands/battle-net"
        class="text-5xl text-black/60"
        v-if="type === 'battlenet'"
      />
      <NuxtIcon
        name="brands/ebay"
        class="text-6xl text-black/50"
        v-else-if="type === 'ebay'"
      />
      <NuxtIcon
        name="brands/epic-games"
        class="text-6xl text-black/50"
        v-else-if="type === 'epicgames'"
      />
      <NuxtIcon
        name="brands/riot-games"
        class="text-6xl text-black/50"
        v-else-if="type === 'riotgames'"
      />
      <NuxtIcon
        name="brands/league-of-legends"
        class="text-4xl text-black/50"
        v-else-if="type === 'leagueoflegends'"
      />
      <svg class="w-8 h-8 fill-black/70" v-else-if="type === 'facebook'">
        <use xlink:href="~/assets/bootstrap-icons.svg#facebook" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'github'">
        <use xlink:href="~/assets/bootstrap-icons.svg#github" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'paypal'">
        <use xlink:href="~/assets/bootstrap-icons.svg#paypal" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'playstation'">
        <use xlink:href="~/assets/bootstrap-icons.svg#playstation" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'reddit'">
        <use xlink:href="~/assets/bootstrap-icons.svg#reddit" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'spotify'">
        <use xlink:href="~/assets/bootstrap-icons.svg#spotify" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'skype'">
        <use xlink:href="~/assets/bootstrap-icons.svg#skype" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'steam'">
        <use xlink:href="~/assets/bootstrap-icons.svg#steam" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'twitch'">
        <use xlink:href="~/assets/bootstrap-icons.svg#twitch" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'twitter'">
        <use xlink:href="~/assets/bootstrap-icons.svg#twitter" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'xbox'">
        <use xlink:href="~/assets/bootstrap-icons.svg#xbox" /></svg
      ><svg class="w-8 h-8 fill-black/70" v-else-if="type === 'youtube'">
        <use xlink:href="~/assets/bootstrap-icons.svg#youtube" />
      </svg>
    </div>
  </div>
</template>
