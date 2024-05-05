<template>
  <div>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
      <UModals />
    </NuxtLayout>
  </div>
</template>
<script setup>
const icons = useState("icons");

await callOnce(async () => {
  const data = await $fetch("https://icones.js.org/collections-meta.json", {});
  icons.value = data
    .map((e) => e.icons.map((x) => "i-" + e.id + "-" + x))
    .flat();
});
</script>
