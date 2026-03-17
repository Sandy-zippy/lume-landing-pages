import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { events } from '@/data/events'

function EventCard({ event, index }: { event: (typeof events)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isOdd = index % 2 === 0 // 0-indexed: first card is "odd" layout (image left)
  const slideFrom = isOdd ? -40 : 40

  const imageBlock = (
    <div className="relative rounded-xl overflow-hidden aspect-[3/2] group cursor-pointer">
      <img
        src={event.imageHd || event.image}
        alt={event.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {/* Play button overlay */}
      {event.reelUrl && (
        <a
          href={event.reelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white drop-shadow-lg ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </a>
      )}
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center py-2">
      <p className="text-[10px] font-semibold text-lume-red tracking-[0.14em] uppercase mb-3">
        {event.tag}
      </p>
      <h3 className="font-heading text-xl font-normal text-lume-charcoal mb-3">
        {event.name}
      </h3>
      <p className="text-sm text-lume-soft leading-relaxed mb-4">{event.description}</p>
      {(event.venue || event.facilitator) && (
        <p className="text-xs text-lume-muted mb-4">
          {[event.venue, event.facilitator].filter(Boolean).join(' \u00B7 ')}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {event.vibeTags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-lume-red bg-lume-red/5 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center ${
        !isOdd ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''
      }`}
      initial={{ opacity: 0, x: slideFrom }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {imageBlock}
      {textBlock}
    </motion.div>
  )
}

export default function Experiences() {
  return (
    <section className="py-28 bg-lume-warm">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="text-center mb-20">
          <div className="w-7 h-px bg-lume-red opacity-50 mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-lume-charcoal font-normal mb-4">
            Experiences we've <em className="italic text-lume-red">designed.</em>
          </h2>
          <p className="text-sm text-lume-soft max-w-md mx-auto">
            A glimpse into past LUME evenings. Each one unrepeatable.
          </p>
        </div>

        {/* Event cards */}
        <div className="flex flex-col gap-20 md:gap-24">
          {events.map((event, i) => (
            <EventCard key={event.name} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
