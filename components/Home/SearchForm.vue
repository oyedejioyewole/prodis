<script setup lang="ts">
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

  const { data, error: publicKeyRequestError } = await useFetch(
    "/api/public-key",
    { key: "session-public-key" }
  );

  if (data.value?.publicKey) {
    const { importSPKI, CompactEncrypt } = await import("jose");

    const key = await importSPKI(data.value.publicKey, "RSA-OAEP-256");
    const jwe = await new CompactEncrypt(
      new TextEncoder().encode(JSON.stringify({ snowflake }))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(key);

    const { data: jwtToken, error: jwtSigningError } = await useFetch(
      "/api/sign",
      {
        method: "POST",
        body: {
          payload: jwe,
        },
        key: "jwt-token",
        headers: {
          "x-csrf-token": "1",
        },
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
    } else if (jwtSigningError.value) {
      requestMetadata.value.global = {
        pending: false,
        response: undefined,
      };
      throw createError(jwtSigningError.value.message);
    }
    return;
  } else if (publicKeyRequestError.value) {
    requestMetadata.value.global = {
      pending: false,
      response: undefined,
    };
    throw createError(publicKeyRequestError.value.message);
  }
};
</script>

<template>
  <div>
    <h1 class="text-center font-serif text-3xl dark:text-white md:text-4xl">
      Enter the snowflake (ID)
    </h1>
    <form
      class="flex flex-col items-center gap-y-5"
      @submit.prevent="searchForAccount(formData.data ?? '')"
    >
      <label for="snowflake-form" class="text-center text-xl dark:text-white"
        ><span class="font-bold">Hint:</span> a set of 17-19 numbers</label
      >
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="flex items-center gap-x-2">
          <UIIcon name="snow" type="large" class="text-blurple" />
          <UIInput
            type="text"
            placeholder="Snowflake ID"
            @validation-confirmed="handleValidationResults"
            label-id="snowflake-form"
          />
        </div>
        <UIButton type="normal" :disabled="!formData.isAllowed" action="submit"
          >Let's Go 🎉</UIButton
        >
      </div>
    </form>
  </div>
</template>
