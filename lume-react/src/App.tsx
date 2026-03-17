import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import IdentityFilter from '@/components/IdentityFilter'
import Experiences from '@/components/Experiences'
import ReelGallery from '@/components/ReelGallery'
import People from '@/components/People'
import Process from '@/components/Process'
import Quiz from '@/components/Quiz'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <IdentityFilter />
      {/* Mid CTA */}
      <section className="text-center py-20">
        <p className="font-heading text-xl italic text-lume-soft max-w-[420px] mx-auto mb-8 leading-relaxed">
          The right room changes everything. The question is whether you should
          be in it.
        </p>
        <a
          href="#quiz"
          className="inline-block text-[11px] font-medium tracking-[0.08em] uppercase text-lume-charcoal border border-lume-border rounded-full px-11 py-4 hover:border-lume-red hover:text-lume-red transition-colors"
        >
          Check Your Eligibility
        </a>
      </section>
      <Experiences />
      <ReelGallery />
      <People />
      <Process />
      <Quiz />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
