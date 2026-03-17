import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { brand } from '@/data/brand'

export default function People() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Top: archetypes */}
        <div className="text-center mb-20">
          <div className="w-7 h-px bg-lume-red opacity-50 mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl text-lume-charcoal font-normal mb-6">
            The people <em className="italic text-lume-red">in the room.</em>
          </h2>
          <p className="text-base text-lume-soft max-w-xl mx-auto leading-[1.8] mb-12">
            Founders building something real. Creative directors shaping culture.
            Operators who choose their rooms carefully. People who hold their
            evenings to the same standard as their work.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {brand.archetypes.map((a) => (
              <span
                key={a}
                className="text-sm px-6 py-3 border border-lume-border rounded-full text-lume-charcoal hover:border-lume-red hover:text-lume-red transition-colors cursor-default"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Four Houses */}
        <div className="mt-20" ref={ref}>
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.14em] uppercase text-lume-red font-semibold mb-4">
              THE FOUR HOUSES
            </p>
            <p className="text-base text-lume-soft max-w-lg mx-auto leading-relaxed">
              Members are sorted into four houses inspired by historic Indian
              dynasties. Houses earn points through participation in events,
              challenges, and artistic showcases.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {brand.houses.map((house, i) => (
              <motion.div
                key={house.name}
                className="bg-white/80 backdrop-blur-sm border border-lume-border rounded-2xl p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <h3 className="font-heading text-xl text-lume-charcoal mb-3">
                  {house.name}
                </h3>
                <p className="text-sm text-lume-soft leading-relaxed">{house.traits}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
