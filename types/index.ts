export interface SignupFormData {
  name: string
  email: string
  newsletter_subscribed: boolean
}

export interface SignupRecord extends SignupFormData {
  id: string
  created_at: string
  updated_at: string
  ip_address?: string
  user_agent?: string
  referrer_url?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface RateLimitResult {
  success: boolean
  remaining?: number
  reset?: number
}