<script setup lang="ts">
const session = useState<{ user: User }>("session");

const modal = useState<Modal>("modal");

const openModal = (event: Event) => {
  const target = event.target as HTMLImageElement | HTMLDivElement;
  useModalValue("guild", { guildName: target.dataset.name as string });

  if (!modal.value.payload) return;
  modal.value.isOpen = true;
};
</script>

<template>
  <div>
    <div v-for="{ name, icon } in session.user.guilds" :key="name">
      <img
        :src="icon"
        :alt="`${name} guild icon`"
        v-if="icon"
        class="rounded-full w-10 cursor-pointer"
        @click="openModal"
        :data-name="name"
      />
      <div
        class="p-3 bg-black/70 text-white rounded-full cursor-pointer"
        v-else-if="!icon"
        @click="openModal"
        :data-name="name"
      >
        {{ useGeneratePlaceholder(name).toUpperCase() }}
      </div>
    </div>
  </div>
</template>
