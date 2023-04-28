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
    <NuxtLink to="/">
      <NuxtIcon name="logo" filled class="text-7xl" />
    </NuxtLink>

    <!-- Navigation links -->
    <div
      class="flex gap-x-4 items-center bg-blurple/30 dark:bg-blurple p-3 rounded-lg"
    >
      <NuxtLink
        to="/"
        class="flex gap-x-2 items-center px-3 py-1 rounded-lg"
        :class="{ 'bg-white/30': $route.name === 'index' }"
      >
        Search
        <UIIcon name="search" type="normal" />
      </NuxtLink>

      <NuxtLink to="/account">
        <UIButton
          :type="$route.name === 'account' ? 'menu-active' : 'menu-inactive'"
          class="hover:bg-white/30"
        >
          Use Account
          <UIIcon name="person-badge" type="normal" />
        </UIButton>
      </NuxtLink>
    </div>

    <!-- Toggle theme -->

    <UIIcon
      :name="
        currentThemeCount === 0
          ? 'display-fill'
          : currentThemeCount === 1
          ? 'brightness-high-fill'
          : 'moon-stars-fill'
      "
      @click="toggleTheme"
      class="cursor-pointer dark:text-white"
      type="normal"
    />
  </nav>
</template>
