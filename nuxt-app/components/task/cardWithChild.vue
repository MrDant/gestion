<script setup>
const { task } = defineProps(["task"]);
</script>
<template>
  <UCard :ui="{ body: { padding: 'py-2 sm:py-2' } }">
    <h3>{{ task.name }}</h3>
    <drag
      v-if="task.children.length"
      v-model="task.children"
      :group="{ name: 'sub-task', put: ['default'], pull: ['default'] }"
      v-slot="{ element }"
    >
      <TaskCardWithChild :task="element" class="my-2" />
    </drag>
  </UCard>
</template>
