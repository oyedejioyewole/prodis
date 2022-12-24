<script setup lang="ts">
import Color from "color";

definePageMeta({ middleware: "auth" });

const session = useState<{ user: User }>("session");
const modal = useState<Modal>("modal", () => ({
  isOpen: false,
  payload: {},
}));

const accentColor = Color(session.value.user.accent_color).rgb().alpha(0.5);

const cleanupModal = () => {
  modal.value.isOpen = false;

  setTimeout(() => {
    modal.value.type = undefined;
    modal.value.payload = {};
  }, 1000);
};

const navigateBack = (event: Event) => {
  const element = event.target as HTMLElement;
  if (element.id === "clickable-area") {
    navigateTo("/");
  }
};
</script>

<template>
  <Head>
    <Title>Account</Title>
  </Head>
  <main
    class="min-h-screen bg-no-repeat grid place-items-center overflow-y-hidden cursor-pointer"
    :style="`background-image: linear-gradient(to bottom right, ${accentColor}, #ba83e2)`"
    @click="navigateBack"
    id="clickable-area"
  >
    <AccountContent
      class="mx-auto flex flex-col items-center justify-center my-36 rounded-2xl gap-x-10 2xl:w-1/4 w-1/2 backdrop-blur-lg bg-white/60 py-36 z-10 cursor-default select-none"
    />
  </main>
  <ModalWrapper @close-modal="cleanupModal" />
</template>
