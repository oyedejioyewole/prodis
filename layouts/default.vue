<template>
  <div class="w-[90%] mx-auto py-5 selection:bg-blurple/50">
    <!-- Navigation -->
    <Navigation class="flex justify-between items-center" />

    <!-- Content -->
    <slot />

    <!-- Footer -->
    <Footer />
  </div>
</template>
