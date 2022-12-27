<script setup lang="ts">
import Color from "color";
import getColorPair from "random-color-pair";

definePageMeta({ middleware: "auth" });

const session = useState<{ user: User }>("session");
const modal = useState<Modal>("modal");

const accentColor = Color(session.value.user.accent_color).rgb().alpha(0.5);

const cleanupModal = () => {
  modal.value.isOpen = false;

  setTimeout(() => {
    modal.value.type = undefined;
    modal.value.payload = {};
  }, 1000);
};

const navigateBack = (event: Event) => {
  if ((event.target as HTMLElement).id === "clickable-area") {
    navigateTo("/");
  }
};

// Use this to create a gradient for the background if the accent_color doesn't exist
const alternateBackgroundGradient = ref<Array<Color>>([]);

if (!("accent_color" in session.value.user)) {
  const [foreground, background]: string = getColorPair();
  const firstBackgroundColor = new Color(foreground).alpha(0.5);
  const secondBackgroundColor = new Color(background).alpha(0.5);
  alternateBackgroundGradient.value.push(
    firstBackgroundColor,
    secondBackgroundColor
  );
}
</script>

<template>
  <Head>
    <Title>Account</Title>
  </Head>
  <main
    class="min-h-screen bg-no-repeat grid place-items-center overflow-y-hidden cursor-pointer"
    :style="
      alternateBackgroundGradient.length === 0
        ? `background-image: linear-gradient(to bottom right, ${accentColor}, #ba83e2)`
        : `background-image: linear-gradient(to bottom right, ${alternateBackgroundGradient[0]}, ${alternateBackgroundGradient[1]})`
    "
    @click="navigateBack"
    id="clickable-area"
  >
    <AccountContent
      class="mx-auto flex flex-col items-center justify-center my-36 rounded-2xl gap-x-10 2xl:w-1/4 w-1/2 backdrop-blur-lg bg-white/60 py-36 z-10 cursor-default select-none"
    />
  </main>
  <ModalWrapper @close-modal="cleanupModal" />
</template>
