<script setup lang="ts">
const { payload } = defineProps<{ payload: string }>();

const response = ref<FilteredResponse | string | LookupError>();
try {
  response.value = JSON.parse(payload);
} catch (error) {
  response.value = payload;
}

const memberOfWhichHypesquadHouse = ref<HypeSquadHouses | "not-a-member">();
if ("username" in response.value) {
  const hypesquadBadge = useProfileBadge(response.value.public_flags);
  if (hypesquadBadge)
    memberOfWhichHypesquadHouse.value = hypesquadBadge.name as HypeSquadHouses;
  else memberOfWhichHypesquadHouse.value = "not-a-member";
}

console.log(response.value);
</script>

<template>
  <main v-if="'username' in response">
    <img
      :src="response.image"
      :alt="`${response.username}'s avatar`"
      class="rounded-2xl w-36 h-36"
    />
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
  <main v-else-if="'statusCode' in response">
    <NuxtIcon name="error" class="text-9xl" />
    <h1 class="text-xl">{{ response.statusMessage }}</h1>
  </main>
</template>
