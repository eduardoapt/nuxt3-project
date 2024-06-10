<template>
  <div>
    <div class="text-4xl mb-5">Cadastrar Novo Usuário</div>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 flex flex-row flex-wrap gap-x-12 gap-y-2"
      @submit="onSubmit"
      @error="onError"
    >
      <UFormGroup
        class="w-full md:w-5/12 mt-4"
        label="Nome completo"
        name="name"
      >
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup class="w-full md:w-5/12" label="CPF" name="cpf">
        <UInput @blur="formatCpf(state.cpf ?? 0)" v-model="state.cpf" />
      </UFormGroup>

      <UFormGroup
        class="w-full md:w-5/12"
        label="Data de Nascimento"
        name="birthday"
      >
        <UPopover :popper="{ placement: 'bottom-start' }">
          <div class="w-full">
            <UButton
              class="w-full"
              @click="resetDate"
              color="white"
              icon="i-heroicons-calendar-days-20-solid"
              :label="
                format(
                  state.birthday ? state.birthday : new Date(),
                  'dd/MM/yyy'
                )
              "
            />
          </div>
          <template #panel="{ close }">
            <DatePicker v-model="state.birthday" @close="close" @blur="close" />
          </template>
        </UPopover>
      </UFormGroup>

      <UFormGroup class="w-full md:w-5/12" label="Renda Mensal" name="income">
        <UInput
          @blur="formatCurrency(state.income ?? 0)"
          v-model="state.income"
        />
      </UFormGroup>

      <UDivider class="ml-5 w-10/12" label="Animal" />

      <UFormGroup class="w-full md:w-5/12" label="Tipo de Pet" name="petType">
        <USelect
          v-model="state.petType"
          :options="animalType"
          option-attribute="name"
        />
      </UFormGroup>

      <UFormGroup
        v-if="state.petType !== ''"
        class="w-full md:w-5/12"
        label="Raça do Pet"
        name="breed"
      >
        <USelect
          v-model="state.petBreed"
          :options="breedsList"
          option-attribute="name"
        />
      </UFormGroup>
      <UFormGroup
        v-if="state.petBreed === 'outro'"
        class="w-full md:w-5/12 mt-4"
        label="Especifique a raça"
        name="breedCustom"
      >
        <UInput v-model="state.customBreed" />
      </UFormGroup>

      <UDivider class="ml-5 w-10/12" label="Endereço" />

      <UFormGroup class="w-full md:w-5/12" label="CEP" name="cep">
        <UInput @blur="formatCep(state.cep ?? 0)" v-model="state.cep" />
      </UFormGroup>
      <div class="hidden md:block md:w-6/12" />
      <UFormGroup class="w-full md:w-5/12" label="Rua" name="street">
        <UInput disabled v-model="state.street" />
      </UFormGroup>
      <UFormGroup class="w-full md:w-5/12" label="Bairro" name="neighbourhood">
        <UInput disabled v-model="state.neighbourhood" />
      </UFormGroup>
      <UFormGroup class="w-full md:w-5/12" label="Cidade" name="city">
        <UInput disabled v-model="state.city" />
      </UFormGroup>
      <UFormGroup class="w-full md:w-5/12" label="Estado" name="state">
        <UInput disabled v-model="state.state" />
      </UFormGroup>
      <div class="w-full py-5 flex justify-center">
        <UButton class="w-full md:w-5/12 flex justify-center" type="submit">
          Registrar
        </UButton>
      </div>
    </UForm>
    <RegisterModal
      :user-infos="state"
      :should-open="openModal"
      @confirm="onConfirmation"
    />
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup"
import type { FormErrorEvent, FormSubmitEvent } from "#ui/types"
import { format } from "date-fns"
import type { Address } from "~/interfaces/types"

const validateForm = useFormInfos()
const openModal = ref(false)
const ageError = ref(false)
const animalType = ref([
  {
    name: "Selecione um tipo",
    value: "",
  },
  {
    name: "Cachorro",
    value: "dog",
  },
  {
    name: "Gato",
    value: "cat",
  },
])
const breeds = ref([
  {
    name: "Selecione uma raça",
    value: "",
    type: "cat",
  },
  {
    name: "Selecione uma raça",
    value: "",
    type: "dog",
  },
  {
    name: "Pastor Alemão",
    value: "alemao",
    type: "dog",
  },
  {
    name: "Poodle",
    value: "poodle",
    type: "dog",
  },
  {
    name: "Pastor Belga",
    value: "belga",
    type: "dog",
  },
  {
    name: "Border Collie",
    value: "collie",
    type: "dog",
  },
  {
    name: "Pincher",
    value: "pincher",
    type: "dog",
  },
  {
    name: "Outro",
    value: "outro",
    type: "dog",
  },
  {
    name: "Persa",
    value: "persa",
    type: "cat",
  },
  {
    name: "Siamês",
    value: "siames",
    type: "cat",
  },
  {
    name: "Maine Coon",
    value: "coon",
    type: "cat",
  },
  {
    name: "Bengal",
    value: "bengal",
    type: "cat",
  },
  {
    name: "Ragdoll",
    value: "ragdoll",
    type: "cat",
  },
  {
    name: "Outro",
    value: "outro",
    type: "cat",
  },
])

