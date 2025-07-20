import { useState, useCallback, useEffect } from 'react'
import { validateEmail } from '@/lib/validation'
import { SignupFormData, ApiResponse } from '@/types'

interface UseSignupFormProps {
  onSuccess?: (data: unknown) => void
  onError?: (error: string) => void
}

interface FormErrors {
  name?: string
  email?: string
  general?: string
}

interface UseSignupFormReturn {
  formData: SignupFormData
  errors: FormErrors
  loading: boolean
  success: boolean
  touched: Record<keyof SignupFormData, boolean>
  handleChange: (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (field: keyof SignupFormData) => () => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  resetForm: () => void
  validateField: (field: keyof SignupFormData, value: unknown) => string | undefined
}

const INITIAL_FORM_DATA: SignupFormData = {
  name: '',
  email: '',
  newsletter_subscribed: false
}

const INITIAL_TOUCHED: Record<keyof SignupFormData, boolean> = {
  name: false,
  email: false,
  newsletter_subscribed: false
}

export function useSignupForm({
  onSuccess,
  onError
}: UseSignupFormProps = {}): UseSignupFormReturn {
  const [formData, setFormData] = useState<SignupFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState(INITIAL_TOUCHED)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Validate individual field
  const validateField = useCallback((field: keyof SignupFormData, value: unknown): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || typeof value !== 'string') {
          return 'Name is required'
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters'
        }
        if (value.trim().length > 100) {
          return 'Name must be less than 100 characters'
        }
        return undefined

      case 'email':
        if (!value || typeof value !== 'string') {
          return 'Email is required'
        }
        if (!validateEmail(value)) {
          return 'Please enter a valid email address'
        }
        if (value.length > 255) {
          return 'Email must be less than 255 characters'
        }
        return undefined

      case 'newsletter_subscribed':
        // No validation needed for checkbox
        return undefined

      default:
        return undefined
    }
  }, [])

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    
    const nameError = validateField('name', formData.name)
    if (nameError) newErrors.name = nameError
    
    const emailError = validateField('email', formData.email)
    if (emailError) newErrors.email = emailError
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateField])

  // Handle field change with real-time validation
  const handleChange = useCallback((field: keyof SignupFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'newsletter_subscribed' ? e.target.checked : e.target.value
    
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear general error on any change
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }))
    }
    
    // Validate field if it has been touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }, [errors.general, touched, validateField])

  // Handle field blur - mark as touched and validate
  const handleBlur = useCallback((field: keyof SignupFormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    
    const value = formData[field]
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [formData, validateField])

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      newsletter_subscribed: true
    })
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setErrors({})
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data: ApiResponse = await response.json()
      
      if (!response.ok) {
        const errorMessage = response.status === 429
          ? 'Too many requests. Please try again later.'
          : data.error || 'Something went wrong. Please try again.'
        
        setErrors({ general: errorMessage })
        onError?.(errorMessage)
        return
      }
      
      setSuccess(true)
      onSuccess?.(data.data)
      
      // Reset form after a delay
      setTimeout(() => {
        resetForm()
      }, 3000)
    } catch {
      const errorMessage = 'Network error. Please check your connection and try again.'
      setErrors({ general: errorMessage })
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [formData, validateForm, onSuccess, onError])

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
    setErrors({})
    setTouched(INITIAL_TOUCHED)
    setSuccess(false)
  }, [])

  // Auto-validate fields when they change (after being touched)
  useEffect(() => {
    const newErrors: FormErrors = {}
    
    if (touched.name) {
      const nameError = validateField('name', formData.name)
      if (nameError) newErrors.name = nameError
    }
    
    if (touched.email) {
      const emailError = validateField('email', formData.email)
      if (emailError) newErrors.email = emailError
    }
    
    setErrors(prev => ({
      ...prev,
      name: newErrors.name,
      email: newErrors.email
    }))
  }, [formData.name, formData.email, touched.name, touched.email, validateField])

  return {
    formData,
    errors,
    loading,
    success,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateField
  }
}