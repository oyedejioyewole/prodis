<script setup lang="ts">
const modal = useState<Modal>("modal");

const houseIdentifier = (house?: HypeSquadHouses | string) => {
  if (!house) return null;
  const _house =
    house === "hypesquad-house-balance"
      ? "house-balance"
      : house === "hypesquad-house-bravery"
      ? "house-bravery"
      : "house-brilliance";
  return _house
    .split("-")
    .map((word, index) => {
      const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

      return index > 0 ? capitalizedWord : `${capitalizedWord} of`;
    })
    .join(" ");
};

const nitroStatus = (premiumSubscription: PremiumTypes) =>
  premiumSubscription === "basic"
    ? "Discord (Normal)"
    : premiumSubscription === "nitro"
    ? "Discord (Nitro Premium)"
    : premiumSubscription === "nitro-basic"
    ? "Discord (Nitro 1st tier)"
    : "Discord (Nitro 2ns tier)";

const house = ref<HypeSquadHouses | string | null>("");
const localeSet = ref<string[]>([]);

if ("locale" in modal.value.payload && modal.value.payload.locale) {
  for (let index = 0; index < 2; index++) {
    if (index > 0) {
      localeSet.value.push(
        await useLocale("convert", modal.value.payload.locale)
      );
    } else {
      localeSet.value.push(await useLocale("flag", modal.value.payload.locale));
    }
  }
}

if ("hypesquadHouse" in modal.value.payload) {
  house.value = houseIdentifier(modal.value.payload.hypesquadHouse);
}
</script>

<template>
  <main v-if="'name' in modal.payload && modal.type === 'guild'">
    <img
      :src="modal.payload.icon"
      :alt="`${modal.payload.name}'s icon`"
      v-if="modal.payload.icon"
      class="rounded-full w-fit mx-auto"
    />
    <div
      class="p-10 bg-black/70 text-white rounded-full w-fit text-2xl mx-auto"
      v-else
    >
      {{ useGeneratePlaceholder(modal.payload.name).toUpperCase() }}
    </div>

    <h1 class="text-2xl text-black/70 text-center">
      {{ modal.payload.name }}
    </h1>
    <h2 class="text-lg text-black/70 text-center">
      {{ modal.payload.username }}
      {{ modal.payload.owner ? "owns" : "doesn't own" }}
      {{ modal.payload.name }}
    </h2>
  </main>
  <main v-else-if="'premiumType' in modal.payload && modal.type === 'account'">
    <div class="flex items-center gap-x-5">
      <NuxtIcon
        name="houses/bravery"
        class="text-5xl text-black/70"
        id="hypesquad-icon"
        v-if="modal.payload.hypesquadHouse === 'hypesquad-house-bravery'"
      />
      <NuxtIcon
        name="houses/balance"
        class="text-6xl text-black/70 h-[50px]"
        id="hypesquad-icon"
        v-else-if="modal.payload.hypesquadHouse === 'hypesquad-house-balance'"
      /><NuxtIcon
        name="houses/brilliance"
        class="text-5xl text-black/70"
        id="hypesquad-icon"
        v-else-if="
          modal.payload.hypesquadHouse === 'hypesquad-house-brilliance'
        "
      />
      <h1 class="text-2xl text-black/70" v-if="house">
        {{ house }}
      </h1>
    </div>
    <div class="flex items-center gap-x-5">
      <NuxtIcon
        name="nitro"
        class="text-6xl text-black/70"
        v-if="modal.payload.premiumType === 'nitro'"
      />
      <NuxtIcon
        name="nitro-basic"
        class="text-6xl text-black/70"
        v-else-if="modal.payload.premiumType === 'nitro-basic'"
      />
      <NuxtIcon
        name="nitro-classic"
        class="text-6xl text-black/70"
        v-else-if="modal.payload.premiumType === 'nitro-classic'"
      />
      <svg class="2xl:w-12 2xl:h-12 w-8 h-8 text-black/70 m-3" v-else>
        <use xlink:href="~/assets/bootstrap-icons.svg#droplet" />
      </svg>

      <h1 class="text-2xl text-black/70">
        {{ nitroStatus(modal.payload.premiumType) }}
      </h1>
    </div>
    <div class="flex items-center gap-x-5 text-2xl">
      <h2 class="text-5xl">{{ localeSet[0] }}</h2>
      <h3 class="text-black/70">{{ localeSet[1] }}</h3>
    </div>
  </main>
  <main
    v-else-if="'accountVerified' in modal.payload && modal.type === 'security'"
  >
    <div class="flex items-center gap-x-3">
      <svg class="2xl:w-16 2xl:h-16 w-8 h-8 fill-black/70">
        <use
          xlink:href="~/assets/bootstrap-icons.svg#patch-check"
          v-if="modal.payload.accountVerified"
        />
        <use
          xlink:href="~/assets/bootstrap-icons.svg#patch-exclamation"
          v-else
        />
      </svg>
      <h1 class="text-lg text-black/70">This account's email is verified</h1>
    </div>
    <div class="flex items-center gap-x-3">
      <!-- Multi-factor authentication status -->
      <NuxtIcon
        name="2fa-enabled"
        class="2xl:text-8xl text-5xl text-black/70"
        v-if="modal.payload.multiFactorAuthenitcationEnabled"
      />
      <NuxtIcon
        name="2fa-disabled"
        class="2xl:text-8xl text-5xl text-black/70"
        v-else
      />
      <h2 class="text-lg text-black/70">This account has enabled 2FA</h2>
    </div>
  </main>
  <main v-else-if="modal.type === 'information:navigation'">
    <NuxtIcon name="egg" class="text-9xl text-black/70" />
    <h1 class="text-2xl">You've discover an egg!</h1>
    <p>Click on the background to go back to the homepage</p>
  </main>
</template>

<style>
#hypesquad-icon svg {
  margin: 0 auto;
}
</style>
