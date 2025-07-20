import SignupForm from './SignupForm'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import { Code2, Sparkles, Zap, Users } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                AI-Powered Learning Platform
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learn to Code with{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Guidance
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Master programming through personalized AI-powered newsletters, 
                interactive tutorials, and a supportive community. Start your 
                coding journey today, completely free.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Beginner Friendly</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Start from zero, no experience needed
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Learn at Your Pace</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Weekly lessons delivered to your inbox
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Personalized learning with AI assistance
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Join 10,000+ Learners</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Be part of our growing community
                  </p>
                </div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mt-1">Trusted by thousands of learners</p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Form */}
          <div className="lg:pl-8">
            <ErrorBoundary>
              <SignupForm />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection