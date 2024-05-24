<script setup>
const model = defineModel();
const colors = computed(() => {
  if (model.value) {
    const linkSplited = model.value.split("/");
    if (linkSplited)
      return linkSplited[linkSplited.length - 1].split("-").map((e) => "#" + e);
  }
  return [];
});
function copy(color) {
  useCopyToClipboard().copy(color);
  useToast().add({ title: "Couleur " + color + " copiée" });
}
</script>
<template>
  <div class="flex items-center gap-3">
    <div class="flex gap-1">
      <div
        v-for="color in colors"
        class="w-10 h-10 rounded-full shadow border cursor-pointer"
        :key="color"
        :style="{ background: color }"
        @click="copy(color)"
      ></div>
    </div>
  </div>
</template>
