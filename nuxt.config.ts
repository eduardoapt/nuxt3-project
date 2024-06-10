// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    css: "/<rootDir>/assets/css",
  },
  css: ["@/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxt/ui"],
  ui: {
    icons: ["heroicons", "icon-park-outline"],
  },
})
