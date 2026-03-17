import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="text-center py-24 bg-lume-warm">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-heading text-2xl text-lume-charcoal font-normal">
          The next experience is being <em className="italic text-lume-red">designed.</em>
        </h2>
        <p className="text-sm text-lume-soft mt-4">
          If you belong in the room, we'll find you.
        </p>
        <a
          href="#quiz"
          className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-white bg-lume-red rounded-full px-11 py-4 mt-8 hover:bg-lume-red-soft transition-colors"
        >
          Check Your Eligibility
        </a>
      </motion.div>
    </section>
  )
}
