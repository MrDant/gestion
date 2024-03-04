<script setup>
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
});
const form = reactive({});

const create = () => {
  $fetch("/api/tasks", { method: "post", body: form }).then((e) => {
    useNuxtApp().$event.emit("tasks");
    useModal().close();
  });
};
</script>
<template>
  <ModalDefault title="Ajouter une tâche">
    <UForm :schema="schema" :state="form" class="space-y-4" @submit="create">
      <UFormGroup label="Nom" name="name">
        <UInput v-model="form.name" placeholder="Nom ..." name="name" />
      </UFormGroup>
      <div class="text-center">
        <UButton label="Ajouter" type="submit" />
      </div>
    </UForm>
  </ModalDefault>
</template>
