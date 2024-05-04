<script setup>
import { ModalAddTask } from "#components";
const close = ref(false);

const addTask = () => {
  useModal().open(ModalAddTask);
};

const menu = ref([
  [
    {
      label: "Paramètre",
      icon: "i-heroicons-cog",
      click: () => navigateTo("/settings"),
    },
  ],
]);

const menuSwitch = () => (close.value = !close.value);

const { data: projects, refresh: taskRefresh } = useFetch("/api/tasks", {
  query: { parent: false },
  transform: (list) =>
    list.map((t) => ({ label: t.name, icon: t.icon, to: "/tasks/" + t._id })),
});

const views = computed(() => {
  return [
    {
      label: "Today",
      icon: "i-heroicons-calendar-days",
      click: () => navigateTo("/views/today"),
    },
  ];
});

const links = computed(() => {
  const result = useRoute().path.split("/");
  result.shift();
  return [
    {
      label: "Home",
      to: "/",
    },
    ...result.map((path, index) => {
      return {
        label: path,
        to: "/" + result.slice(0, index + 1).join("/"),
        // icon: "i-heroicons-home",
      };
    }),
  ];
});

refreshOnEvent(taskRefresh, "tasks");
</script>

<template>
  <div class="flex min-h-screen h-1">
    <aside class="border-r p-2 h-full" :class="{ close }">
      <div class="flex gap-4 items-center">
        <h1>Gestion de projets</h1>
        <UButton
          icon="i-heroicons-chevron-double-left"
          size="sm"
          color="primary"
          variant="solid"
          label="Cacher"
          @click="menuSwitch()"
        />
      </div>
      <UDivider class="my-2" />
      <h2>Les vues</h2>
      <UVerticalNavigation :links="views" />

      <h2>Les projets</h2>
      <UVerticalNavigation :links="projects" />
    </aside>
    <div class="p-2 flex-1">
      <header class="mb-2 flex">
        <UButton
          v-if="close"
          icon="i-heroicons-chevron-double-right"
          size="sm"
          color="primary"
          variant="solid"
          label="Afficher le menu"
          @click="menuSwitch()"
        />
        <UBreadcrumb :links="links" divider="/" />
        <UButtonGroup size="sm" orientation="horizontal" class="ml-auto">
          <UButton label="Ajouter une tache" @click="addTask" />
          <UDropdown :items="menu" :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-chevron-down-20-solid" />
          </UDropdown>
        </UButtonGroup>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.close {
  @apply border-none w-0;
  & > * {
    @apply invisible;
  }
}
</style>
