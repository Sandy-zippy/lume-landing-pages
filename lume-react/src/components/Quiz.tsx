import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions, getLeadTags } from '@/data/quiz'
import ThankYouOverlay from './ThankYouOverlay'

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/WEBHOOK_ID_HERE'

export default function Quiz() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [phase, setPhase] = useState<'quiz' | 'loading' | 'form' | 'done'>('quiz')
  const [otherText, setOtherText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const currentQ = quizQuestions[step - 1]

  function selectOption(option: string) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: option }))
    setTimeout(() => {
      if (step < 5) {
        setStep((s) => s + 1)
      } else {
        setPhase('loading')
      }
    }, 350)
  }

  function submitOther() {
    if (!otherText.trim()) return
    selectOption(otherText.trim())
    setOtherText('')
  }

  // Loading phase timer
  useEffect(() => {
    if (phase !== 'loading') return
    const t = setTimeout(() => {
      setPhase('form')
      try {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          ;(window as any).fbq('track', 'ViewContent', { content_name: 'LUME Quiz Complete' })
        }
      } catch {}
    }, 2200)
    return () => clearTimeout(t)
  }, [phase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitted) return

    // Validate
    if (!name.trim()) return
    if (!/^\d{10,}$/.test(phone.replace(/\D/g, ''))) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    setSubmitted(true)

    // UTM params
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const v = params.get(key)
      if (v) utm[key] = v
    }

    const tags = getLeadTags(answers)
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      tags,
      quizAnswers: answers,
      ...utm,
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      try {
        localStorage.setItem('lume_quiz_backup', JSON.stringify(payload))
      } catch {}
    }

    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Lead', {
          content_name: 'LUME Eligibility',
          commitment: answers.commitment || '',
        })
      }
    } catch {}

    setPhase('done')
  }

  const [showOtherInput, setShowOtherInput] = useState(false)

  return (
    <section id="quiz" className="py-24 bg-lume-warm">
      <div className="max-w-xl mx-auto px-6">
        {/* Header */}
        {phase === 'quiz' && (
          <div className="text-center mb-12">
            <div className="w-7 h-px bg-lume-red opacity-50 mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl text-lume-charcoal font-normal mb-3">
              Check your <em className="italic text-lume-red">eligibility.</em>
            </h2>
            <p className="text-sm text-lume-soft">
              5 quick questions. Takes under a minute.
            </p>
          </div>
        )}

        {/* Progress bar */}
        {phase === 'quiz' && (
          <div className="h-[3px] bg-lume-border rounded-full mb-10 overflow-hidden">
            <div
              className="h-full bg-lume-red rounded-full"
              style={{
                width: `${(step / 5) * 100}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        )}

        {/* Quiz steps */}
        {phase === 'quiz' && (
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-[10px] font-semibold text-lume-red tracking-[0.14em] uppercase mb-3">
                  Question {step} of 5
                </p>
                <p className="text-lg text-lume-charcoal mb-8">
                  {currentQ.text}
                </p>

                <div className="flex flex-col gap-2.5">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setShowOtherInput(false)
                        selectOption(opt)
                      }}
                      className={`text-left text-sm font-light p-4 border rounded-xl transition-all cursor-pointer ${
                        answers[currentQ.id] === opt
                          ? 'border-lume-red text-lume-red bg-lume-red/[0.04] font-normal'
                          : 'text-lume-text bg-white border-lume-border hover:border-lume-red hover:text-lume-red'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}

                  {/* Other option for step 1 */}
                  {currentQ.hasOther && !showOtherInput && (
                    <button
                      onClick={() => setShowOtherInput(true)}
                      className="text-left text-sm font-light p-4 bg-white border border-lume-border rounded-xl hover:border-lume-red hover:text-lume-red transition-all cursor-pointer text-lume-text"
                    >
                      Other
                    </button>
                  )}

                  {currentQ.hasOther && showOtherInput && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        placeholder="Tell us..."
                        className="flex-1 text-sm p-4 bg-white border border-lume-border rounded-xl focus:border-lume-red focus:outline-none"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && submitOther()}
                      />
                      <button
                        onClick={submitOther}
                        className="text-xs font-medium tracking-[0.08em] uppercase text-white bg-lume-charcoal px-6 rounded-xl hover:bg-lume-red transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>

                {/* Back button */}
                {step > 1 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 text-xs text-lume-muted hover:text-lume-red transition-colors mt-6 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Loading phase */}
        {phase === 'loading' && (
          <div className="text-center py-20">
            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-lume-red"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-lume-soft">Reviewing your profile...</p>
          </div>
        )}

        {/* Form phase */}
        {phase === 'form' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase text-lume-red bg-lume-red/[0.06] px-5 py-2 rounded-full mb-6">
              SHORTLISTED
            </span>
            <h2 className="font-heading text-3xl text-lume-charcoal font-normal mb-3">
              You've been shortlisted.
            </h2>
            <p className="text-sm text-lume-soft mb-10">
              We'd like to learn a little more before your invitation.
            </p>

            <form onSubmit={handleSubmit} className="text-left space-y-6">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm py-4 bg-transparent border-b border-lume-border focus:border-lume-red outline-none transition-colors placeholder:text-lume-muted"
              />
              <input
                type="tel"
                placeholder="WhatsApp number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm py-4 bg-transparent border-b border-lume-border focus:border-lume-red outline-none transition-colors placeholder:text-lume-muted"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm py-4 bg-transparent border-b border-lume-border focus:border-lume-red outline-none transition-colors placeholder:text-lume-muted"
              />

              <button
                type="submit"
                disabled={submitted}
                className="w-full text-[11px] font-semibold tracking-[0.12em] uppercase text-white bg-lume-charcoal rounded-full py-4.5 hover:bg-lume-red transition-colors duration-300 disabled:opacity-50 mt-4 cursor-pointer"
              >
                {submitted ? 'Submitting...' : 'Complete Your Application'}
              </button>

              <p className="text-xs text-lume-muted text-center mt-4">
                Every application reviewed personally. We respond within 48 hours.
              </p>
            </form>
          </motion.div>
        )}

        {/* ThankYou Overlay */}
        <AnimatePresence>
          {phase === 'done' && (
            <ThankYouOverlay
              firstName={name.trim().split(/\s+/)[0]}
              onClose={() => setPhase('quiz')}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
