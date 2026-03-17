import { useRef } from 'react'
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

  const topReels = reels.slice(0, 3)

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-7 h-px bg-lume-red opacity-50 mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl text-lume-charcoal font-normal mb-4">
            Real rooms. <em className="italic text-lume-red">Real people.</em>
          </h2>
          <p className="text-base text-lume-soft max-w-lg mx-auto leading-relaxed">
            Watch what happens when the right people share the right room. Straight from our Instagram.
          </p>
        </div>

        {/* Reel grid — use blockquote embeds instead of iframes to avoid overlap */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-12"
        >
          {topReels.map((reel, i) => (
            <motion.div
              key={reel.url}
              className="rounded-2xl overflow-hidden bg-lume-warm border border-lume-border"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
            >
              {/* Thumbnail + play link instead of iframe embed */}
              <a
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="aspect-[4/5] bg-lume-warm flex items-center justify-center overflow-hidden">
                  <iframe
                    src={`https://www.instagram.com/reel/${extractReelId(reel.url)}/embed/captioned/`}
                    className="w-full border-0"
                    style={{ height: '100%', minHeight: 500, overflow: 'hidden' }}
                    scrolling="no"
                    allowTransparency
                    title={reel.label}
                  />
                </div>
              </a>
              <div className="p-5">
                <p className="text-sm font-medium text-lume-charcoal">{reel.label}</p>
                {reel.views && (
                  <p className="text-xs text-lume-muted mt-1">{reel.views} views</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram link */}
        <div className="text-center">
          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-lume-red border border-lume-red/20 rounded-full px-8 py-3 hover:bg-lume-red/5 transition-colors"
          >
            Follow {brand.instagramHandle} on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
