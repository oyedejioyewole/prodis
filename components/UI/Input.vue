<script setup lang="ts">
const emit = defineEmits<{
  (event: "validationConfirmed", payload: ValidationConfirmed): void;
}>();
defineProps<{ type: "text"; labelId: string }>();

const dirtyInput = ref("");
const { name } = useRoute();

watch(dirtyInput, (_new) => {
  emit("validationConfirmed", { isAllowed: false });

  if (_new)
    if (name === "index" && /^([0-9]{17,19})$/.test(_new))
      emit("validationConfirmed", {
        isAllowed: true,
        data: _new,
      });
    else if (name === "account" && _new.length > 0)
      emit("validationConfirmed", { isAllowed: true, data: _new });
});
</script>

<template>
  <input
    autocomplete="off"
    class="p-3 border-0 border-b dark:border-b-2 border-blurple caret-blurple bg-transparent dark:caret-white appearance-none dark:placeholder:text-white dark:text-white transition-[border] focus-visible:outline-blurple/50 focus:outline-none focus:rounded-lg focus-visible:outline-offset-4"
    :class="{ 'border-b-2': dirtyInput.length > 0 }"
    :id="labelId"
    :type="type"
    v-model="dirtyInput"
  />
</template>
