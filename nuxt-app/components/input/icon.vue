<template>
  <div class="relative">
    <UInput @keypress.enter="add(e.target.value)" @input="searching" />
    <div
      class="rounded bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 max-w-prose"
    >
      <div class="flex items-center flex-wrap gap-4 p-4">
        <div
          class="text-2xl border rounded border-black cursor-pointer flex items-center p-1 hover:bg-slate-100"
          v-for="i in recents"
          :key="i"
          @click="add(i)"
        >
          <UIcon :name="i" dynamic />
        </div>
      </div>
      <template v-if="searchIcons.length">
        <UDivider class="my-2" />
        <div class="flex items-center flex-wrap gap-4 p-4">
          <div
            class="text-2xl border rounded border-black cursor-pointer flex items-center p-1 hover:bg-slate-100"
            v-for="i in searchIcons"
            :key="i"
            @click="add(i)"
          >
            <UIcon :name="i" dynamic />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { useLocalStorage } from "@vueuse/core";
const icons = useState("icons");
const emits = defineEmits(["add"]);
const searchIcons = ref([]);
const recents = useLocalStorage("icons", []);
function add(e) {
  emits("add", e);
  recents.value = [e, ...recents.value]
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .slice(0, 10);
}
function searching(e) {
  const input = e.target.value;
  if (input === "") {
    searchIcons.value = [];
  } else {
    searchIcons.value = icons.value
      .filter((e) => e.includes(input))
      .slice(0, 50);
    open.value = true;
  }
}
</script>
