import { motion } from 'framer-motion'

interface Props {
  firstName: string
  onClose: () => void
}

export default function ThankYouOverlay({ firstName, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-lume-warm/97 backdrop-blur-xl flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <motion.div
        className="text-center px-8 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/assets/lume-logo-transparent.png"
          alt="LUME"
          className="h-6 mx-auto mb-10 opacity-50"
        />

        <h2 className="font-heading text-3xl md:text-4xl text-lume-charcoal font-normal mb-4">
          Thank you, {firstName}.
        </h2>
        <p className="text-sm text-lume-soft leading-relaxed mb-10">
          Your application has been received. We'll review it personally and
          reach out within 48 hours if there's alignment.
        </p>

        <a
          href="https://instagram.com/lumeproject_offl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-white bg-lume-red rounded-full px-11 py-4 hover:bg-lume-red-soft transition-colors"
        >
          Follow @lumeproject_offl
        </a>
      </motion.div>
    </motion.div>
  )
}
