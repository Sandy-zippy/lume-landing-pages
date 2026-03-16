# LUME Quiz Landing Page — Design Spec

**Date:** 2026-03-16
**Status:** Approved
**File:** `membership.html` (replaces current V9)

## Problem

Current membership.html is broken for paid acquisition:
1. Hero background (red studio photo) cuts off hard against white — no blending
2. Page is too long — cold Meta traffic bounces before reaching the form
3. Headline is mood copy ("Some rooms you feel...") that assumes awareness
4. Form is a basic application, not a qualification funnel
5. No psychological investment or lead scoring
6. No separation between selection and pricing (BusinessMint model)

## Solution: Short Lander + Multi-Step Quiz

Strip page to 3 sections: Hero → Social Proof Strip → Quiz Funnel.
Remove all editorial content (experience cards, reels, people tags, process steps).
Quiz IS the page. Everything earns its scroll.

## Traffic Source

Cold Meta (Facebook/Instagram) ads. Zero prior LUME awareness.

## Conversion Flow

```
Ad click → Hero (3s clarity) → Social proof (credibility) → Quiz (5 steps)
→ "Reviewing..." animation → "You've been shortlisted" → Contact capture
→ Webhook to GHL + FB Pixel Lead → Team follows up with pricing via WhatsApp/email
```

Pricing (1,18,000/year) is NEVER shown on-page. Delivered separately after "selection."

## Page Structure

### 1. Nav
- Fixed, transparent over hero, solid white on scroll (dual-logo system preserved)
- CTA: "Check Your Eligibility" → scrolls to quiz

### 2. Hero
- Full viewport, `ig-melody-mingle-hd.jpg` background
- **Gradient fix:** Bottom fades to `#F7F5F2` (warm) not white — eliminates hard cutoff
- Gradient: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.15) 60%, rgba(247,245,242,0.95) 92%, #F7F5F2 100%)`
- Tag: "By Invitation Only"
- H1: "Hyderabad's most interesting people. One room. Two evenings a month."
- Sub: "An invite-only community of founders, creatives, and cultural leaders. 30 to 50 selected guests per experience."
- CTA button: "Check Your Eligibility"

### 3. Social Proof Strip
- Background: `#F7F5F2` (seamless from hero gradient)
- 3 compact cards in a row, each showing:
  - Event thumbnail (small, rounded)
  - Event name
  - Guest count
- Summary line: "3 experiences. 110 selected guests. Every evening unrepeatable."
- Compact — max 200px visible height

### 4. Quiz Funnel (5 Steps)
- Background: white
- Progress bar at top (red, animated, 20% per step)
- Each step: single question, animated slide transition (left-to-right)
- Question cards centered, max-width 520px

**Step 1 — Profile (easy opener)**
"What best describes you?"
- Founder / Business Owner
- Senior Executive / CXO
- Creative Professional
- Consultant / Advisor
- Artist / Cultural Practitioner
- Other

**Step 2 — Taste**
"What kind of evenings do you gravitate toward?"
- Cultural and artistic
- Intellectual and conversational
- Social and high-energy
- Wellness and introspective

**Step 3 — Discovery**
"How do you typically discover new experiences?"
- Curated invitations and personal recommendations
- Social media and content
- Friends and professional circles
- I seek them out myself

**Step 4 — Values**
"When it comes to experiences, what matters most?"
- The quality of people in the room
- Exclusivity and curation
- Learning something new
- The atmosphere and setting

**Step 5 — Commitment (THE filter)**
"LUME is an annual commitment to curated experiences. How does that sit with you?"
- I regularly invest in premium experiences → tag: `high-intent`, `premium-ready`
- I'm open to it if the fit is right → tag: `warm-lead`
- I'd like to attend as a guest first → tag: `nurture`
- I'm just exploring for now → tag: `nurture`

### 5. Post-Quiz: Selection + Contact Capture
- 2-second loading animation: "Reviewing your profile..." (spinner or progress dots)
- Reveal: "You've been shortlisted."
- Sub: "We'd like to learn a little more before your invitation."
- Fields: Full name, WhatsApp number, Email
- Button: "Complete Your Application"
- On submit:
  - POST to GHL webhook with all quiz answers + contact info + tags
  - Fire `fbq('track', 'Lead', { content_name: 'LUME Eligibility', commitment: q5_answer })`
  - Show thank-you overlay: "Thank you, [first name]. We'll be in touch within 48 hours."

### 6. Footer
- Minimal: LUME logo, Instagram link, copyright
- No other content

## Lead Scoring Logic

| Q5 Answer | Tags | Priority |
|-----------|------|----------|
| "I regularly invest in premium experiences" | `high-intent`, `premium-ready` | P1 — immediate WhatsApp |
| "I'm open to it if the fit is right" | `warm-lead` | P2 — email within 24h |
| "I'd like to attend as a guest first" | `nurture` | P3 — nurture sequence |
| "I'm just exploring for now" | `nurture` | P3 — nurture sequence |

All leads also tagged: `lume-eligibility`, `fb-lead`, `mar-2026`

## Design System

- Font: Poppins (already loaded)
- Colors: `--red: #B80000`, `--warm: #F7F5F2`, `--charcoal: #1C1C1C`, `--white: #FFFFFF`
- Border radius: 16px cards, 100px buttons
- Animations: Slide transitions between quiz steps, reveal on scroll for social proof
- Mobile-first responsive

## What Gets Removed

- Experience editorial cards (3 large sections)
- Reels gallery (9:16 video thumbnails)
- "People in the room" tags section
- "How you get invited" 3-step process
- Current basic application form

All that content belongs on thelumeproject.com, not the paid acquisition lander.

## Webhook Payload

```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "quiz_answers": {
    "profile": "string",
    "evening_type": "string",
    "discovery": "string",
    "values": "string",
    "commitment": "string"
  },
  "tags": ["lume-eligibility", "fb-lead", "mar-2026", "high-intent|warm-lead|nurture"],
  "form": "lume-eligibility-quiz",
  "source": "meta-ads"
}
```

## Meta Pixel Events

- `PageView` on load
- `ViewContent` when quiz starts (step 1)
- `Lead` on form submit with commitment level
