<script setup lang="ts">
const { signIn, status } = useSession();
</script>

<template>
  <div>
    <svg
      class="2xl:w-32 2xl:h-32 h-24 w-24 fill-black/70"
      role="img"
      aria-label="Discord logo"
    >
      <use xlink:href="~/assets/bootstrap-icons.svg#discord" />
    </svg>
    <button
      class="p-5 rounded-tl-2xl rounded-br-2xl my-5 bg-black/50 text-white focus:ring focus:ring-black/50 outline-none focus:ring-offset-2 transition flex gap-2 items-center group hover:bg-transparent border-2 border-black/10 hover:text-black hover:border-black/50"
      v-if="status === 'unauthenticated'"
      @click="signIn('discord', { callbackUrl: '/account' })"
    >
      Use my account

      <svg
        class="w-6 h-6 fill-white transition group-hover:fill-black"
        role="img"
        aria-label="Arrow right"
      >
        <use xlink:href="~/assets/bootstrap-icons.svg#arrow-right" />
      </svg>
    </button>
    <NuxtLink
      v-else
      to="/account"
      class="p-5 rounded-tl-2xl rounded-br-2xl my-5 bg-black/50 focus:ring text-white focus:ring-black outline-none transition focus:ring-offset-2 flex gap-2 items-center hover:bg-transparent hover:border-black/50 border-2 border-black/10 hover:text-black group"
    >
      View my profile

      <svg
        class="w-6 h-6 fill-white transition group-hover:fill-black"
        role="img"
        aria-label="Arrow right"
      >
        <use xlink:href="~/assets/bootstrap-icons.svg#arrow-right" />
      </svg>
    </NuxtLink>
  </div>
</template>
