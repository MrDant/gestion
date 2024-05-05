import type { variants } from '#tailwind-config';
<script setup>
const open = ref(false);
const model = defineModel({ default: "i-heroicons-ticket" });
const $emit = defineEmits(["onSubmit"]);
const { data } = useFetch("/api/settings", { pick: ["icons"] });
function onSubmit(icon) {
  model.value = icon;
  open.value = false;
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
      <div class="p-2">
        <InputIcon @add="onSubmit($event)" />
      </div>
    </template>
  </UPopover>
</template>
