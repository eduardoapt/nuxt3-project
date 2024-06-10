import type { RouteLocationNormalized } from "vue-router"

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  const recipeId = Number(to.params.id)

  if (isNaN(recipeId) || recipeId < 0) {
    return navigateTo("/galery")
  }
})
