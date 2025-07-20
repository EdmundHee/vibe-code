import { SignupFormData } from '@/types'

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100
}

export function validateSignupData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required')
  } else if (!validateName(data.name)) {
    errors.push('Name must be between 2 and 100 characters')
  }

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required')
  } else if (!validateEmail(data.email)) {
    errors.push('Invalid email format')
  }

  if (typeof data.newsletter_subscribed !== 'boolean') {
    data.newsletter_subscribed = false
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}