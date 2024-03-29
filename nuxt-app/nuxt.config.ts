export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  runtimeConfig: {
    mongodbUri: "mongodb://root:example@localhost:27017/",
  },
});