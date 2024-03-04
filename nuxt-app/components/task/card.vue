<script setup>
import { _padding } from "#tailwind-config/theme";

const { task, status } = defineProps({
  task: {},
  status: { type: Boolean, default: true },
});
const project = computed(() => useProjectsStore().getProjectById(task.project));
</script>
<template>
  <UCard
    class="card"
    :ui="{
      body: { padding: 'py-2 sm:py-2' },
      header: { padding: 'p-2' },
    }"
  >
    <template #header v-if="project">
      <div class="flex items-center gap-2">
        <UIcon :name="project.icon" />
        <h3>{{ project?.name }}</h3>
      </div>
    </template>
    <div class="flex gap-4 items-center">
      <p>
        {{ task?.name }}
      </p>
      <TagsStatus class="ml-auto" :task="task" v-if="status" />
      <div class="h-0 flex items-center">
        <UButton
          icon="i-heroicons-document"
          label="open"
          color="gray"
          variant="ghost"
          class="open"
          @click="navigateTo('/tasks/' + task._id)"
        />
      </div>
    </div>
  </UCard>
</template>
<style lang="scss" scoped>
.open {
  @apply hidden;
}
.card:hover {
  .open {
    @apply flex;
  }
}
</style>
