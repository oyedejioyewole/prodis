<script setup lang="ts">
import * as secure from "securejs";

const profileRequest = useState<LookupRequest>("profileRequest");

const discordSnowflakeRegex = /^([0-9]{17,19})$/;
const discordSnowflake = ref<string>();
const discordSnowflakeEncrypted = ref<string>();

const validationError = ref<{
  hasOccured: boolean;
  message?: string;
}>({ hasOccured: false, message: undefined });

const validateDiscordSnowflake = (value: string): boolean | string =>
  discordSnowflakeRegex.test(value)
    ? true
    : "Please enter a valid Discord snowflake";

const encryptSnowflake = (snowflake: string) => {
  const {
    public: {
      project: { secret },
    },
  } = useRuntimeConfig();
  discordSnowflakeEncrypted.value = secure.encrypt(snowflake, secret);
};

const lookupDiscordAccount = async () => {
  profileRequest.value = { loading: true };

  const { data, error } = await useFetch("/api/lookup", {
    method: "POST",
    body: {
      hashedSnowflake: discordSnowflakeEncrypted.value,
    },
  });

  if (error.value) {
    if (error.value?.response) {
      profileRequest.value = {
        error: error.value.response._data,
        loading: false,
      };
    } else if (!error.value?.response) {
      profileRequest.value = {
        error: "Oops, couldn't peform request",
        loading: false,
      };
    }
    return;
  }

  profileRequest.value = {
    data: data.value as FilteredResponse,
    loading: false,
  };
};

watch(discordSnowflake, (value) => {
  if (value && value.length > 0) {
    const discordSnowflakeValidation = validateDiscordSnowflake(value);

    if (discordSnowflakeValidation === true) {
      if (validationError.value.hasOccured) {
        validationError.value = {
          hasOccured: false,
        };
      }
      encryptSnowflake(discordSnowflake.value as string);
    } else {
      validationError.value = {
        hasOccured: true,
        message: discordSnowflakeValidation as string,
      };
    }
  } else {
    validationError.value = {
      hasOccured: false,
    };
  }
});
</script>

<template>
  <section>
    <!-- Frosty search icon -->
    <NuxtIcon
      name="snowflake-search"
      class="2xl:text-9xl text-8xl text-black/70"
      id="snowflake-search-icon"
    />

    <!-- Discord usertag form -->
    <form
      class="flex flex-col items-center"
      @submit.prevent="lookupDiscordAccount"
    >
      <input
        id="snowflake"
        type="text"
        class="form-input focus:ring focus:ring-offset-2 outline:none focus:ring-black/50 w-3/4 my-5 p-5 rounded-2xl bg-white/50 border-none transition-all text-center overflow-x-hidden"
        placeholder="Hint: a set of 17-19 numbers"
        required
        v-model="discordSnowflake"
      />
      <p class="text-red-600 mb-4" v-if="validationError.hasOccured">
        {{ validationError.message }}
      </p>
      <button
        type="submit"
        class="p-5 bg-black/50 rounded-tl-2xl rounded-br-2xl focus:ring focus:ring-offset-2 outline-none focus:ring-black transition disabled:cursor-not-allowed disabled:opacity-70 text-white border-2 border-black/10 flex gap-2 items-center group"
        :class="
          !validationError.hasOccured && discordSnowflake
            ? 'hover:bg-transparent  hover:text-black hover:border-black/50'
            : ''
        "
        :disabled="
          discordSnowflake?.length === 0 ||
          !discordSnowflake ||
          validationError.hasOccured
        "
      >
        Use a snowflake
        <svg
          class="w-8 h-8 fill-white transition"
          :class="
            !validationError.hasOccured &&
            discordSnowflake &&
            discordSnowflake?.length > 0
              ? 'group-hover:fill-black'
              : ''
          "
          role="img"
          aria-label="Snowflake"
        >
          <use xlink:href="~/assets/bootstrap-icons.svg#snow2" />
        </svg>
      </button>
    </form>
  </section>
</template>

<style>
#snowflake-search-icon svg {
  margin: 0 auto;
}
</style>
