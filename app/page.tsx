import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import LegalTrustSection from '../components/LegalTrustSection'
import ServicesSection from '../components/ServicesSection'
import ProcessSection from '../components/ProcessSection'
import HomeLocationSection from '../components/HomeLocationSection'
import Footer from '../components/Footer'
import HomePageSchema from '../components/HomePageSchema'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <HomePageSchema />
      <Header />
      <HeroSection />
      <AboutSection />
      <LegalTrustSection />
      <ServicesSection />
      <ProcessSection />
      <HomeLocationSection />
      <Footer />
    </main>
  )
}







