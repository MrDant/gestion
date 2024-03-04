<script setup>
const id = useRoute().params.id;
const {
  data: sprint,
  error,
  refresh: sprintRefresh,
} = useFetch(() => "/api/sprints/" + id);

if (error.value) {
  useRouter().replace("/sprints");
}
const { data, refresh } = useFetch("/api/tasks", {
  query: { sprint: false, "!properties.status.value": "Done" },
});
const onAdd = async (element) => {
  element.sprint = null;
  await $fetch("/api/tasks/" + element._id, {
    method: "put",
    body: element,
  });
  await refresh();
};
refreshOnEvent(refresh);
function save() {
  $fetch("/api/sprints/" + id, { method: "put", body: sprint.value }).then(
    sprintRefresh
  );
}
function remove() {
  $fetch("/api/sprints/" + id, { method: "delete" }).then(
    navigateTo("/sprints")
  );
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <h2 v-if="sprint">
        <UInput v-model="sprint.name" @keypress.enter="save" />
      </h2>
      <UButton icon="i-heroicons-trash" color="red" @click="remove" />
    </div>
    <Sprint :id="id" />
    <div>
      <!-- <Board title="Backlog" :tickets="data" /> -->
      <UCard>
        <template #header>
          <h2>Backlog</h2>
        </template>

        <Drag v-model="data" v-slot="{ element }" @on-add="onAdd">
          <TaskCard :task="element" class="my-2" />
        </Drag>
      </UCard>
    </div>
  </div>
</template>
