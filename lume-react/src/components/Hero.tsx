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
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', minHeight: 720, background: '#f8f6f3' }}
    >
      {/* Background image — subtle, faded into cream */}
      <div className="absolute inset-0">
        <img
          src="/assets/ig-melody-mingle-hd.jpg"
          alt=""
          className="w-full h-full object-cover object-[center_20%]"
          style={{ opacity: 0.12, filter: 'saturate(0.4) brightness(1.1)' }}
        />
      </div>

      {/* Warm cream overlay for softness */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(248,246,243,0.6) 0%, rgba(248,246,243,0.85) 60%, rgba(248,246,243,0.95) 100%)',
        }}
      />

      {/* Magic UI Particles — gold floating dots that follow cursor */}
      <Particles
        className="absolute inset-0"
        quantity={60}
        staticity={30}
        ease={80}
        size={1.2}
        color="#C9A962"
        vx={0}
        vy={-0.05}
      />

      {/* Subtle red particles for depth */}
      <Particles
        className="absolute inset-0"
        quantity={20}
        staticity={60}
        ease={100}
        size={0.6}
        color="#C41E3A"
        vx={0}
        vy={0.02}
      />

      {/* Gold radial glow center */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          left: '50%',
          top: '45%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201,169,98,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Decorative gold lines */}
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-lume-gold/20 to-transparent"
        style={{ width: '50vw', top: '28%', left: '25%' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-lume-gold/15 to-transparent"
        style={{ width: '35vw', top: '72%', left: '32%' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1.6, ease: 'easeOut' }}
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
          className="text-[10px] tracking-[0.35em] uppercase mb-10"
          style={{ color: '#C41E3A', opacity: 0.6 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          By Invitation Only
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-heading font-normal leading-[1.18] mb-7"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#1a1a1a' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          Where Hyderabad's most{' '}
          <em className="italic" style={{ color: '#C41E3A' }}>interesting</em>{' '}
          people spend their evenings
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-[15px] font-light leading-[1.9] mb-12 max-w-[460px] mx-auto"
          style={{ color: '#6B6B6B' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Two curated experiences a month. 30 to 50 selected guests. Founders, creatives, and cultural leaders only.
        </motion.p>

        {/* CTA — Shimmer Button */}
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

        {/* Stats below CTA */}
        <motion.div
          className="flex justify-center gap-12 mt-16 pt-10"
          style={{ borderTop: '1px solid rgba(201,169,98,0.15)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-center">
            <div className="font-heading text-2xl" style={{ color: '#C41E3A' }}>
              <CountUp target={15} suffix="+" />
            </div>
            <div className="text-[10px] tracking-wide mt-1" style={{ color: '#9E9E9E' }}>Experiences</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl" style={{ color: '#C41E3A' }}>
              <CountUp target={200} suffix="+" />
            </div>
            <div className="text-[10px] tracking-wide mt-1" style={{ color: '#9E9E9E' }}>Guests hosted</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl" style={{ color: '#C41E3A' }}>
              <CountUp target={4} />
            </div>
            <div className="text-[10px] tracking-wide mt-1" style={{ color: '#9E9E9E' }}>Houses</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, #fff)' }}
      />
    </section>
  )
}
