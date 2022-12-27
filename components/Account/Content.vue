<script setup lang="ts">
const session = useState<{ user: User }>("session");
const modal = useState<Modal>("modal");

const getNitroStatus = (sessionPremiumType: number) =>
  sessionPremiumType === 0
    ? "basic"
    : sessionPremiumType === 1
    ? "nitro-classic"
    : sessionPremiumType === 2
    ? "nitro"
    : "nitro-basic";

const userFlag = useProfileBadge(session.value.user.flags);
const nitroStatus = getNitroStatus(session.value.user.premium_type);
const _locale = await useLocale("flag", session.value.user.locale);

const openModal = (type: ModalTypes) => {
  // Check the type of modal and pass the needed payload to it
  if (type === "security") {
    useModalValue("security", {
      accountVerified: session.value.user.verified,
      multiFactorAuthenitcationEnabled: session.value.user.mfa_enabled,
    });
  } else if (userFlag && type === "account") {
    useModalValue("account", {
      premiumType: nitroStatus,
      locale: session.value.user.locale,
      hypesquadHouse: userFlag.name,
    });
  } else if (!userFlag) {
    useModalValue("account", {
      premiumType: nitroStatus,
      locale: session.value.user.locale,
    });
  } else if (type === "information:navigation") {
    useModalValue("information:navigation", {});
  }

  if (!modal.value.payload) return;
  modal.value.isOpen = true;
};
</script>

<template>
  <main aria-label="Main Content">
    <!-- Info icon -->
    <svg
      class="w-8 h-8 absolute right-10 top-10 fill-black/70 cursor-pointer hover:fill-black/50 transition"
      @click="openModal('information:navigation')"
    >
      <use xlink:href="~/assets/bootstrap-icons.svg#info-circle" />
    </svg>
    <!-- Profile picture -->
    <!-- or use the default avatar if there is no picture -->
    <img
      :src="session.user.image_url"
      alt="Your avatar on Discord"
      class="rounded-2xl"
    />

    <!-- Username and discriminator -->
    <h1 class="2xl:text-4xl text-2xl 2xl:my-4 my-2 text-black/70">
      {{ session.user.username
      }}<span class="font-serif">#{{ session.user.discriminator }}</span>
    </h1>

    <!-- Account e-mail -->
    <h2 class="2xl:text-2xl text-lg mb-4 text-black/70">
      {{ session.user.email }}
    </h2>
    <div class="flex items-center gap-x-4">
      <!-- 1st section -->
      <div
        class="flex items-center gap-x-4 bg-white/60 justify-center px-3 py-2 rounded-2xl border border-white/20 hover:border-black/70 transition cursor-pointer"
        @click="openModal('security')"
      >
        <!-- Account verification status -->
        <svg class="2xl:w-12 2xl:h-12 w-8 h-8 fill-black/70">
          <use
            xlink:href="~/assets/bootstrap-icons.svg#patch-check"
            v-if="session.user.verified"
          />
          <use
            xlink:href="~/assets/bootstrap-icons.svg#patch-exclamation"
            v-else
          />
        </svg>

        <!-- Multi-factor authentication status -->
        <NuxtIcon
          name="2fa-enabled"
          class="2xl:text-7xl text-5xl text-black/70"
          v-if="session.user.mfa_enabled"
        />
        <NuxtIcon
          name="2fa-disabled"
          class="2xl:text-7xl text-5xl text-black/70"
          v-else
        />
      </div>

      <!-- 2nd section -->
      <div
        class="flex bg-white/60 2xl:py-3 py-2 px-1 pl-4 rounded-2xl items-center gap-x-1 border border-white/20 hover:border-black/70 transition cursor-pointer"
        @click="openModal('account')"
      >
        <!-- Your app locale -->
        <span class="2xl:text-6xl text-4xl">{{ _locale }}</span>

        <!-- Nitro status -->
        <NuxtIcon
          name="nitro-basic"
          class="2xl:text-6xl text-5xl text-black/70"
          v-if="getNitroStatus(session.user.premium_type) === 'nitro-basic'"
        />
        <NuxtIcon
          name="nitro-classic"
          class="2xl:text-6xl text-5xl text-black/70"
          v-if="getNitroStatus(session.user.premium_type) === 'nitro-classic'"
        />
        <NuxtIcon
          name="nitro"
          class="text-6xl text-black/70"
          v-if="getNitroStatus(session.user.premium_type) === 'nitro'"
        />
        <svg class="2xl:w-12 2xl:h-12 w-8 h-8 text-black/70 m-3" v-else>
          <use xlink:href="~/assets/bootstrap-icons.svg#droplet" />
        </svg>

        <NuxtIcon
          name="houses/bravery"
          class="text-6xl text-black/70 h-[50px]"
          v-if="userFlag && userFlag.name === 'hypesquad-house-bravery'"
        />
        <NuxtIcon
          name="houses/brilliance"
          class="text-6xl text-black/70 h-[50px]"
          v-else-if="userFlag && userFlag.name === 'hypesquad-house-brilliance'"
        />
        <NuxtIcon
          name="houses/balance"
          class="text-6xl text-black/70 h-[50px]"
          v-else-if="userFlag && userFlag.name === 'hypesquad-house-balance'"
        />
      </div>
    </div>

    <h3
      class="my-10 2xl:text-2xl text-lg bg-white/40 rounded-2xl px-3 py-4 text-black/70"
    >
      {{
        session.user.connections
          ? `${session.user.username}'s connected accounts`
          : "You don't have any connected accounts"
      }}
    </h3>
    <!-- Accounts connected to this profile -->
    <AccountConnections
      class="flex gap-x-4 items-center"
      v-if="session.user.connections && session.user.connections!.length > 0"
    />

    <h3
      class="my-10 2xl:text-2xl text-lg bg-white/40 rounded-2xl px-3 py-4 text-black/70"
    >
      {{
        session.user.guilds
          ? `${session.user.username} is in &approx; ${
              session.user.guilds!.length
            } guild${session.user.guilds!.length > 1 ? "s" : ""}`
          : "You aren't in any guilds"
      }}
    </h3>

    <!-- Joined guilds (if there is) -->
    <AccountGuilds
      class="flex items-center flex-wrap justify-center w-1/2 gap-4"
      v-if="session.user.guilds"
    />
  </main>
</template>
