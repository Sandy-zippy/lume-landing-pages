import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What exactly is LUME?',
    a: 'LUME is a private, invite-only community that curates intimate cultural experiences for Hyderabad\u2019s founders, creatives, and cultural leaders. Two evenings a month. 30 to 50 selected guests per experience. Think sound baths, art investment evenings, curated open mics, and conversations you won\u2019t find anywhere else in the city.',
  },
  {
    q: 'How is this different from networking events?',
    a: 'LUME is not a networking event. There are no name tags, no elevator pitches, no panel discussions. We curate experiences around culture, art, music, and meaningful conversation. Connections happen naturally when the right people share the right room.',
  },
  {
    q: 'How do you select members?',
    a: 'We look for alignment and taste, not titles. Every application is read by our team. We\u2019re looking for people who value the quality of a room, invest in experiences, and bring something genuine to the community.',
  },
  {
    q: 'What does membership include?',
    a: 'Members get access to all LUME experiences throughout the year, priority invitations, the ability to bring a guest, and entry into a private community of Hyderabad\u2019s most interesting people. Details are shared after you\u2019ve been shortlisted.',
  },
  {
    q: 'Can I attend one experience before committing?',
    a: 'Yes. If you\u2019re shortlisted, we may invite you to attend your first LUME evening before making any commitment. We want the fit to feel right for both sides.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="py-32 bg-white">
      <motion.div
        ref={ref}
        className="max-w-[700px] mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-lume-charcoal font-normal">
            Questions you might <em className="italic text-lume-red">have.</em>
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-lume-border">
              <button
                onClick={() => toggle(i)}
                className="flex justify-between items-center w-full py-7 cursor-pointer group text-left"
              >
                <span className="text-base font-normal text-lume-charcoal group-hover:text-lume-red transition-colors pr-4">
                  {faq.q}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className={`text-lume-muted shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  <line x1="8" y1="3" x2="8" y2="13" />
                  <line x1="3" y1="8" x2="13" y2="8" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-base text-lume-soft leading-[1.8] pb-7">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
