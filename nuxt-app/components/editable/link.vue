<script setup>
const model = defineModel();
const edit = ref(false);
const coloors = computed(() =>
  RegExp(/https:\/\/coolors.co\/[0-9a-z]+/gm).test(model.value)
);
</script>
<template>
  <div class="flex items-center gap-3">
    <div v-if="edit">
      <UInput
        placeholder="href"
        v-model="model"
        @keypress.enter="edit = false"
      />
    </div>
    <template v-else>
      <template v-if="coloors">
        <EditableColors v-model="model" />
      </template>
      <a :href="model" target="_blank" class="truncate" v-else>{{
        model ?? "Entrez le lien"
      }}</a>
      <UButton @click="edit = true" icon="i-heroicons-pencil" color="white" />
    </template>
  </div>
</template>
