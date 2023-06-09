<script setup lang="ts">
const theme = useColorMode();
const isMobileMenuVisible = ref(false);

const toggleTheme = () => {
  if (theme.preference === "dark") theme.preference = "light";
  else if (theme.preference === "light") theme.preference = "dark";
};
</script>

<template>
  <nav>
    <!-- Hamburger icon -->
    <button
      class="w-8 space-y-2 md:hidden"
      @click="isMobileMenuVisible = !isMobileMenuVisible"
      type="button"
    >
      <span class="sr-only">Menu button</span>
      <span
        class="block h-[3px] w-full rounded-full bg-black dark:bg-white"
      ></span>
      <span
        class="block h-[3px] w-3/4 rounded-full bg-black dark:bg-white"
      ></span>
      <span
        class="block h-[3px] w-1/2 rounded-full bg-black dark:bg-white"
      ></span>
    </button>

    <ul
      class="absolute top-0 z-10 flex min-w-[90%] flex-col items-center gap-y-4 rounded-xl bg-[#001185] p-10 text-xl text-white transition duration-500 md:hidden"
      :class="{
        'translate-y-20 opacity-100': isMobileMenuVisible,
        '-translate-y-32 opacity-0 ': !isMobileMenuVisible,
      }"
    >
      <li>
        <LazyNuxtLink
          to="/"
          class="flex items-center gap-x-2"
          :class="{ 'underline underline-offset-8': $route.name === 'index' }"
          :prefetch="true"
        >
          Search <LazyUIIcon name="search" type="normal" />
        </LazyNuxtLink>
      </li>
      <li>
        <LazyNuxtLink
          to="/account"
          class="flex items-center gap-x-2"
          :class="{ 'underline underline-offset-8': $route.name === 'account' }"
          :prefetch="true"
        >
          Account <UIIcon name="person-badge" type="normal" />
        </LazyNuxtLink>
      </li>
    </ul>

    <!-- Logo -->
    <LazyNuxtLink
      to="/"
      class="rounded-lg focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-black/50 dark:focus-visible:outline-white/50"
      :prefetch="true"
    >
      <span class="sr-only">Prodis</span>
      <LazyUIIcon :custom="true" name="logo" />
    </LazyNuxtLink>

    <!-- Navigation links -->
    <div
      class="hidden items-center gap-x-4 rounded-lg bg-blurple/30 p-3 transition dark:bg-blurple md:flex"
    >
      <LazyUIButton
        :type="$route.name === 'index' ? 'menu-active' : 'menu-inactive'"
        @click="navigateTo('/')"
      >
        Search
        <LazyUIIcon name="search" type="normal" />
      </LazyUIButton>

      <LazyUIButton
        :type="$route.name === 'account' ? 'menu-active' : 'menu-inactive'"
        @click="navigateTo('/account')"
      >
        Use Account
        <LazyUIIcon name="person-badge" type="normal" />
      </LazyUIButton>
    </div>

    <!-- Toggle theme -->
    <button
      class="rounded-lg focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-black/50 dark:focus-visible:outline-white/50"
      @click="toggleTheme"
      type="button"
    >
      <span class="sr-only">Toggle theme</span>
      <LazyColorScheme
        placeholder="Loading ..."
        tag="span"
        class="dark:text-white"
      >
        <LazyUIIcon
          :name="`${
            $colorMode.value === 'light'
              ? 'brightness-high'
              : $colorMode.value === 'dark'
              ? 'moon-stars-fill'
              : 'display'
          }`"
          class="cursor-pointer dark:text-white"
          type="normal"
      /></LazyColorScheme>
    </button>
  </nav>
</template>

<style>
:deep(.v-enter-from) {
  opacity: 0;
}

:deep(.v-enter-to) {
  opacity: 100;
}
</style>
