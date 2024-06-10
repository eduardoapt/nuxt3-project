<template>
  <div class="flex flex-row flex-nowrap gap-x-10">
    <div class="w-1/3 aspect-square">
      <img :src="recipe.image" alt="" class="rounded-lg" />
    </div>
    <div class="flex flex-col flex-nowrap gap-y-2">
      <div class="text-3xl">{{ recipe.name }}</div>
      <div class="text-2xl">
        Ingredientes:
        <div v-for="ingredients in recipe.ingredients">
          <ul>
            <li class="mt-3 text-lg">- {{ ingredients }}</li>
          </ul>
        </div>
      </div>
      <div class="text-2xl mt-4">
        Etapas:
        <div v-for="(instructions, index) in recipe.instructions">
          <ol class="mt-2">
            <li class="text-lg">{{ index + 1 }} - {{ instructions }}</li>
          </ol>
        </div>
      </div>
      <div class="text-2xl mt-4">
        Porções:
        <span
          v-for="icon in Array(recipe.servings)"
          class="i-icon-park-outline-bread bg-amber-200"
        />
      </div>
      <div class="text-2xl mt-4">
        Tags:
        <div class="flex flex-row gap-3">
          <div v-for="tags in recipe.tags">
            <UBadge :label="tags" color="orange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["recipe"],
})

const route = useRoute()

const id = computed(() => route.params.id)

const {
  data: { value: recipe },
} = await useFetch(`https://dummyjson.com/recipes/${id.value}`)
</script>

<style scoped></style>
