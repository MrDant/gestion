<script setup>
const form = reactive({
  name: "",
});

const create = () => {
  $fetch("/api/sprints", { method: "post", body: form }).then((e) => {
    useModal().close();
  });
};
</script>
<template>
  <ModalDefault title="Ajouter un projet">
    <UForm @submit="create" class="space-y-4">
      <UFormGroup label="Nom du sprint">
        <UInput v-model="form.name" />
      </UFormGroup>
      <div class="text-right">
        <UButton type="submit" label="Créer" />
      </div>
    </UForm>
  </ModalDefault>
</template>