const breedsList = computed(() =>
  breeds.value.filter(({ type }) => type === state.petType)
)

const resetDate = () => {
  validateForm.calculateAge(state.birthday ?? new Date())
  state.birthday = undefined
  ageError.value = validateForm.age.value < 18 || validateForm.age.value > 65
}

const formatCep = async (value: string) => {
  let valueStr = value.toString().trim()
  valueStr = valueStr.replace(/\D/g, "")
  const erro = valueStr.length !== 8
  valueStr = valueStr.padStart(8, "0")
  let formatted = `${valueStr.slice(0, 5)}-${valueStr.slice(5)}`

  if (!erro) {
    const address: Address = await getEnderecoPorCep(valueStr)
    state.street = address.logradouro
    state.neighbourhood = address.bairro
    state.city = address.localidade
    state.state = address.uf
  }
  state.cep = erro ? value : formatted
}

const formatCpf = (value: string) => {
  let valueStr = value.toString().trim()
  valueStr = valueStr.replace(/\D/g, "")
  const erro = valueStr.length !== 11
  valueStr = valueStr.padStart(11, "0")
  let formatted = `${valueStr.slice(0, 3)}.${valueStr.slice(
    3,
    6
  )}.${valueStr.slice(6, 9)}-${valueStr.slice(9)}`

  state.cpf = erro ? value : formatted
}

const formatCurrency = (value: string) => {
  let valueStr = value.toString().trim()
  valueStr = valueStr.replace(/[^\d,.-]/g, "")
  let formatted = Number(valueStr.replace(",", ".")).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  state.income = formatted
}

const getEnderecoPorCep = async (cep = "0"): Promise<Address> => {
  cep = cep.replace(/\D/g, "")

  if (cep.length !== 8) {
    throw new Error("CEP inválido")
  }

  try {
    const { data } = await useFetch(`https://viacep.com.br/ws/${cep}/json/`)
    return data.value as Address
  } catch (error) {
    throw new Error(`Erro ao buscar endereço: ${error}`)
  }
}
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  openModal.value = true
}

async function onConfirmation() {
  toast.add({ title: "Formulário enviado com sucesso!" })
  openModal.value = false
  state.birthday = new Date()
  state.cep = ""
  state.city = ""
  state.cpf = ""
  state.customBreed = ""
  state.income = ""
  state.name = ""
  state.neighbourhood = ""
  state.petBreed = ""
  state.petType = ""
  state.state = ""
  state.street = ""
}

const onError = async (event: FormErrorEvent) => {
  toast.add({ title: "Erro no formulário!", color: "red" })
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: "smooth", block: "center" })
}

const schema = object({
  name: string()
    .test("verify-spaces", "Mínimo de dois nomes", (value) =>
      value?.includes(" ")
    )
    .required("Informação obrigatória"),
  cpf: string()
    .test("verify-cpf", "CPF precisa ser válido", (value) =>
      validateForm.validateCPF(value ?? "")
    )
    .required("Informação obrigatória"),
  birthday: string()
    .test(
      "verify-date",
      "Erro: idade máxima 65 anos ou mínima de 18 anos",
      (value: any) => {
        const result = validateForm.calculateAge(value)
        return result >= 18 && result <= 65
      }
    )
    .required("Informação obrigatória"),
  income: string().required("Informação obrigatória"),
  petType: string().required("Informação obrigatória"),
  petBreed: string().required("Informação obrigatória"),
  customBreed: string(),
  cep: string()
    .test("verify-cep", "CEP inválido", (cep = "0") => {
      cep = cep.replace(/\D/g, "")
      return cep.length === 8
    })
    .required("Informação obrigatória"),
  street: string(),
  neighbourhood: string(),
  city: string(),
  state: string(),
})

type Schema = InferType<typeof schema>

const initialState = {
  name: "",
  cpf: "",
  birthday: undefined,
  income: "",
  petType: "",
  petBreed: "",
  customBreed: "",
  cep: "",
  street: "",
  neighbourhood: "",
  city: "",
  state: "",
}

const state = reactive(initialState)
</script>

<style scoped></style>
