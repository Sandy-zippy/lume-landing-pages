import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', minHeight: 720, backgroundColor: '#1a0000' }}
    >
      {/* Background image */}
      <img
        src="/lume-landing-pages/assets/ig-melody-mingle-hd.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-[640px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-6">
          By Invitation Only
        </p>

        <h1
          className="font-heading text-white font-normal leading-[1.15] mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
        >
          Where Hyderabad's most{' '}
          <em className="italic text-lume-gold">interesting</em> people spend
          their evenings
        </h1>

        <p className="text-white/55 text-sm leading-relaxed mb-10 max-w-[480px] mx-auto">
          Two curated experiences a month. 30 to 50 selected guests. Founders,
          creatives, and cultural leaders only.
        </p>

        <a
          href="#quiz"
          className="inline-block bg-lume-red text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-full px-12 py-5 hover:bg-[#9a0000] transition-colors duration-300"
        >
          Check Your Eligibility
        </a>
      </motion.div>
    </section>
  )
}
