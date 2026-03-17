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
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: 720, background: '#f8f6f3' }}
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

      {/* Subtle red particles */}
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

      {/* Gold radial glow behind center content */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: 800,
          height: 600,
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(201,169,98,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Decorative gold lines */}
      <motion.div
        className="absolute z-[1] h-px"
        style={{
          width: '45vw',
          top: '26%',
          left: '27%',
          background: 'linear-gradient(90deg, transparent, rgba(201,169,98,0.2), transparent)',
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute z-[1] h-px"
        style={{
          width: '30vw',
          top: '74%',
          left: '35%',
          background: 'linear-gradient(90deg, transparent, rgba(201,169,98,0.12), transparent)',
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1.8, ease: 'easeOut' }}
      />

      {/* Main layout — two-row: content top, statues bottom */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">

        {/* Text content — centered, above statues */}
        <motion.div
          className="text-center max-w-[640px] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tag */}
          <motion.p
            className="text-[10px] font-medium tracking-[0.35em] uppercase mb-8"
            style={{ color: 'rgba(196,30,58,0.6)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            By Invitation Only
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-heading font-normal leading-[1.15] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: '#1a1a1a', letterSpacing: '-0.5px' }}
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
            className="text-[15px] font-light leading-[1.85] mb-10 max-w-[440px] mx-auto"
            style={{ color: '#6B6B6B' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Two curated experiences a month. 30 to 50 selected guests. Founders, creatives, and cultural leaders only.
          </motion.p>

          {/* CTA */}
          <motion.div
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
        </motion.div>

        {/* Greek statues — the hero visual */}
        <motion.div
          className="relative flex items-end justify-center"
          style={{ maxWidth: 600, width: '100%' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        >
          {/* Glow behind statues */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: 500,
              height: 300,
              background: 'radial-gradient(ellipse at bottom, rgba(201,169,98,0.1) 0%, transparent 70%)',
            }}
          />
          <img
            src="/assets/statue-hires.png"
            alt="Two philosophers in conversation"
            className="relative w-full max-h-[35vh] object-contain object-bottom"
            style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.08))' }}
          />
        </motion.div>

        {/* Stats bar — bottom of hero */}
        <motion.div
          className="flex justify-center gap-14 mt-6 pt-6"
          style={{ borderTop: '1px solid rgba(201,169,98,0.15)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-center">
            <div className="font-heading text-2xl" style={{ color: '#C41E3A' }}>
              <CountUp target={15} suffix="+" />
            </div>
            <div className="text-[10px] tracking-[0.06em] mt-1" style={{ color: '#9E9E9E' }}>Experiences</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl" style={{ color: '#C41E3A' }}>
              <CountUp target={200} suffix="+" />
            </div>
            <div className="text-[10px] tracking-[0.06em] mt-1" style={{ color: '#9E9E9E' }}>Guests hosted</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl" style={{ color: '#C41E3A' }}>
              <CountUp target={4} />
            </div>
            <div className="text-[10px] tracking-[0.06em] mt-1" style={{ color: '#9E9E9E' }}>Houses</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-[2]"
        style={{ background: 'linear-gradient(to bottom, transparent, #fff)' }}
      />
    </section>
  )
}
