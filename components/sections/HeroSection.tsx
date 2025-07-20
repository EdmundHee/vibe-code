import SignupForm from './SignupForm'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import { Rocket, CheckCircle } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative">
        {/* Container with responsive padding and max-width */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Left Content - Hero Text */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
                <Rocket className="h-4 w-4" />
                Launch Your MVP in 30 Days
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Master{' '}
                  <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Full-Stack Development
                  </span>
                  {' '}with Vibe Coding
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Launch your MVP in 30 days with our intensive, project-based course. 
                  From concept to deployment.
                </p>
              </div>
              
              {/* Feature List */}
              <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Project-Based Learning:</strong> Build real applications, not toy projects
                  </p>
                </div>
                
                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>AI-Powered Guidance:</strong> Get unstuck instantly with personalized help
                  </p>
                </div>
                
                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Deploy to Production:</strong> Learn DevOps and launch your app live
                  </p>
                </div>
              </div>
              
              {/* Feature Grid - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:grid grid-cols-3 gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">30</div>
                  <div className="text-sm text-gray-600">Days to MVP</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-gray-600">AI Support</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-gray-600">Project-Based</div>
                </div>
              </div>
              
              {/* Social Proof - Mobile only */}
              <div className="flex items-center justify-center gap-2 md:hidden pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Join 500+ developers
                </p>
              </div>
            </div>
            
            {/* Right Content - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <ErrorBoundary>
                <SignupForm />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection