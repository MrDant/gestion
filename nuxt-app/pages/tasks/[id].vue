<script setup>
const _id = useRoute().params.id;

const { data, refresh, error } = useFetch("/api/tasks", {
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

const save = () => {
  $fetch("/api/tasks/" + _id, { method: "put", body: data.value }).then(() => {
    refresh();
    if (!data.parent) {
      useEmit();
    }
  });
};
const onDelete = () => {
  $fetch("/api/tasks/" + _id, { method: "delete" }).then(() => navigateTo("/"));
};

const items = computed(() => [
  [
    { label: "lien", key: "link" },
    { label: "texte", key: "string" },
  ].map((e) => {
    e.click = () => addProperties(e.key);
    return e;
  }),
]);
function addProperties(type) {
  data.value.properties.others.push({
    type,
    label: "Choisir un label",
    value: null,
  });
}
</script>
<template>
  <div v-if="data">
    <div class="flex items-center gap-2 mb-4">
      <EditableIcon v-model="data.icon" @onSubmit="save" />
      <EditableTitle v-model="data.name" @onSubmit="save" />
    </div>
    <h2>Propriétés</h2>
    <div class="grid grid-cols-2 gap-8">
      <div v-for="(p, index) in data.properties.others" :key="p">
        <div>
          <EditableProperty v-model="data.properties.others[index]" /><UButton
            icon="i-heroicons-minus"
            @click="data.properties.others.splice(index, 1)"
          />
        </div>
      </div>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="white"
          label="+  Ajouter une propriété"
          variant="soft"
        />
      </UDropdown>
    </div>

    <h2>Tâches :</h2>
    <TaskList :task="data._id" />
    <UDivider class="m-4" />
    <UTextarea v-model="data.contenu" />
    <UButton label="Enregistrer" @click="save" />

    <!-- <TaskView
      v-if="data"
      v-model="data"
      @submit="onSubmit"
      @delete="onDelete"
    /> -->
  </div>
</template>
<style lang="scss" scoped>
h2 {
  @apply my-4;
}
</style>
