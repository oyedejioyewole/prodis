<script setup lang="ts">
import type { RequestMetadata, ValidationConfirmed } from "~/project";

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

  const { data: jwtToken, error: jwtSigningError } = await useCsrfFetch(
    "/api/sign",
    {
      method: "POST",
      body: {
        payload: {
          token,
        },
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
      console.log(data.value);
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
};
</script>

<template>
  <form
    @submit.prevent="getAccountRelationships(formData.data ?? '')"
    class="flex flex-col gap-y-4"
  >
    <div class="flex items-center">
      <UIIcon name="tags-fill" type="large" class="text-blurple" />
      <UIInput
        type="text"
        class="w-full"
        placeholder="Active Discord token"
        @validation-confirmed="handleValidationResults"
      />
    </div>
    <UIButton type="normal" :disabled="!formData.isAllowed"
      >Let's Go 🎉</UIButton
    >
  </form>
</template>