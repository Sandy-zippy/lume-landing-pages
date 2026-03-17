import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { reels } from '@/data/events'
import { brand } from '@/data/brand'

function extractReelId(url: string) {
  const match = url.match(/\/reel\/([^/]+)/)
  return match ? match[1] : ''
}

export default function ReelGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const topReels = reels.slice(0, 3)

  return (
    <section className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="w-7 h-px bg-lume-red opacity-50 mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-lume-charcoal font-normal">
            Real rooms. <em className="italic text-lume-red">Real people.</em>
          </h2>
        </div>

        {/* Reel grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
          {topReels.map((reel, i) => (
            <motion.div
              key={reel.url}
              className="rounded-xl overflow-hidden aspect-[9/16] max-h-[500px] bg-lume-warm"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
            >
              <iframe
                src={`https://www.instagram.com/reel/${extractReelId(reel.url)}/embed/`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                allowFullScreen
                title={reel.label}
              />
            </motion.div>
          ))}
        </div>

        {/* Instagram link */}
        <div className="text-center">
          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-lume-red hover:underline"
          >
            Watch more &mdash; {brand.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}
