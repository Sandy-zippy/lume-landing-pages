import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="text-center py-28 bg-lume-warm">
      <motion.div
        ref={ref}
        className="max-w-xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-heading text-3xl md:text-4xl text-lume-charcoal font-normal mb-5">
          The next experience is being <em className="italic text-lume-red">designed.</em>
        </h2>
        <p className="text-base text-lume-soft leading-relaxed mb-8">
          If you belong in the room, we'll find you. Start with the eligibility check.
        </p>
        <a
          href="#quiz"
          className="inline-block text-sm font-semibold tracking-[0.1em] uppercase text-white bg-lume-red rounded-full px-12 py-5 hover:bg-lume-red-soft transition-colors"
        >
          Check Your Eligibility
        </a>
      </motion.div>
    </section>
  )
}
