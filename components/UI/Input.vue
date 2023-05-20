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
    class="appearance-none border-0 border-b border-blurple bg-transparent p-3 caret-blurple transition-[border] focus:rounded-lg focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-blurple/50 dark:border-b-2 dark:text-white dark:caret-white dark:placeholder:text-white"
    :class="{ 'border-b-2': dirtyInput.length > 0 }"
    :id="labelId"
    :type="type"
    v-model="dirtyInput"
  />
</template>
