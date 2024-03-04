<script setup>
const columns = [
  {
    key: "project",
    label: "Project",
    sortable: true,
    default: "Aucun projet",
  },
  {
    key: "name",
    label: "Nom",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
];

const selectedColumns = ref([...columns]);
const selectedRow = ref([]);

const { data, refresh } = useFetch("/api/tasks");
refreshOnEvent(refresh);

function select(row) {
  navigateTo("/tasks/" + row._id);
}
</script>

<template>
  <div>
    <h3>Tâches</h3>
    <div>
      <div
        class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
      >
        <USelectMenu
          v-model="selectedColumns"
          :options="columns"
          multiple
          placeholder="Columns"
        />
      </div>

      <UTable
        v-if="data"
        v-model="selectedRow"
        :columns="selectedColumns"
        :rows="data"
        sort-asc-icon="i-heroicons-arrow-up-20-solid"
        sort-desc-icon="i-heroicons-arrow-down-20-solid"
        :sort-button="{
          icon: 'i-heroicons-sparkles-20-solid',
          color: 'primary',
          variant: 'outline',
          size: '2xs',
          square: false,
          ui: { rounded: 'rounded-full' },
        }"
        class="w-full"
        @select="select"
      >
        <template #project-data="{ row }">
          <div class="flex gap-2 items-center">
            <template v-if="row.project">
              <UIcon
                :name="useProjectsStore().getProjectById(row.project).icon"
              />
              <span>{{
                useProjectsStore().getProjectById(row.project).name
              }}</span>
            </template>
            <template v-else> Aucun projet </template>
          </div>
        </template>
        <template #status-data="{ row }">
          <TagsStatus :task="row" />
        </template>
      </UTable>
    </div>
  </div>
</template>
