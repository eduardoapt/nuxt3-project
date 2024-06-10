<template>
  <div>
    <div class="py-5 w-1/4 m-auto">
      Buscar nome
      <UInput icon="i-icon-park-outline-search" v-model="search" />
    </div>
    <div class="mt-8 flex flex-row flex-wrap gap-6">
      <div
        class="w-11/12 md:w-[31%] lg:w-[30%] shadow-2xl hover:brightness-150 rounded-lg hover:bg-slate-900"
        v-for="user in usersFormatted"
      >
        <div class="flex flex-row flex-nowrap gap-x-3">
          <div class="w-1/3 aspect-square">
            <img :src="user.image" alt="" class="w-full min-w-20 rounded-lg" />
          </div>
          <div class="flex flex-col flex-nowrap gap-y-2">
            <div class="text-lg truncate w-3/4">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="text-sm">Gênero: {{ user.gender }}</div>
            <div class="text-sm">
              Nascido em: {{ format(new Date(user.birthDate), "dd/MM/yyy") }}
            </div>
            <div
              class="text-sm cursor-pointer"
              @click="openGoogle(user.address.coordinates)"
            >
              Localização: {{ user.address.city }} /
              {{ user.address.stateCode }} - {{ user.address.city }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns"

const openGoogle = (coordinates) => {
  const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
  window.open(url, "_blank")
}

const search = ref("")

const {
  data: {
    value: { users },
  },
} = await useFetch(`https://dummyjson.com/users`)

const usersFormatted = computed(() => {
  const newList = users.sort((a, b) => a.firstName.localeCompare(b.firstName))
  return newList.filter(
    (name) =>
      name.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      name.lastName.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped></style>
