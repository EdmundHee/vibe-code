
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100
}

export function validateSignupData(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const formData = data as Record<string, unknown>

  if (!formData.name || typeof formData.name !== 'string') {
    errors.push('Name is required')
  } else if (!validateName(formData.name)) {
    errors.push('Name must be between 2 and 100 characters')
  }

  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('Email is required')
  } else if (!validateEmail(formData.email)) {
    errors.push('Invalid email format')
  }

  if (typeof formData.newsletter_subscribed !== 'boolean') {
    formData.newsletter_subscribed = false
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}