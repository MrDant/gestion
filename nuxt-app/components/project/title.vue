import type project from '~/server/models/project';
<script setup>
const { project } = defineProps(["project"]);
</script>
<template>
  <h3 class="flex items-center gap-2">
    <UIcon :name="project?.icon" /><span>{{
      project?.name ?? "Aucun projet"
    }}</span>
  </h3>
</template>
