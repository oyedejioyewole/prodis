<script setup lang="ts">
import type { RequestMetadata, ValidationConfirmed } from "~/project";

const formData = ref<ValidationConfirmed>({ isAllowed: false });

const emit = defineEmits<{
  (event: "clearErrors"): void;
}>();

const handleValidationResults = (payload: ValidationConfirmed) =>
  (formData.value = { isAllowed: payload.isAllowed, data: payload.data ?? "" });

const searchForAccount = async (snowflake: string) => {
  emit("clearErrors");

  const requestMetadata = useState<RequestMetadata>("metadata");

  requestMetadata.value.global = {
    pending: true,
  };

  const { data: jwtToken, error: jwtSigningError } = await useCsrfFetch(
    "/api/sign",
    {
      method: "POST",
      body: {
        payload: {
          snowflake,
        },
      },
      key: "jwt-token",
    }
  );

  if (jwtToken.value) {
    const { data, error } = await useFetch("/api/lookup", {
      headers: {
        "x-token": jwtToken.value,
      },
      key: "discord-account-lookup",
    });

    if (data.value) {
      requestMetadata.value.global = {
        pending: false,
        response: data.value,
      };
    } else if (error.value) {
      requestMetadata.value.global = {
        pending: false,
        response: undefined,
      };
      throw createError(error.value.message);
    }
  }

  if (jwtSigningError.value) {
    requestMetadata.value.global = {
      pending: false,
      response: undefined,
    };
    throw createError(jwtSigningError.value.message);
  }
};
</script>

<template>
  <section>
    <h1 class="font-serif text-4xl text-center dark:text-white">
      Enter the snowflake (ID)
    </h1>
    <form
      class="flex flex-col items-center gap-y-5"
      @submit.prevent="searchForAccount(formData.data ?? '')"
    >
      <label for="snowflake-form" class="text-xl dark:text-white"
        ><span class="font-bold">Hint:</span> a set of 17-19 numbers</label
      >
      <div class="flex gap-x-4">
        <div class="flex items-center gap-x-2">
          <UIIcon name="snow" class="text-blurple" type="large" />
          <UIInput
            type="text"
            placeholder="Snowflake ID"
            @validation-confirmed="handleValidationResults"
          />
        </div>
        <UIButton type="normal" :disabled="!formData.isAllowed"
          >Let's Go 🎉</UIButton
        >
      </div>
    </form>
  </section>
</template>
