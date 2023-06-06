<script setup lang="ts">
const currentThemeCount = ref(0);
const theme = useColorMode();
const isMobileMenuVisible = ref(false);

if (theme.value === "light") {
  currentThemeCount.value = 1;
} else if (theme.value === "dark") {
  currentThemeCount.value = 2;
} else if (theme.value === "system") {
  currentThemeCount.value = 0;
}

const toggleTheme = () => {
  currentThemeCount.value++;

  if (currentThemeCount.value === 1) {
    theme.preference = "light";
  } else if (currentThemeCount.value === 2) {
    theme.preference = "dark";
  } else {
    theme.preference = "system";
    currentThemeCount.value = 0;
  }
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

    <ol
      class="absolute top-0 z-10 flex min-w-[90%] flex-col items-center gap-y-4 rounded-xl bg-[#001185] p-10 text-xl text-white transition duration-500 md:hidden"
      :class="{
        'translate-y-20 opacity-100': isMobileMenuVisible,
        '-translate-y-32 opacity-0 ': !isMobileMenuVisible,
      }"
    >
      <li>
        <NuxtLink
          to="/"
          class="flex items-center gap-x-2"
          :class="{ 'underline underline-offset-8': $route.name === 'index' }"
          :prefetch="true"
        >
          Search <UIIcon name="search" type="normal" color="black" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/account"
          class="flex items-center gap-x-2"
          :class="{ 'underline underline-offset-8': $route.name === 'account' }"
          :prefetch="true"
        >
          Account <UIIcon name="person-badge" type="normal" color="black" />
        </NuxtLink>
      </li>
    </ol>

    <!-- Logo -->
    <NuxtLink
      to="/"
      class="rounded-lg focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-black/50 dark:focus-visible:outline-white/50"
      :prefetch="true"
    >
      <span class="sr-only">Prodis</span>
      <UIIcon :custom="true" name="logo" />
    </NuxtLink>

    <!-- Navigation links -->
    <div
      class="hidden items-center gap-x-4 rounded-lg bg-blurple/30 p-3 transition dark:bg-blurple md:flex"
    >
      <UIButton
        :type="$route.name === 'index' ? 'menu-active' : 'menu-inactive'"
        @click="navigateTo('/')"
      >
        Search
        <UIIcon name="search" type="normal" color="black" />
      </UIButton>

      <UIButton
        :type="$route.name === 'account' ? 'menu-active' : 'menu-inactive'"
        @click="navigateTo('/account')"
      >
        Use Account
        <UIIcon name="person-badge" type="normal" color="black" />
      </UIButton>
    </div>

    <!-- Toggle theme -->
    <button
      class="rounded-lg focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-black/50 dark:focus-visible:outline-white/50"
      @click="toggleTheme"
      type="button"
    >
      <span class="sr-only">Toggle theme</span>
      <UIIcon
        :name="
          currentThemeCount === 0
            ? 'display-fill'
            : currentThemeCount === 1
            ? 'brightness-high-fill'
            : 'moon-stars-fill'
        "
        class="cursor-pointer dark:text-white"
        type="normal"
        color="black"
      />
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
