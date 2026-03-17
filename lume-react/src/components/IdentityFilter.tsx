import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const forYou = [
  'You value the quality of a room over the size of a guest list',
  'You seek cultural experiences that genuinely surprise you',
  'You care deeply about who you spend your evenings with',
  "You've outgrown what Hyderabad currently offers socially",
  'You invest in experiences that match your standards',
]

const notForYou = [
  'You prefer large-scale public events',
  'You measure evenings by contacts made',
  'You want something casual and open to everyone',
  "You're not ready to commit to a curated community",
  'You prioritize cost over quality of experience',
]

export default function IdentityFilter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 md:px-10 max-w-5xl mx-auto" ref={ref}>
      {/* Title */}
      <div className="text-center mb-16">
        <div className="w-7 h-px bg-lume-red opacity-50 mx-auto mb-6" />
        <h2 className="font-heading text-3xl md:text-4xl text-lume-charcoal font-normal">
          Before you scroll <em className="italic text-lume-red">further.</em>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For you */}
        <motion.div
          className="bg-white rounded-2xl border border-lume-red/10 px-10 py-12 md:px-12"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-lume-red font-semibold mb-8">
            This is for you if
          </p>
          <ul>
            {forYou.map((item, i) => (
              <li
                key={i}
                className={`text-sm text-lume-charcoal leading-relaxed py-4 ${
                  i < forYou.length - 1 ? 'border-b border-lume-border' : ''
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Not for you */}
        <motion.div
          className="bg-lume-warm rounded-2xl border border-lume-border px-10 py-12 md:px-12"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-lume-faint font-semibold mb-8">
            This is not for you if
          </p>
          <ul>
            {notForYou.map((item, i) => (
              <li
                key={i}
                className={`text-sm text-lume-muted leading-relaxed py-4 ${
                  i < notForYou.length - 1 ? 'border-b border-lume-border' : ''
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
