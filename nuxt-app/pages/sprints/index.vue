<script setup>
import { ModalAddSprint } from "#components";
const columns = [
  {
    key: "name",
    label: "Nom",
    sortable: true,
  },
];

const selectedColumns = ref([...columns]);

const { data, refresh } = useFetch("/api/sprints");
refreshOnEvent(refresh);

function select(row) {
  navigateTo("/sprints/" + row._id);
}

function add() {
  useModal().open(ModalAddSprint);
}
</script>

<template>
  <div>
    <h3>List des sprints</h3>
    <div>
      <CTable v-model="data" :columns="columns" @add="add" @select="select" />
      <div class="text-center mt-2" v-if="data">
        <UButton label="Ajouter un sprint" @click="add" />
      </div>
    </div>
  </div>
</template>
