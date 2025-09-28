export interface ValidationRule {
  required?: boolean
  minLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface ValidationErrors {
  [key: string]: string
}

export function validateField(value: string, rules: ValidationRule): string | null {
  if (rules.required && !value.trim()) {
    return "Este campo es obligatorio"
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Debe tener al menos ${rules.minLength} caracteres`
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return "Formato inválido"
  }

  if (rules.custom) {
    return rules.custom(value)
  }

  return null
}

export function validateForm(data: Record<string, string>, rules: Record<string, ValidationRule>): ValidationErrors {
  const errors: ValidationErrors = {}

  Object.keys(rules).forEach((field) => {
    const error = validateField(data[field] || "", rules[field])
    if (error) {
      errors[field] = error
    }
  })

  return errors
}
