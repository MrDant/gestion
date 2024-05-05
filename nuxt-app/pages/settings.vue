<script setup>
import { SettingIcons, SettingProperties } from "#components";

const { data, refresh } = useFetch("/api/settings");
const items = [
  {
    label: "Propriétés",
    key: "properties",
    icon: "i-heroicons-information-circle",
    defaultOpen: true,
    content: SettingProperties,
  },
];
function save() {
  $fetch("/api/settings", { method: "put", body: data.value }).then(refresh);
}
</script>
<template>
  <div v-if="data">
    <UAccordion
      class="mt-12"
      color="amber"
      variant="outline"
      size="xl"
      :items="items"
    >
      <template #item="{ item }">
        <div class="p-4">
          <component :is="item.content" v-model="data[item.key]" />
        </div>
      </template>
    </UAccordion>
    <UButton label="Enregistrer" @click="save" />
  </div>
</template>
