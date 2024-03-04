import type { variants } from '#tailwind-config';
<script setup>
const open = ref(false);
const model = defineModel({ default: "i-heroicons-ticket" });
const $emit = defineEmits(["onSubmit"]);
const { data } = useFetch("/api/settings", { pick: ["icons"] });
function onSubmit() {
  $emit("onSubmit");
}
</script>
<template>
  <UPopover v-model:open="open">
    <UButton
      :icon="model"
      size="xl"
      variants="ghost"
      color="white"
      :ui="{ rounded: 'rounded-full' }"
    />

    <template #panel>
      <div class="grid grid-cols-6 gap-2 p-2">
        <UButton
          v-for="icon in data.icons"
          :key="icon"
          @click="
            model = icon;
            open = false;
            onSubmit();
          "
          variant="soft"
          color="gray"
          :icon="icon"
        />
      </div>
    </template>
  </UPopover>
</template>
