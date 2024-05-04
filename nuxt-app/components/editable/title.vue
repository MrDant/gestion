<script setup>
const model = defineModel();
const edit = ref(false);
const $emit = defineEmits(["onSubmit"]);

function submit() {
  edit.value = false;
  $emit("onSubmit");
}
</script>
<template>
  <div>
    <template v-if="edit">
      <UInput v-model="model" @keypress.enter="submit" :autofocus="true" />
    </template>
    <template v-else>
      <h2 class="cursor-pointer" @click="edit = true">
        {{ model ?? "Cliquez pour ajouter du text" }}
      </h2>
    </template>
  </div>
</template>
