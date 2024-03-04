<script setup>
import { z } from "zod";

const state = defineModel();
const schema = z.object({
  name: z.string().min(1),
});

const $emit = defineEmits(["submit", "delete"]);
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    v-if="state"
    class="space-y-4"
    @submit="$emit('submit')"
  >
    <UFormGroup eager-validation name="name" label="Nom">
      <UInput v-model="state.name" placeholder="Nom de la tâche" name="name" />
    </UFormGroup>
    <div class="flex justify-end gap-2">
      <UButton type="submit">
        {{ state?._id ? "Enregistrer" : "Créer" }}
      </UButton>
      <UButton
        type="submit"
        v-if="state?._id"
        color="red"
        @click="$emit('delete')"
      >
        Supprimer
      </UButton>
    </div>
  </UForm>
  <!-- <UForm
    :schema="schema"
    :state="state"
    v-if="state"
    class="space-y-4"
    @submit="$emit('submit')"
  >
    
    <div class="grid grid-cols-2 gap-2">
      <div v-for="(property, key) in state.properties" :key="key">
        <template v-if="key == 'project'">
          <PropertiesProject v-model="state.properties.project.value" />
        </template>
        <UFormGroup :label="property.label" v-else>
          <UInput v-model="state.properties[key].value" />
        </UFormGroup>
      </div>
      <div class="self-end">
        <UButton
          label="Ajouter une propriété"
          icon="i-heroicons-plus"
          variant="ghost"
          color="gray"
        />
      </div>
    </div>
    <TaskList v-if="state?._id" :task="state?._id" />
   
  </UForm> -->
</template>
