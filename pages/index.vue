<script setup lang="ts">
import getColorPair from "random-color-pair";
import Color from "color";

const [foreground, background]: string = getColorPair();
const firstBackgroundColor = new Color(foreground).alpha(0.5);
const secondBackgroundColor = new Color(background).alpha(0.5);
</script>

<template>
  <Head>
    <Title>Home</Title>
  </Head>
  <main
    class="min-h-screen grid place-items-center"
    :style="`background-image: linear-gradient(to bottom right, ${firstBackgroundColor} , ${secondBackgroundColor})`"
  >
    <HomeContent
      class="w-[90%] mx-auto md:min-h-[90vh] flex flex-col justify-center items-center my-36 md:my-0"
    />
  </main>
</template>
