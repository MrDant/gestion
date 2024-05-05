<script setup>
const model = defineModel();
function remove(icon) {
  model.value = model.value.filter((e) => e !== icon);
}
function add(e) {
  model.value.push(e);
}
</script>
<template>
  <div>
    <InputIcon @add="add" />
    <UDivider class="my-8" />
    <div class="flex items-center flex-wrap gap-4">
      <div
        class="text-3xl border rounded border-black cursor-pointer flex items-center p-2 hover:bg-slate-100"
        v-for="i in model"
        :key="i"
        @click="remove(i)"
      >
        <UIcon :name="i" dynamic />
      </div>
    </div>
  </div>
</template>
