<script setup>
const { tickets, title } = defineProps(["tickets", "title"]);
const list = reactive({});
function setChildren(ticket) {
  const childrens = tickets.filter((t) => t.parent === ticket._id);
  ticket.children = [...childrens.map(setChildren)];
  return ticket;
}

tickets
  .filter((e) => !e.parent)
  .forEach((t) => {
    const key = t.project ?? "none";
    if (!list[key]) {
      list[key] = [];
    }
    t = setChildren(t);
    list[key].push(t);
  });

const store = useProjectsStore();
const projects = computed(() =>
  Object.keys(list)
    .map((e) => (e == "none" ? null : store.getProjectById(e)))
    .sort((a, b) => {
      if (!a) {
        return -1;
      }
      if (!b) {
        return 1;
      }
      return a.name < b.name;
    })
);
</script>
<template>
  <UCard :ui="{ body: { padding: 'sm:py-0' } }">
    <template #header>
      <h2>{{ title }}</h2>
    </template>
    <!-- <Drag v-model="list" v-slot="{ element }">
      <TaskCard :task="element" class="my-2" :status="false" />
    </Drag> -->
    <div
      v-for="(project, index) in projects"
      :key="project"
      class="border-dashed"
      :class="{
        'border-t': index > 0,
        'border-b': index < projects.length - 1,
      }"
    >
      <ProjectTitle :project="project" />
      <Drag
        v-model="list[project?._id ?? 'none']"
        v-slot="{ element }"
        :group="{ name: 'project', put: ['default'], pull: ['default'] }"
      >
        <TaskCardWithChild :task="element" class="my-2" />
      </Drag>
    </div>
  </UCard>
</template>
