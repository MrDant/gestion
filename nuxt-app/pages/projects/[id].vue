<script setup>
const _id = useRoute().params.id;

const open = ref(false);
const {
  data: project,
  refresh: refreshProject,
  error,
} = useFetch("/api/projects", {
  method: "get",
  query: { _id },
  transform: (e) => {
    if (e.length !== 1) {
      throw createError("");
    }
    return e[0];
  },
});

if (error.value) {
  useRouter().replace("/");
}

const { data: tasks, refresh: refreshTasks } = useFetch("/api/tasks", {
  method: "get",
  query: { "properties.project.value": _id },
});

const update = async () => {
  refreshProject();
  await useProjectsStore().fetch();
  refreshTasks();
};

function onSubmit() {
  $fetch("/api/projects/" + _id, { method: "put", body: project.value }).then(
    update
  );
}
const onDelete = async () => {
  await $fetch("/api/projects/" + _id, { method: "delete" });
  await useProjectsStore().fetch();
  navigateTo("/");
};

const icons = [
  "i-heroicons-academic-cap",
  "i-heroicons-archive-box",
  "i-heroicons-banknotes",
  "i-heroicons-inbox-stack",
  "i-heroicons-bug-ant",
];
</script>
<template>
  <div class="space-y-4">
    <div class="flex">
      <div class="flex gap-3 items-center">
        <UPopover v-model:open="open">
          <div class="relative">
            <div class="min-w-8">
              <UIcon :name="project.icon" class="text-3xl" />
            </div>
            <UButton
              icon="i-heroicons-pencil"
              size="2xs"
              :ui="{
                rounded: 'rounded-full',
                icon: { size: '2xs' },
              }"
              variant="solid"
              class="absolute -top-2 -right-2"
            />
          </div>

          <template #panel>
            <div class="grid grid-cols-6 gap-2 p-2">
              <UButton
                v-for="icon in icons"
                :icon="icon"
                :key="icon"
                @click="
                  project.icon = icon;
                  open = false;
                  onSubmit();
                "
                variant="soft"
                color="gray"
              />
            </div>
          </template>
        </UPopover>

        <h2>{{ project?.name }}</h2>
      </div>
      <UButton
        color="red"
        @click="onDelete"
        label="Supprimer"
        class="ml-auto"
      />
    </div>
    <h3 class="mt-4 mb-2">Liste des tâches</h3>
    <TaskList :project="_id" />
    <div class="text-right">
      <UButton label="Enregistrer" @click="onSubmit" />
    </div>
  </div>
</template>
