<script setup>
const model = defineModel();
const $emit = defineEmits(["onAdd"]);
const { group } = defineProps({
  group: {
    default: {
      name: "default",
      put: true,
      pull: true,
    },
  },
});
const dragOptions = computed(() => ({
  animation: 200,
  group,
  disabled: false,
}));
const drag = ref(false);
const add = (e) => {
  $emit("onAdd", e.from.__draggable_component__.context.element);
};
</script>
<template>
  <ClientOnly>
    <draggable
      class="list-group min-h-12"
      tag="transition-group"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
      }"
      v-model="model"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="order"
      @add="add"
    >
      <template #item="{ element, index }">
        <div class="list-group-item cursor-move">
          <slot :element="element" :index="index" />
        </div>
      </template>
    </draggable>
  </ClientOnly>
</template>
