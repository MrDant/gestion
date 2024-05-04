import type { USelectMenu } from '#build/components';
<script setup>
const model = defineModel();
const t = {
  type: "string",
  label: "Label",
  key: "Clé",
  options: [],
  multiple: false,
};
const types = [
  { key: "string", label: "Text" },
  { key: "select", label: "Options" },
  { key: "link", label: "Lien" },
];
function add() {
  model.value.push(t);
}
</script>
<template>
  <div>
    <div v-for="property in model" :key="property">
      <div class="grid grid-cols-2">
        <EditableTitle v-model="property.label" />
        <EditableTitle v-model="property.key" />
        <div class="flex gap-4 items-center">
          <p>Multiple</p>
          <UCheckbox v-model="property.multiple" />
        </div>
        <div class="flex gap-4 items-center">
          <p>Type</p>
          <USelect
            v-model="property.type"
            :options="types"
            option-attribute="label"
            value-attribute="key"
            label="Multiple"
          />
          <USelectMenu
            v-if="property.type == 'select'"
            v-model="property.options"
            :options="property.options"
            creatable
            multiple
            searchable
            class="flex-1"
          />
        </div>
      </div>
      <UDivider class="my-8" />
    </div>
    <div class="text-center">
      <UButton label="+ Ajouter une propriété" @click="add" color="white" />
    </div>
  </div>
</template>
