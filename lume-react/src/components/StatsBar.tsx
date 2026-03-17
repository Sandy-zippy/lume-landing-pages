import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '@/data/events'

function AnimatedStat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [displayed, setDisplayed] = useState(value)

  useEffect(() => {
    if (!isInView) return

    // Extract numeric part for animation
    const match = value.match(/^(\d+)(.*)$/)
    if (!match) {
      setDisplayed(value)
      return
    }

    const target = parseInt(match[1], 10)
    const suffix = match[2] // e.g. "+" or "-50"
    const duration = 800
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = Math.round(eased * target)
      setDisplayed(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  const isLast = index === stats.length - 1

  return (
    <div
      ref={ref}
      className={`text-center py-8 px-4 ${!isLast ? 'border-r border-white/5' : ''}`}
    >
      <motion.span
        className="font-heading text-white text-3xl block"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {displayed}
      </motion.span>
      <span className="text-[11px] text-white/40 tracking-[0.08em] uppercase mt-1 block">
        {label}
      </span>
    </div>
  )
}

export default function StatsBar() {
  return (
    <section className="bg-black">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} index={i} />
        ))}
      </div>
    </section>
  )
}
