<script setup>
const form = reactive({
  name: "",
});

const create = () => {
  $fetch("/api/projects", { method: "post", body: form }).then((e) => {
    useProjectsStore()
      .fetch()
      .then(() => useModal().close());
  });
};
</script>
<template>
  <ModalDefault title="Ajouter un projet">
    <UForm @submit="create" class="space-y-4">
      <UFormGroup label="Nom du projet">
        <UInput v-model="form.name" />
      </UFormGroup>
      <div class="text-right">
        <UButton type="submit" label="Créer" />
      </div>
    </UForm>
  </ModalDefault>
</template>
