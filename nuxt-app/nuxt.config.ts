export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/image"],
  runtimeConfig: {
    mongodbUri: "mongodb://root:example@localhost:27017/",
  },
});