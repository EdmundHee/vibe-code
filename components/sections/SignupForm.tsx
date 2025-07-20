'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import { useSignupForm } from '@/lib/useSignupForm'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const SignupForm = () => {
  const router = useRouter()
  
  const {
    formData,
    errors,
    loading,
    success,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useSignupForm({
    onSuccess: () => {
      // Redirect after successful submission
      setTimeout(() => {
        router.push('/thank-you')
      }, 2000)
    }
  })

  // Success state UI
  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re all set!</h3>
        <p className="text-gray-600 mb-6">
          Thanks for signing up. We&apos;ll send you your first newsletter soon.
        </p>
        <button
          onClick={resetForm}
          className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          Sign up another email
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Start Your Coding Journey
        </h3>
        <p className="text-gray-600">
          Join thousands learning to code with AI-powered guidance
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={touched.name ? errors.name : undefined}
          disabled={loading}
          required
          aria-required="true"
          autoComplete="name"
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={touched.email ? errors.email : undefined}
          disabled={loading}
          required
          aria-required="true"
          autoComplete="email"
        />
        
        <Checkbox
          label="Send me weekly coding tips and tutorials"
          checked={formData.newsletter_subscribed}
          onChange={handleChange('newsletter_subscribed')}
          disabled={loading}
          aria-describedby="newsletter-description"
        />
        <p id="newsletter-description" className="text-xs text-gray-500 -mt-4 ml-7">
          Get exclusive content and learning resources delivered to your inbox
        </p>
        
        {errors.general && (
          <div className="rounded-lg bg-red-50 p-4 flex items-start gap-3" role="alert">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{errors.general}</p>
          </div>
        )}
        
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={loading}
          disabled={loading || (touched.name && !!errors.name) || (touched.email && !!errors.email)}
        >
          {loading ? 'Creating your account...' : 'Get Started Free'}
        </Button>
        
        <p className="text-xs text-center text-gray-500">
          By signing up, you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>.
          No spam, unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}

export default SignupForm