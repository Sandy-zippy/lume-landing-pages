import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-[400ms] ease-in-out ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <a href="#">
          <img
            src={
              scrolled
                ? '/lume-landing-pages/assets/lume-logo-transparent.png'
                : '/lume-landing-pages/assets/lume-logo-white.png'
            }
            alt="LUME"
            className="h-7 md:h-8 transition-opacity duration-300"
          />
        </a>

        <a
          href="#quiz"
          className={`text-[11px] font-medium tracking-[0.08em] uppercase rounded-full px-7 py-2.5 transition-all duration-300 ${
            scrolled
              ? 'text-lume-charcoal border border-lume-border hover:border-lume-red hover:text-lume-red'
              : 'text-white border border-white/30 hover:border-white/60'
          }`}
        >
          Check Eligibility
        </a>
      </div>
    </nav>
  )
}
