<script setup>
import { _padding } from "#tailwind-config/theme";

const { task, status } = defineProps({
  task: {},
  status: { type: Boolean, default: true },
});
</script>
<template>
  <UCard
    class="card"
    :ui="{
      body: { padding: 'py-2 sm:py-2' },
      header: { padding: 'p-2' },
    }"
  >
    <div class="flex gap-4 items-center">
      <UIcon :name="task?.properties.icon" />
      <p>
        {{ task?.name }}
      </p>
      <TagsStatus class="ml-auto" :task="task" v-if="status" />
      <div class="h-0 flex items-center ml-auto">
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
