<script setup>
const model = defineModel();
</script>
<template>
  <div>
    <EditableTitle v-model="model.label" />
    <EditableLink v-if="model.type === 'link'" v-model="model.value" />
    <EditableDate v-else-if="model.type === 'date'" v-model="model.value" />
    <EditableTitle v-else v-model="model.value" />
  </div>
</template>
