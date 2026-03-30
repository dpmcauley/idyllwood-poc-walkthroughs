# Idyllwood Lab — PoC Walkthroughs

**Subdomain:** `walkthroughs.idyllwoodlab.com`  
**Status:** In Development  
**Stack:** Next.js App Router + TypeScript + Tailwind CSS  
**Deployment:** Vercel (separate project from Hub)  
**Database:** None (frontend-only)  

---

## Project Purpose

Interactive HTML walkthroughs demonstrating real-world Claude Cowork automation workflows. Three proof-of-concept scenarios targeting dual audiences:
- **Tier 1:** Non-technical professionals (business users, decision-makers)
- **Tier 2:** Hands-on AI practitioners (engineers, automation enthusiasts)

Each PoC is a 7-screen walkthrough with emotional hooks, transformations, and CTAs to consulting engagement.

---

## PoCs Included

1. **Mistakes Over, Now What?** (`/demos/mistakes-over`)
   - Transform meeting transcripts into actionable summaries
   - MCP: Granola MCP, Supabase, decision ledger

2. **Your Day in 60 Seconds** (`/demos/your-day-60`)
   - Consolidate 6 apps into one morning briefing
   - MCP: Dispatch, Gmail, Slack, Asana, Notion

3. **Receipt Box** (`/demos/receipt-box`)
   - Turn receipt photos into spreadsheet entries
   - MCP: Vision API, Google Sheets, expense categorization

---

## Architecture

### File Structure
```
src/
  app/
    page.tsx                    # Gallery landing (all 3 PoCs as cards)
    demos/[slug]/page.tsx       # Individual PoC walkthrough
    layout.tsx                  # Header + GA4 setup
    globals.css                 # Brand styles + glassmorphism
  components/
    Header.tsx                  # Sticky header with "The Lab" back link
    PoCStepper.tsx              # Narrative stepper — hook, visual, pill, CTA
    ScreenVisual.tsx            # 21 visual panels keyed by slug + screenIndex
    PoCCard.tsx                 # Gallery card component
  data/
    walkthroughs.ts             # PoC data model (config-driven)
```

### Data Model

All three PoCs are defined in `src/data/walkthroughs.ts` as a config object. This design allows easy addition of 4th/5th PoCs without code changes—just extend the object.

---

## Routing

| Route | Component | Purpose |
|---|---|---|
| `/` | `page.tsx` | Gallery landing page (all 3 PoC cards) |
| `/demos/mistakes-over` | `[slug]/page.tsx` | Mistakes Over walkthrough |
| `/demos/your-day-60` | `[slug]/page.tsx` | Your Day in 60 Seconds walkthrough |
| `/demos/receipt-box` | `[slug]/page.tsx` | Receipt Box walkthrough |

---

## Analytics (GA4)

Tracking configured with environment variable:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Events tracked:**
- `screen_view`: User navigates to a new screen (scaffolded, fires when gtag is present)

---

## Getting Started

### Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Environment Variables
```bash
cp .env.local.example .env.local
# Edit with your GA4 ID
```

### Deployment to Vercel
```bash
vercel deploy
```

---

## Next Steps (TODO)

1. **Subdomain Deployment** — Deploy to `walkthroughs.idyllwoodlab.com` via Vercel
2. **Hub Integration** — Add PoC Walkthroughs card in "The Lab" section on idyllwoodlab.com
3. **GA4 Tracking ID** — Set `NEXT_PUBLIC_GA_ID` in Vercel env vars once deployed
4. **Content Polish** — Refine tier1/tier2 copy in `walkthroughs.ts` per PoC

## Design Notes

- **Stepper layout:** `tier1` is the hero hook (Playfair Display, large). `content` is sub-copy. `tier2` is demoted to a small tech pill.
- **Visual panels:** All 21 screens have hand-crafted visuals in `ScreenVisual.tsx` — keyed by `slug:screenIndex`. Three types: chaos (screen 0), before/after (transformation moment), output (downstream steps).
- **CTA:** Last screen shows "Let's talk." linking directly to `idyllwoodlab.com/#ai-consulting`. No modal, no form.
- **Transitions:** Framer Motion slide+fade with directional awareness (forward/backward).
