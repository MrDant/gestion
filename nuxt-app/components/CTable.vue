<script setup>
const model = defineModel();
const modelSelect = defineModel("selected", { default: null });
const $emit = defineEmits(["select", "add"]);
const { columns } = defineProps(["columns"]);
const options = computed(() => {
  const o = {
    "sort-asc-icon": "i-heroicons-arrow-up-20-solid",
    "sort-desc-icon": "i-heroicons-arrow-down-20-solid",
  };
  if (modelSelect !== null) {
    o["v-model"] = modelSelect;
  }
  return o;
});
</script>
<template>
  <UTable
    v-if="model"
    v-bind="options"
    :columns="columns"
    :rows="model"
    :sort-button="{
      icon: 'i-heroicons-sparkles-20-solid',
      color: 'primary',
      variant: 'outline',
      size: '2xs',
      square: false,
      ui: { rounded: 'rounded-full' },
    }"
    class="w-full"
    @select="$emit('select', $event)"
  >
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">Aucun élément</span>
        <UButton
          label="Ajouter"
          icon="i-heroicons-plus"
          @click="$emit('add')"
        />
      </div>
    </template>
  </UTable>
</template>
