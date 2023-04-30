<script setup lang="ts">
import type { Modal } from "~/project";

defineProps<{ content: "guide" }>();

const modal = useState<Modal>("modal");

const closeModal = () => {
  modal.value.isOpen = false;
  useHead({ title: "Account" });
};
</script>

<template>
  <HeadlessTransitionRoot appear :show="modal.isOpen" as="template">
    <HeadlessDialog as="div" @close="closeModal" class="relative z-10">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex items-center justify-center p-4 text-center overflow-y-scroll min-h-screen"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="max-w-2xl transform overflow-hidden rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-lg p-6 text-left align-middle shadow-xl transition-all"
            >
              <ContentDoc :path="`/${content}`" id="guide" />
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style lang="scss">
div#guide {
  @apply flex flex-col gap-y-5;

  @for $heading-number from 1 through 6 {
    & h#{$heading-number} {
      @apply font-serif dark:text-white;
    }
  }
  & h1 {
    @apply text-3xl 2xl:text-4xl;
  }
  & h2 {
    @apply text-2xl 2xl:text-3xl;
  }
  & ol > li {
    @apply dark:text-white list-decimal;
    a {
      @apply underline underline-offset-4 dark:text-white;
    }
  }
  & p {
    @apply dark:text-white;
  }
  & img {
    @apply rounded-2xl mx-auto;
  }
}
</style>
