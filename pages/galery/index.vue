<template>
  <div>
    <div class="flex flex-row flex-wrap gap-3">
      <div v-for="tag in tags">
        <UBadge
          class="cursor-pointer"
          @click="selectTag(tag)"
          :label="tag"
          color="orange"
          :variant="selectedTags.includes(tag) ? 'solid' : 'outline'"
        />
      </div>
    </div>
    <div class="mt-8 flex flex-row flex-wrap gap-6">
      <div
        class="w-11/12 md:w-[27%] lg:w-[23%] shadow-2xl hover:brightness-150 rounded-lg hover:bg-slate-900 cursor-pointer"
        v-for="recipe in filteredRecipes"
        @click="navigateTo(`/galery/${recipe.id}`)"
      >
        <div class="flex flex-row flex-nowrap gap-x-3">
          <div class="w-1/3 aspect-square">
            <img
              :src="recipe.image"
              alt=""
              class="w-full min-w-20 rounded-lg"
            />
          </div>
          <div class="flex flex-col flex-nowrap gap-y-2">
            <div class="text-lg truncate w-3/4">
              {{ recipe.name }}
            </div>
            <div class="text-sm">
              Ingredientes: {{ recipe.ingredients.length }}
            </div>
            <div class="text-sm">Etapas: {{ recipe.instructions.length }}</div>
            <div class="text-sm">
              Porções:
              <span
                v-for="icon in Array(
                  recipe.servings > 11 ? 11 : recipe.servings
                )"
                class="i-icon-park-outline-bread bg-amber-200"
              />
              <span
                class="i-icon-park-outline-plus bg-amber-200"
                v-if="recipe.servings > 11"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  data: {
    value: { recipes },
  },
} = await useFetch(`https://dummyjson.com/recipes`)

const selectedTags = ref([])

const selectTag = (tag) => {
  let tempArray = [...selectedTags.value]
  if (selectedTags.value.includes(tag)) {
    tempArray = selectedTags.value.filter((tags) => tags !== tag)
  } else {
    tempArray.push(tag)
  }
  selectedTags.value = tempArray
}

const filteredRecipes = computed(() => {
  const filter = recipes.filter((item) =>
    item.tags.some((tag) => selectedTags.value.includes(tag))
  )
  return selectedTags.value.length === 0 ? recipes : filter
})

const {
  data: { value: tags },
} = await useFetch(`https://dummyjson.com/recipes/tags`)
</script>

<style scoped></style>
