<script setup lang="ts">
import getColorPair from "random-color-pair";
import Color from "color";

const [foreground, background]: string = getColorPair();
const firstBackgroundColor = new Color(foreground).alpha(0.5);
const secondBackgroundColor = new Color(background).alpha(0.5);

const dimmedBackgroundBarColor = new Color(background).alpha(0.5);

const profileRequest = useState<LookupRequest>("profileRequest", () => ({
  loading: false,
}));

const reset = () => {
  if (profileRequest.value.data) profileRequest.value.data = undefined;
  if (profileRequest.value.error) profileRequest.value.error = undefined;
};
</script>

<template>
  <Head>
    <Title>Home</Title>
  </Head>
  <main
    class="min-h-screen grid place-items-center"
    :style="`background-image: linear-gradient(to bottom right, ${firstBackgroundColor} , ${secondBackgroundColor})`"
    @click="reset"
  >
    <div
      class="h-2 w-full animate-pulse absolute top-0 transition"
      :class="profileRequest.loading ? '' : 'hidden'"
      :style="`background-image: linear-gradient(to right, ${foreground}, ${dimmedBackgroundBarColor})`"
    ></div>

    <HomeResults
      v-if="
        (('data' in profileRequest && profileRequest.data) ||
          ('error' in profileRequest && profileRequest.error)) &&
        !profileRequest.loading
      "
      :payload="
        'data' in profileRequest
          ? JSON.stringify(profileRequest.data)
          : typeof profileRequest.error === 'string'
          ? profileRequest.error
          : JSON.stringify(profileRequest.error)
      "
      class="mx-auto flex flex-col items-center justify-center md:my-36 my-1 rounded-2xl 2xl:w-1/4 md:w-1/2 w-[90%] backdrop-blur-lg bg-white/60 py-36 z-10 cursor-default select-none"
    />
    <HomeContent
      class="w-[90%] mx-auto md:min-h-[90vh] flex flex-col justify-center items-center my-36 md:my-0"
      v-else
    />
  </main>
</template>
