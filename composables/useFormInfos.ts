export default function () {
  const age = ref(0)

  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    const birth = new Date(birthDate)

    const monthDiff = today.getMonth() - birth.getMonth()

    age.value = today.getFullYear() - birth.getFullYear()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age.value -= 1
    }

    return age.value
  }

  function validateCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, "")

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false
    }

    let sum = 0
    let remainder

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false
    }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false
    }

    return true
  }

  return {
    age,
    calculateAge,
    validateCPF,
  }
}
