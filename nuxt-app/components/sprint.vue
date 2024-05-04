<script setup>
const { id } = defineProps({ id: { required: true } });
const status = ["Not started", "In progress", "Done"];
const { data, refresh } = useFetch("/api/tasks", {
  query: { sprint: id },
  transform: (tickets) => {
    const result = {};
    tickets.forEach((t) => {
      const status = t.properties.status.value;
      if (!result[status]) {
        result[status] = [];
      }
      result[status].push(t);
    });
    return result;
  },
});
refreshOnEvent(refresh);

async function onAdd(properties, element) {
  await $fetch("/api/tasks/" + element._id, {
    method: "put",
    body: {
      properties,
      sprint: id,
    },
  });
  await refresh();
}
</script>
<template>
  <div class="flex gap-10">
    <UCard v-for="s in status" :key="s" class="flex-1">
      <template #header>
        <h2>{{ s }}</h2>
      </template>
      <Drag
        v-model="data[s]"
        v-slot="{ element }"
        @on-add="onAdd({ status: { value: s, label: 'Status' } }, $event)"
      >
        <TaskCard :task="element" class="my-2" :status="false" />
      </Drag>
    </UCard>
  </div>
</template>
