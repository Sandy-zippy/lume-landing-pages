import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

function FloatingOrb({ delay, size, x, y, duration }: { delay: number; size: number; x: string; y: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, rgba(201,169,98,0.15) 0%, rgba(201,169,98,0) 70%)`,
        filter: 'blur(1px)',
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function AnimatedLine({ delay, width }: { delay: number; width: string }) {
  return (
    <motion.div
      className="absolute h-px bg-gradient-to-r from-transparent via-lume-gold/20 to-transparent"
      style={{ width, left: '50%', transform: 'translateX(-50%)' }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
    />
  )
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const val = useMotionValue(0)
  const display = useTransform(val, (v) => Math.round(v).toString())

  useEffect(() => {
    const controls = animate(val, target, { duration: 2, ease: 'easeOut' })
    return controls.stop
  }, [target, val])

  useEffect(() => {
    const unsub = display.on('change', (v) => {
      if (ref.current) ref.current.textContent = v + suffix
    })
    return unsub
  }, [display, suffix])

  return <span ref={ref}>0{suffix}</span>
}


export default function Hero() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', minHeight: 720, background: 'linear-gradient(180deg, #0a0a0a 0%, #111 40%, #0d0b08 100%)' }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb delay={0} size={200} x="15%" y="20%" duration={8} />
      <FloatingOrb delay={1.5} size={140} x="75%" y="15%" duration={10} />
      <FloatingOrb delay={0.8} size={100} x="60%" y="65%" duration={7} />
      <FloatingOrb delay={2} size={180} x="25%" y="70%" duration={9} />
      <FloatingOrb delay={0.5} size={120} x="85%" y="50%" duration={11} />
      <FloatingOrb delay={1} size={80} x="40%" y="30%" duration={6} />

      {/* Decorative lines */}
      <div className="absolute top-[30%]"><AnimatedLine delay={1} width="60vw" /></div>
      <div className="absolute top-[70%]"><AnimatedLine delay={1.5} width="40vw" /></div>

      {/* Radial glow behind text */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          left: '50%',
          top: '45%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201,169,98,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-[680px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Tag */}
        <motion.p
          className="text-lume-gold/50 text-[10px] tracking-[0.35em] uppercase mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          By Invitation Only
        </motion.p>

        {/* Main heading with staggered words */}
        <motion.h1
          className="font-heading text-white font-normal leading-[1.18] mb-7"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          Where Hyderabad's most{' '}
          <em className="italic text-lume-gold">interesting</em>{' '}
          people spend their evenings
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-white/40 text-[15px] font-light leading-[1.9] mb-12 max-w-[460px] mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Two curated experiences a month. 30 to 50 selected guests. Founders, creatives, and cultural leaders only.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#quiz"
          className="inline-block bg-lume-red text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-full px-14 py-5 transition-all duration-300 hover:bg-[#9a0000] hover:-translate-y-0.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Check Your Eligibility
        </motion.a>

        {/* Stats below CTA */}
        <motion.div
          className="flex justify-center gap-12 mt-16 pt-10 border-t border-white/[0.06]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-center">
            <div className="font-heading text-2xl text-white/80"><CountUp target={15} suffix="+" /></div>
            <div className="text-[10px] text-white/25 tracking-wide mt-1">Experiences</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl text-white/80"><CountUp target={200} suffix="+" /></div>
            <div className="text-[10px] text-white/25 tracking-wide mt-1">Guests hosted</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl text-white/80"><CountUp target={4} /></div>
            <div className="text-[10px] text-white/25 tracking-wide mt-1">Houses</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, #000)' }}
      />
    </section>
  )
}
