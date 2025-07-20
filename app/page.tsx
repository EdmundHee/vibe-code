import HeroSection from '@/components/sections/HeroSection'

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Vibe Coding",
            "description": "Launch your MVP in 30 days with our intensive, project-based course. From concept to deployment.",
            "url": "https://vibecoding.com",
            "logo": "https://vibecoding.com/logo.png",
            "sameAs": [
              "https://twitter.com/vibecoding",
              "https://github.com/vibecoding"
            ],
            "offers": {
              "@type": "Course",
              "name": "Master Full-Stack Development",
              "description": "30-day intensive, project-based full-stack development course",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "Vibe Coding"
              },
              "educationalLevel": "Beginner to Advanced",
              "timeRequired": "P30D",
              "teaches": [
                "Full-Stack Development",
                "MVP Development",
                "Project-Based Learning",
                "AI-Powered Guidance",
                "DevOps and Deployment"
              ]
            }
          })
        }}
      />
      
      <main className="min-h-screen">
        <HeroSection />
      </main>
    </>
  );
}