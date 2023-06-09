<script setup lang="ts">
defineProps<{ content: "faq" }>();

const modal = useState<Modal>("modal");
const isImageLoading = ref(true);

const closeModal = () => {
  if (!isImageLoading.value) isImageLoading.value = true;
  useHead({ title: "Account" });
  useModal(false);
};

const postLazyLoad = () => (isImageLoading.value = false);
</script>

<template>
  <dialog id="faq-dialog" class="min-w-[50%]">
    <button
      class="float-right text-3xl hover:cursor-pointer"
      @click="closeModal"
      type="button"
    >
      <span class="sr-only">Close this dialog</span>
      <LazyUIIcon name="x" />
    </button>

    <template v-if="modal.isOpen">
      <template v-if="modal.payload">
        <div v-if="'avatar' in modal.payload" class="flex items-center gap-x-4">
          <LazyNuxtImg
            :src="modal.payload.avatar"
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
              {{ modal.payload.username }}#{{ modal.payload.discriminator }}
            </h1>
            <h2 class="flex items-center gap-x-1" v-if="modal.payload.nickname">
              <span class="rounded-md bg-[#8084ff] px-2 py-1"> aka </span>
              {{ modal.payload.nickname }}
            </h2>
            <h2 class="inline-flex items-center gap-x-1">
              <b class="font-serif text-lg dark:text-white">Badges:</b>
              <LazyUIExtrasBadges
                :badges="modal.payload.badges"
                :bot="modal.payload.bot"
                v-if="Array.isArray(modal.payload.badges)"
                class="w-fit"
              />
              <h3 v-else class="text-lg dark:text-white">None 🤪</h3>
            </h2>
            <h2>
              Been friends since
              <span class="rounded-md bg-[#8084ff] px-2 py-1">{{
                useDate(modal.payload.since)
              }}</span>
            </h2>
            <h2>
              Been a member since
              <span class="rounded-md bg-[#8084ff] px-2 py-1">{{
                modal.payload.createdOn
              }}</span>
            </h2>

            <LazyUIButton
              type="normal"
              class="flex w-fit items-center gap-x-2 bg-black/50 px-3 py-2"
              @click="
                useDownload(modal.payload.download, modal.payload.download.user)
              "
            >
              <LazyUIIcon type="normal" name="save" class="text-white" /> Save
            </LazyUIButton>
          </div>
        </div>
        <div
          v-else-if="'owner' in modal.payload"
          class="flex w-full items-center justify-around gap-x-10"
        >
          <LazyNuxtImg
            :src="modal.payload.icon"
            quality="100"
            loading="lazy"
            :alt="`${modal.payload.name}'s icon`"
            class="aspect-square h-fit rounded-2xl object-cover"
            :class="{
              'w-[128px] animate-pulse bg-gray-300': isImageLoading,
              'w-fit': !isImageLoading,
            }"
            id="guild-icon"
            ref="image"
            :title="`${modal.payload.name} icon`"
            @load="postLazyLoad"
            v-if="modal.payload.icon"
          />

          <div class="flex w-1/2 flex-col justify-center gap-y-2">
            <div class="max-w-2xl">
              <h1 class="w-fit font-serif text-2xl">
                {{ modal.payload.name }}
              </h1>
              <hr
                class="rounded-full border-[1.5px] border-black"
                :style="`width: ${
                  (modal.payload.name.length * 25) / 100 + 15
                }%`"
              />
            </div>

            <ul class="space-y-5 text-lg">
              <!-- Owner status -->
              <li>
                <span class="inline-flex items-center gap-x-2">
                  <LazyUIIcon name="guild-owner" :custom="true" />
                  <h2><b>Ownership</b></h2>
                </span>
                <h2>
                  You {{ modal.payload.owner ? "own" : "do not own" }} this
                  server
                </h2>
              </li>

              <!-- Guild Features -->
              <li class="space-y-2">
                <span class="inline-flex items-center gap-x-3">
                  <LazyUIIcon name="gem" type="normal" />
                  <h2>
                    <b>Features</b>
                  </h2>
                </span>

                <LazyUIExtrasGuildsFeatures
                  v-if="Array.isArray(modal.payload.features)"
                  :features="modal.payload.features"
                />
                <p v-else>{{ modal.payload.features }}</p>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <LazyContentDoc :path="`/${content}`" id="contents" v-else />
    </template>
  </dialog>
</template>

<style lang="scss">
dialog {
  @apply max-w-2xl rounded-lg p-10;

  div#contents {
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
}
</style>
