<script setup lang="ts">
const { payload } = defineProps<{ payload: string }>();

const response = ref<FilteredResponse | string | LookupError>();

try {
  response.value = JSON.parse(payload);
} catch (error) {
  response.value = payload;
}

const memberOfWhichHypesquadHouse = ref<HypeSquadHouses>();
const title = ref<"Profile" | "Error">();

if (typeof response.value === "object" && "username" in response.value) {
  title.value = "Profile";
  const hypesquadBadge = useProfileBadge(response.value.public_flags);
  if (hypesquadBadge) {
    memberOfWhichHypesquadHouse.value = hypesquadBadge.name as HypeSquadHouses;
  } else memberOfWhichHypesquadHouse.value = "not-a-member";
}
if (
  (typeof response.value === "object" && "statusCode" in response.value) ||
  typeof response.value === "string"
)
  title.value = "Error";

useHead({
  title: title.value,
});
</script>

<template>
  <main v-if="typeof response === 'object' && 'username' in response">
    <!-- Info icon -->
    <Tip
      class="w-8 h-8 absolute right-8 top-8 fill-black/70 cursor-pointer hover:fill-black/50 transition"
    />

    <!-- Profile avatar -->
    <img
      :src="response.image"
      :alt="`${response.username}'s avatar`"
      class="rounded-2xl w-36 h-36"
    />

    <!-- Profile username and discriminator -->
    <h1 class="text-2xl my-5 text-center text-black/70">
      {{ response.username }}#<span class="font-serif">{{
        response.discriminator
      }}</span>
    </h1>

    <div
      v-if="memberOfWhichHypesquadHouse !== 'not-a-member'"
      class="flex items-center gap-x-3"
    >
      <h2 class="p-3 bg-white/60 text-2xl rounded-2xl text-black/70">Badges</h2>
      <!-- Hypesquad Badge -->
      <NuxtIcon
        name="houses/bravery"
        class="text-6xl text-black/70"
        v-if="memberOfWhichHypesquadHouse === 'hypesquad-house-bravery'"
      />
      <NuxtIcon
        name="houses/brilliance"
        class="text-6xl text-black/70"
        v-else-if="memberOfWhichHypesquadHouse === 'hypesquad-house-brilliance'"
      />
      <NuxtIcon
        name="houses/balance"
        class="text-6xl text-black/70 h-[50px] w-[50px]"
        v-else-if="memberOfWhichHypesquadHouse === 'hypesquad-house-balance'"
      />
    </div>
  </main>
  <main v-else-if="typeof response === 'object' && 'statusCode' in response">
    <Tip
      class="w-8 h-8 absolute right-8 top-8 fill-black/70 cursor-pointer hover:fill-black/50 transition"
    />
    <!-- Oops, an error occured -->
    <NuxtIcon name="error" class="text-9xl text-black/70" />
    <h1 class="text-xl text-black/70">{{ response.statusMessage }}</h1>
  </main>
  <main v-else-if="typeof response === 'string'">
    <Tip
      class="w-8 h-8 absolute right-8 top-8 fill-black/70 cursor-pointer hover:fill-black/50 transition"
    />
    <NuxtIcon name="error" class="text-9xl text-black/70" />
    <h1 class="text-xl text-black/70">{{ response }}</h1>
  </main>
</template>
