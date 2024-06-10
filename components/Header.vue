<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-amber-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6 w-1/6">
        <span class="font-semibold text-2xl tracking-tight">{{
          pageName
        }}</span>
      </div>
      <div class="block md:hidden">
        <UDropdown
          :ui="{ backGround: 'bg-amber-900' }"
          :items="items"
          :popper="{ arrow: true }"
        >
          <UButton
            class="flex items-center px-3 py-2 border rounded text-amber-500 border-amber-400 hover:text-amber-900 hover:border-white"
            color="white"
            icon="i-icon-park-outline-hamburger-button"
          >
          </UButton>
        </UDropdown>
      </div>
      <div
        class="w-full flex-grow md:flex md:items-center md:w-auto"
        :class="{ hidden: !isOpen, block: isOpen }"
      >
        <div class="text-sm md:flex-grow">
          <NuxtLink
            to="/"
            class="block mt-4 md:inline-block md:mt-0 text-amber-200 hover:text-white mr-4"
          >
            Cadastrar Usuário
          </NuxtLink>
          <NuxtLink
            to="/galery"
            class="block mt-4 md:inline-block md:mt-0 text-amber-200 hover:text-white mr-4"
          >
            Receitas
          </NuxtLink>
          <NuxtLink
            to="/users"
            class="block mt-4 md:inline-block md:mt-0 text-amber-200 hover:text-white mr-4"
          >
            Usuários
          </NuxtLink>
        </div>
        <div>
          <ClientOnly>
            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />
          </ClientOnly>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const route = useRoute()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  },
})

const pageName = computed(() => {
  switch (route.path) {
    case "/galery":
      return "Receitas"
      break

    case "/users":
      return "Usuários"
      break

    default:
      return "Cadastro"
      break
  }
})

const items = [
  [
    {
      label: "Cadastrar Usuário",
      icon: "i-heroicons-user-plus-solid",
      to: "/",
    },
  ],
  [
    {
      label: "Galeria de Receitas",
      icon: "i-icon-park-outline-fork-spoon",
      to: "/galery",
    },
  ],
  [
    {
      label: "Buscar Usuários",
      icon: "i-heroicons-user-group-16-solid",
      to: "/users",
    },
  ],
  [
    {
      label: "Mudar tema",
      icon: "i-heroicons-cog-6-tooth-16-solid",
      click: () => (isDark.value = !isDark.value),
    },
  ],
]
</script>

<style scoped></style>
