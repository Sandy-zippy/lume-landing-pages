import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Particles } from '@/components/ui/particles'
import { ShimmerButton } from '@/components/ui/shimmer-button'

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
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: '100vh', background: '#f8f6f3' }}
    >
      {/* Magic UI Particles — gold, mouse-reactive */}
      <Particles
        className="absolute inset-0 z-[1]"
        quantity={50}
        staticity={30}
        ease={80}
        size={1.2}
        color="#C9A962"
        vx={0}
        vy={-0.03}
      />
      <Particles
        className="absolute inset-0 z-[1]"
        quantity={15}
        staticity={60}
        ease={100}
        size={0.5}
        color="#C41E3A"
        vx={0}
        vy={0.02}
      />

      {/* Gold radial glow */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: 800,
          height: 500,
          left: '50%',
          top: '35%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(201,169,98,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Decorative gold lines */}
      <motion.div
        className="absolute z-[1] h-px"
        style={{ width: '45vw', top: '22%', left: '27%', background: 'linear-gradient(90deg, transparent, rgba(201,169,98,0.18), transparent)' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1.2, ease: 'easeOut' }}
      />

      {/* Top spacer for nav */}
      <div className="h-20 shrink-0" />

      {/* Content area — flex grow, centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">

        {/* Tag */}
        <motion.p
          className="text-[10px] font-medium tracking-[0.35em] uppercase mb-6 text-center"
          style={{ color: 'rgba(196,30,58,0.55)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          By Invitation Only
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-heading font-normal leading-[1.15] mb-5 text-center max-w-[620px]"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: '#1a1a1a', letterSpacing: '-0.5px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          Where Hyderabad's most{' '}
          <em className="italic" style={{ color: '#C41E3A' }}>interesting</em>{' '}
          people spend their evenings
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[15px] font-light leading-[1.85] mb-8 max-w-[440px] text-center"
          style={{ color: '#6B6B6B' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Two curated experiences a month. 30 to 50 selected guests. Founders, creatives, and cultural leaders only.
        </motion.p>

        {/* CTA — centered */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a href="#quiz">
            <ShimmerButton
              shimmerColor="#C9A962"
              shimmerSize="0.08em"
              shimmerDuration="2.5s"
              borderRadius="100px"
              background="rgba(196, 30, 58, 1)"
              className="px-14 py-5 text-[11px] font-semibold tracking-[0.12em] uppercase"
            >
              Check Your Eligibility
            </ShimmerButton>
          </a>
        </motion.div>

        {/* Greek statues — hero visual, anchored to bottom area */}
        <motion.div
          className="relative flex items-end justify-center"
          style={{ maxWidth: 520, width: '100%' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        >
          {/* Gold glow behind statues */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: 450,
              height: 250,
              background: 'radial-gradient(ellipse at bottom, rgba(201,169,98,0.1) 0%, transparent 65%)',
            }}
          />
          <img
            src="/assets/statue-hires.png"
            alt="Two philosophers in conversation"
            className="relative w-full object-contain object-bottom"
            style={{ maxHeight: '28vh', filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.06))' }}
          />
        </motion.div>
      </div>

      {/* Stats bar at bottom */}
      <motion.div
        className="relative z-10 flex justify-center gap-14 py-6 mx-auto"
        style={{ borderTop: '1px solid rgba(201,169,98,0.15)', maxWidth: 480, width: '100%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="text-center">
          <div className="font-heading text-xl" style={{ color: '#C41E3A' }}>
            <CountUp target={15} suffix="+" />
          </div>
          <div className="text-[10px] tracking-[0.06em] mt-1" style={{ color: '#9E9E9E' }}>Experiences</div>
        </div>
        <div className="text-center">
          <div className="font-heading text-xl" style={{ color: '#C41E3A' }}>
            <CountUp target={200} suffix="+" />
          </div>
          <div className="text-[10px] tracking-[0.06em] mt-1" style={{ color: '#9E9E9E' }}>Guests hosted</div>
        </div>
        <div className="text-center">
          <div className="font-heading text-xl" style={{ color: '#C41E3A' }}>
            <CountUp target={4} />
          </div>
          <div className="text-[10px] tracking-[0.06em] mt-1" style={{ color: '#9E9E9E' }}>Houses</div>
        </div>
      </motion.div>

      {/* Bottom pad */}
      <div className="h-6 shrink-0" />

      {/* Fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 z-[2]"
        style={{ background: 'linear-gradient(to bottom, transparent, #fff)' }}
      />
    </section>
  )
}
