<script setup>
const colors = {
  "Not started": "gray",
  "In progress": "yellow",
  Done: "green",
};
const { task } = defineProps(["task"]);
const loading = ref(false);
const open = ref(false);
const label = computed(() =>
  task?.properties.status !== "" ? task?.properties.status : null
);
function changeStatus(label) {
  task.properties.status = label;
  loading.value = true;
  saveTask(task).then(() => {
    loading.value = false;
    open.value = false;
  });
}
</script>
<template>
  <UPopover v-model:open="open">
    <UBadge
      :ui="{ rounded: 'rounded-full' }"
      :label="label"
      :color="colors[label] ?? 'green'"
      class="relative"
    />
    <template #panel>
      <div class="p-4 flex gap-2">
        <Loading v-if="loading" />
        <template v-else>
          <UBadge
            :ui="{ rounded: 'rounded-full' }"
            v-for="key in Object.keys(colors)"
            :key="key"
            :label="key"
            :color="colors[key]"
            class="relative"
            @click.stop="changeStatus(key)"
          />
        </template>
      </div>
    </template>
  </UPopover>
</template>
