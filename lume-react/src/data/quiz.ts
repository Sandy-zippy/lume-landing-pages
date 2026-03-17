export interface QuizQuestion {
  id: string
  number: string
  text: string
  options: string[]
  hasOther?: boolean
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'profile',
    number: '01',
    text: 'What best describes you?',
    options: ['Founder / Business Owner', 'Senior Executive / CXO', 'Creative Professional', 'Consultant / Advisor', 'Artist / Cultural Practitioner'],
    hasOther: true,
  },
  {
    id: 'evening',
    number: '02',
    text: 'What kind of evenings do you gravitate toward?',
    options: ['Cultural and artistic', 'Intellectual and conversational', 'Social and high-energy', 'Wellness and introspective'],
  },
  {
    id: 'discovery',
    number: '03',
    text: 'How do you typically discover new experiences?',
    options: ['Curated invitations and personal recommendations', 'Social media and content', 'Friends and professional circles', 'I seek them out myself'],
  },
  {
    id: 'values',
    number: '04',
    text: 'When it comes to experiences, what matters most?',
    options: ['The quality of people in the room', 'Exclusivity and curation', 'Learning something new', 'The atmosphere and setting'],
  },
  {
    id: 'commitment',
    number: '05',
    text: 'LUME is an annual commitment to curated experiences. How does that sit with you?',
    options: ['I regularly invest in premium experiences', "I'm open to it if the fit is right", "I'd like to attend as a guest first", "I'm just exploring for now"],
  },
]

export function getLeadTags(answers: Record<string, string>): string[] {
  const base = ['lume-eligibility', 'fb-lead', 'mar-2026']
  const commitment = answers.commitment || ''
  if (commitment === 'I regularly invest in premium experiences') return [...base, 'high-intent', 'premium-ready']
  if (commitment === "I'm open to it if the fit is right") return [...base, 'warm-lead']
  return [...base, 'nurture']
}
