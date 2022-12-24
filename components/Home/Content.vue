<template>
  <main aria-label="Main Content">
    <h1
      class="font-serif 2xl:text-6xl text-4xl uppercase text-black/70 text-center"
    >
      Lookup an account
    </h1>
    <h2 class="text-2xl my-3">using the Discord API</h2>

    <!-- Split section -->
    <div
      class="flex 2xl:my-10 md:flex-row flex-col my-5 items-center justify-center 2xl:w-1/2 w-full gap-x-10 gap-y-10"
    >
      <!-- Use a snowflake ❄️ -->
      <HomeSplitSectionsLookupSnowflake
        class="md:w-1/2 py-10 bg-white/40 2xl:py-36 rounded-2xl w-full"
      />

      <!-- Use my account -->
      <HomeSplitSectionsAccount
        class="md:w-1/2 bg-white/40 2xl:py-44 py-[4.5rem] rounded-2xl flex flex-col items-center w-full"
      />
    </div>
  </main>
</template>
