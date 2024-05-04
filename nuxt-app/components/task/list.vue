<script setup>
const { task, project } = defineProps({ task: null, project: null });
const query = {};
if (task) {
  query.parent = task;
} else {
  query.parent = false;
}
if (project) {
  query.project = project;
}
const { data, refresh } = useFetch("/api/tasks", { query });
async function add(e) {
  await $fetch("/api/tasks", {
    method: "post",
    body: { name: e.target.value, parent: task, project },
  });
  await refresh();
  e.target.value = "";
}
async function remove(e) {
  await $fetch("/api/tasks/" + e._id, {
    method: "delete",
  });
  await refresh();
}
</script>
<template>
  <div>
    <UAccordion :items="data">
      <template #default="{ item, open }">
        <div class="flex gap-4 items-center">
          <UIcon name="i-heroicons-ticket" />
          <p>{{ item.name }}</p>
          <UButton
            label="Open"
            icon="i-heroicons-document"
            size="xs"
            variant="ghost"
            class="z-100"
            @click.prevent="navigateTo('/tasks/' + item._id)"
          />
          <TagsStatus :task="item" class="ml-auto" />
          <UButton
            icon="i-heroicons-minus"
            size="xl"
            variant="ghost"
            color="white"
            @click.prevent="remove(item)"
          />
        </div>
      </template>
      <template #item="{ item }">
        <TaskList :task="item._id" class="ml-4" />
      </template>
    </UAccordion>
    <div class="flex items-center gap-2">
      <UIcon name="i-heroicons-plus" />
      <UInput placeholder="Ajouter un ticket" @keypress.enter="add" />
    </div>
    <UDivider class="my-1" />
  </div>
</template>
