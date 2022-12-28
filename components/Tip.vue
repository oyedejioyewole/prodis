<script lang="ts" setup>
const modal = useState<Modal>("modal");
const openModal = () => {
  useModalValue("information:navigation", {});
  modal.value.isOpen = true;
};
</script>

<template>
  <svg @click="openModal">
    <use xlink:href="~/assets/bootstrap-icons.svg#info-circle" />
  </svg>
</template>
