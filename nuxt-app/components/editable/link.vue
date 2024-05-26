<script setup>
const model = defineModel();
const edit = ref(false);
const displayIcon = ref(true);
const coloors = computed(() =>
  RegExp(/https:\/\/coolors.co\/[0-9a-z]+/gm).test(model.value)
);
const origin = computed(() => {
  try {
    const url = new URL(model.value);
    return url.origin;
  } catch {
    return null;
  }
});
const icon = computed(() => {
  if (origin.value) {
    return origin.value + "/favicon.ico";
  }
  return null;
});
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
      <a :href="model" target="_blank" class="truncate" v-else>
        <div
          v-if="displayIcon"
          class="w-10 h-10 border rounded-full flex items-center justify-center text-xl"
        >
          <UIcon
            v-if="origin == 'https://www.instagram.com'"
            name="i-bxl-instagram-alt"
          />
          <NuxtImg v-else :src="icon" @error="displayIcon = false" />
        </div>

        <template v-else> {{ model ?? "Entrez le lien" }}</template>
      </a>
      <UButton @click="edit = true" icon="i-heroicons-pencil" color="white" />
    </template>
  </div>
</template>
