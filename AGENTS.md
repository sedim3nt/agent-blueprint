# Agent Blueprint Setup — Landing Page

## What to Build
A single-page marketing/sales site for the Agent Blueprint Setup service.

## Offer
- **Product:** Done-with-you 90-minute implementation session
- **Price:** $497 (entry), $997 (premium), $1997 (full deploy)
- **Target:** Solo founders, agency owners, content creators already using AI
- **Delivery:** Personalized multi-agent org chart, prompt packs, handoff templates, cron schedules

## Stack
- Next.js 15 + React 19 + TypeScript + TailwindCSS v4
- Stripe payment links (3 tiers)
- Cal.com or Calendly embed for booking
- Deploy to GitHub Pages

## Design Direction
- Clean, professional, dark theme with accent colors
- SpiritTree brand: Forest Green #2D5016, Mycelium Gold #D4A843, Dark Soil #2C1810
- Typography: Inter for body, bold serif for headlines
- Trust signals: testimonials placeholder, "As seen in" section, before/after comparisons

## Page Sections (single page, scroll)
1. **Hero:** "Stop Using AI Manually. Start Running It." + CTA button
2. **Problem:** "You're spending 10-20 hours/week on tasks AI could do"
3. **Solution:** What you get in 90 minutes (6 deliverables with icons)
4. **Pricing:** 3-tier cards ($497, $997, $1997) with Stripe links
5. **How It Works:** 3-step process (Book → Build → Ship)
6. **FAQ:** 6-8 common questions
7. **Social Proof:** Placeholder for testimonials
8. **Final CTA:** "Book Your Blueprint Session" → Stripe/Calendly

## Stripe Integration
- Use existing Stripe keys from env
- Create 3 payment links (or use Stripe Checkout)
- STRIPE_PUBLISHABLE_KEY: pk_live_51T7SdT3mPzsVWwtAkU4V4Se4SbxUV2QKX1PT6ZQ4Xlphu14u906zKfzyzeWzVyYkaXRCl2bgDDDcrTzkn1pswPbk00O6jCfqkI
