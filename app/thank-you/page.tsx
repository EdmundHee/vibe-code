import Link from 'next/link'
import { CheckCircle2, ArrowLeft, BookOpen, Users, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        
        <div className="text-center mb-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Vibe Coding!
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You&apos;ve successfully joined our community of learners. Check your email 
            for a confirmation message and get ready to start your coding journey.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What happens next?
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Check your inbox</h3>
                <p className="text-gray-600 mt-1">
                  We&apos;ve sent you a welcome email with your first lesson and resources 
                  to get started.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Weekly newsletters</h3>
                <p className="text-gray-600 mt-1">
                  Every week, you&apos;ll receive carefully crafted lessons, coding tips, 
                  and AI-powered insights.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Join the community</h3>
                <p className="text-gray-600 mt-1">
                  Connect with fellow learners, share your progress, and get help 
                  when you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Learning Path</h3>
            <p className="text-sm text-gray-600">
              Structured curriculum from basics to advanced
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center">
            <Users className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
            <p className="text-sm text-gray-600">
              10,000+ learners supporting each other
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center">
            <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">AI Assistance</h3>
            <p className="text-sm text-gray-600">
              Get help anytime with AI-powered guidance
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Didn&apos;t receive our email? Check your spam folder or
          </p>
          <Button variant="outline" size="md">
            Resend confirmation email
          </Button>
        </div>
      </div>
    </main>
  )
}