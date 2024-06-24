export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/image", "nuxt-tiptap-editor"],
  css: ["~/assets/main.scss"],
  runtimeConfig: {
    mongodbUri: "mongodb://root:example@localhost:27017/",
  },
});
