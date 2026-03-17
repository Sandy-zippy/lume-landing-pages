import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
// StatsBar removed — stats now integrated into Hero
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
      <IdentityFilter />
      {/* Mid CTA */}
      <section className="text-center py-24">
        <p className="font-heading text-2xl md:text-3xl italic text-lume-soft max-w-[500px] mx-auto mb-10 leading-relaxed">
          The right room changes everything. The question is whether you should
          be in it.
        </p>
        <a
          href="#quiz"
          className="inline-block text-sm font-medium tracking-[0.08em] uppercase text-lume-charcoal border border-lume-border rounded-full px-11 py-4 hover:border-lume-red hover:text-lume-red transition-colors"
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
