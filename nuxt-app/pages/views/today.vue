<script setup>
import { DateTime } from "luxon";
const { dateFormat } = useAppConfig();

const today = DateTime.now().plus({ days: 1 }).toFormat(dateFormat);
const taskName = ref("");
function addTask() {
  $fetch("/api/tasks", {
    method: "post",
    body: {
      name: taskName.value,
      properties: {
        "date-start": DateTime.now().toFormat(dateFormat),
      },
    },
  }).then(() => {
    taskName.value = "";
    useEmit();
  });
}
</script>

<template>
  <div>
    <ViewDisplay :filter="{ 'properties.date-start': '<' + today }" />
    <div class="p-2 flex">
      <UInput
        placeholder="Ajouter une tâche"
        v-model="taskName"
        @keypress.enter="addTask"
      />
      <UButton label="Ajouter" @click="addTask" />
    </div>
  </div>
</template>
