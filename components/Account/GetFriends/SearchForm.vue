<script setup lang="ts">
const emit = defineEmits<{
  (event: "clearErrors"): void;
}>();

const formData = ref<ValidationConfirmed>({
  isAllowed: false,
});

const handleValidationResults = (payload: ValidationConfirmed) =>
  (formData.value = {
    isAllowed: payload.isAllowed,
    data: payload.data ?? "",
  });

const getAccountRelationships = async (token: string) => {
  emit("clearErrors");

  const { nanoid } = await import("nanoid");
  const requestMetadata = useState<RequestMetadata>("metadata");

  requestMetadata.value.friends = {
    pending: true,
  };

  const { data, error: publicKeyRequestError } = await useFetch(
    "/api/public-key",
    { key: "session-public-key" }
  );

  if (data.value?.publicKey) {
    const { importSPKI, CompactEncrypt } = await import("jose");

    const key = await importSPKI(data.value.publicKey, "RSA-OAEP");
    const jwe = await new CompactEncrypt(
      new TextEncoder().encode(JSON.stringify({ token }))
    )
      .setProtectedHeader({ alg: "RSA-OAEP", enc: "A256GCM" })
      .encrypt(key);

    const { data: jwtToken, error: jwtSigningError } = await useFetch(
      "/api/sign",
      {
        method: "POST",
        body: {
          payload: jwe,
        },
        key: "jwt-token",
      }
    );

    if (jwtToken.value) {
      const { data, error } = await useFetch("/api/friends", {
        headers: {
          "x-token": jwtToken.value,
        },
        key: nanoid(jwtToken.value.length),
      });

      if (data.value) {
        requestMetadata.value.friends = {
          pending: false,
          response: data.value,
        };
      } else if (error.value) {
        requestMetadata.value.friends = {
          pending: false,
          response: undefined,
        };
        throw createError(error.value.message);
      }
    } else if (jwtSigningError.value) {
      requestMetadata.value.friends = {
        pending: false,
        response: undefined,
      };
      throw createError(jwtSigningError.value.message);
    }
  } else if (publicKeyRequestError.value) {
    requestMetadata.value.friends = {
      pending: false,
      response: undefined,
    };
    throw createError(publicKeyRequestError.value.message);
  }
};
</script>

<template>
  <form
    @submit.prevent="getAccountRelationships(formData.data ?? '')"
    class="flex flex-col gap-y-4"
  >
    <label for="discord-token-form" class="sr-only">Active Discord token</label>
    <div class="flex items-center gap-x-2">
      <LazyUIIcon name="tags-fill" type="large" />
      <LazyUIInput
        type="text"
        class="w-full"
        placeholder="Active Discord token"
        @validation-confirmed="handleValidationResults"
        label-id="discord-token-form"
      />
    </div>
    <LazyUIButton type="normal" :disabled="!formData.isAllowed" action="submit"
      >Let's Go 🎉</LazyUIButton
    >
  </form>
</template>
