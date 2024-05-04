<script setup>
const colors = {
  "Not started": "gray",
};
const { task } = defineProps(["task"]);

const label = computed(() =>
  task?.properties.status !== "" ? task?.properties.status : null
);
</script>
<template>
  <UBadge
    :ui="{ rounded: 'rounded-full' }"
    :label="label"
    :color="colors[label] ?? 'green'"
  />
</template>
