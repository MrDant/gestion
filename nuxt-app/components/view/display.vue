<script setup>
const { filter } = defineProps({ filter: { default: {} } });
const { data, refresh } = useFetch("/api/tasks", {
  params: { ...filter },
  transform: (e) => {
    const res = {};
    e.forEach((task) => {
      const status = task.properties.status ?? "Not Started";
      if (!res[status]) {
        res[status] = [];
      }
      res[status].push(task);
    });
    return res;
  },
});
refreshOnEvent(refresh);
const status = ["Not started", "In progress", "Done"];
async function onAdd(status, element) {
  await $fetch("/api/tasks/" + element._id, {
    method: "put",
    body: {
      properties: { ...element.properties, status },
    },
  });
  await refresh();
}
</script>

<template>
  <div>
    <div class="flex gap-10" v-if="data">
      <UCard v-for="s in status" :key="s" class="flex-1">
        <template #header>
          <h2>{{ s }}</h2>
        </template>
        <Drag v-model="data[s]" v-slot="{ element }" @on-add="onAdd(s, $event)">
          <div>
            <TaskCard :task="element" class="my-2" :status="false" />
          </div>
        </Drag>
      </UCard>
    </div>
  </div>
</template>
