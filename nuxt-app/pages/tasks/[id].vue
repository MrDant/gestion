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
  saveTask(data.value).then(() => {
    refresh();
    if (!data.parent) {
      useEmit();
    }
  });
};
const remove = () => {
  $fetch("/api/tasks/" + _id, { method: "delete" }).then(() => navigateTo("/"));
};

const items = computed(() => [
  [
    { label: "lien", key: "link" },
    { label: "texte", key: "string" },
    { label: "date", key: "date" },
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
      <TagsStatus :task="data" class="ml-auto" />
    </div>
    <h2>Propriétés</h2>
    <div class="grid grid-cols-2 gap-8">
      <div>
        <p>Date de début :</p>
        <EditableDate v-model="data.properties['date-start']" @change="save" />
      </div>
      <div v-for="(p, index) in data.properties.others" :key="p">
        <div>
          <EditableProperty
            v-model="data.properties.others[index]"
            @change="save"
          /><UButton
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
    <UTextarea v-model="data.contenu" @blur="save" autoresize />
    <div class="flex gap-2 my-2">
      <UButton label="Supprimer" @click="remove" color="red" />
      <UButton label="Enregistrer" @click="save" />
    </div>

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
