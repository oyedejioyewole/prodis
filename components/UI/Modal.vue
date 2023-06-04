<script setup lang="ts">
defineProps<{ content: "faq" }>();

const modal = useState<Modal>("modal");

const closeModal = () => {
  useModal(false);
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
          class="flex min-h-screen items-center justify-center overflow-y-scroll p-4 text-center"
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
              class="max-w-2xl transform overflow-hidden rounded-2xl bg-white/50 p-6 text-left align-middle shadow-xl backdrop-blur-lg transition-all dark:bg-white/10"
            >
              <div v-if="modal.payload">
                <div
                  v-if="'avatarURL' in modal.payload"
                  class="flex items-center gap-x-4"
                >
                  <NuxtImg
                    :src="modal.payload.avatarURL"
                    quality="100"
                    loading="lazy"
                    alt="Profile picture"
                    class="rounded-2xl"
                    width="100%"
                    height="100%"
                    :title="`${modal.payload.username}'s profile picture`"
                  />
                  <div class="flex flex-col gap-y-2">
                    <h1 class="text-2xl">
                      {{ modal.payload.username }}#{{
                        modal.payload.discriminator
                      }}
                    </h1>
                    <h2
                      class="flex items-center gap-x-1"
                      v-if="modal.payload.nickname"
                    >
                      <span class="rounded-md bg-[#8084ff] px-2 py-1">
                        aka
                      </span>
                      {{ modal.payload.nickname }}
                    </h2>
                    <UIBadges
                      :badges="modal.payload.badges"
                      :bot="modal.payload.bot"
                    />
                    <h2>
                      Been friends since
                      <span class="rounded-md bg-[#8084ff] px-2 py-1">{{
                        useDate(modal.payload.since)
                      }}</span>
                    </h2>
                    <h2>
                      Been a member since
                      <span class="rounded-md bg-[#8084ff] px-2 py-1">{{
                        modal.payload.createdAt
                      }}</span>
                    </h2>

                    <UIButton
                      type="normal"
                      class="flex w-fit items-center gap-x-2 bg-black/50 px-3 py-2"
                      @click="
                        useDownload(
                          modal.payload.download,
                          modal.payload.download.user
                        )
                      "
                    >
                      <UIIcon type="normal" name="save" color="white" /> Save
                    </UIButton>
                  </div>
                </div>
                <div v-else-if="'owner' in modal.payload">
                  <NuxtImg
                    :src="modal.payload.icon"
                    quality="100"
                    loading="lazy"
                    alt="Guild icon"
                    class="rounded-2xl"
                    width="100%"
                    height="100%"
                    :title="`${modal.payload.name} icon`"
                  />
                </div>
              </div>
              <ContentDoc :path="`/${content}`" id="faq" v-else />
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style lang="scss" scoped>
div:deep(#faq) {
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
    @apply list-decimal dark:text-white;
    a {
      @apply underline underline-offset-4 dark:text-white;
    }
  }
  & p {
    @apply dark:text-white;
  }
}
</style>
