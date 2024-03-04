<script setup>
const model = defineModel();
const edit = ref(false);
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
      <a :href="model" target="_blank" class="truncate">{{
        model ?? "Entrez le lien"
      }}</a>
      <UButton @click="edit = true" icon="i-heroicons-pencil" color="white" />
    </template>
  </div>
</template>
