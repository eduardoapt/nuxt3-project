<template>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <span class="flex text-center text-3xl w-100">
          Confirma as informações cadastradas?
        </span>
      </template>

      <div class="text-2xl w-100">Nome completo</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.name }}</div>

      <div class="text-2xl w-100">CPF</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.cpf }}</div>

      <div class="text-2xl w-100">Data de Nascimento</div>
      <div class="text-xl w-100 mb-4">
        {{ format(userInfos.birthday, "dd/MM/yyy") }}
      </div>

      <div class="text-2xl w-100">Renda Mensal</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.income }}</div>

      <div class="text-2xl w-100">Tipo de Pet</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.petType }}</div>

      <div class="text-2xl w-100">Raça do Pet</div>
      <div class="text-xl w-100 mb-4">
        {{
          userInfos.petBreed === "outro"
            ? userInfos.customBreed
            : userInfos.petBreed
        }}
      </div>

      <div class="text-2xl w-100">CEP</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.cep }}</div>

      <div class="text-2xl w-100">Rua</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.street }}</div>

      <div class="text-2xl w-100">Bairro</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.neighbourhood }}</div>

      <div class="text-2xl w-100">Cidade</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.city }}</div>

      <div class="text-2xl w-100">Estado</div>
      <div class="text-xl w-100 mb-4">{{ userInfos.state }}</div>

      <template #footer>
        <div class="w-full flex justify-center">
          <UButton label="Confirmar informações" @click="sendConfirmation" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { format } from "date-fns"

const emit = defineEmits(["confirm"])

const props = defineProps({
  userInfos: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  shouldOpen: {
    type: Boolean,
    default: () => false,
  },
})

const isOpen = computed(() => props.shouldOpen)

const sendConfirmation = () => {
  emit("confirm")
}
</script>

<style scoped></style>
