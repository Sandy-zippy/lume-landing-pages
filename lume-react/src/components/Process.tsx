import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Tell us about yourself',
    desc: 'A short eligibility check. What draws you, what you value, and what kind of room you\u2019re looking for.',
  },
  {
    num: '02',
    title: 'We review personally',
    desc: 'Every submission is read by our team. If there\u2019s alignment, we reach out within 48 hours.',
  },
  {
    num: '03',
    title: 'Your first evening',
    desc: 'If invited, join your first LUME experience. Feel the room. Meet the people. Then decide if this is where you belong.',
  },
]

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-28 bg-lume-charcoal">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="w-7 h-px bg-white/20 mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-white font-normal mb-4">
            How you get <em className="italic text-lume-gold">invited.</em>
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto">
            We don't sell tickets. We don't do open registration. Access is
            through application.
          </p>
        </div>

        {/* Steps grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.12,
                ease: 'easeOut',
              }}
            >
              <span className="font-heading text-5xl text-white/[0.06] absolute top-5 right-6 select-none">
                {step.num}
              </span>
              <h3 className="text-white font-medium text-base mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
