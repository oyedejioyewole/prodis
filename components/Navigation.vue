<script setup lang="ts">
const currentThemeCount = ref(0);
const theme = useColorMode();

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
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="focus:outline-none dark:focus-visible:outline-white/50 focus-visible:outline-black/50 focus-visible:outline-offset-4 rounded-lg"
    >
      <LazySvgoLogo filled class="w-12 aspect-square" />
    </NuxtLink>

    <!-- Navigation links -->
    <div
      class="flex gap-x-4 items-center bg-blurple/30 dark:bg-blurple p-3 rounded-lg transition"
    >
      <UIButton
        :type="$route.name === 'index' ? 'menu-active' : 'menu-inactive'"
        @click="navigateTo('/')"
      >
        Search
        <UIIcon name="search" type="normal" />
      </UIButton>

      <UIButton
        :type="$route.name === 'account' ? 'menu-active' : 'menu-inactive'"
        @click="navigateTo('/account')"
      >
        Use Account
        <UIIcon name="person-badge" type="normal" />
      </UIButton>
    </div>

    <!-- Toggle theme -->
    <button
      class="focus:outline-none focus-visible:outline-black/50 dark:focus-visible:outline-white/50 focus-visible:outline-offset-4 rounded-lg"
      @click="toggleTheme"
    >
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
      />
    </button>
  </nav>
</template>
