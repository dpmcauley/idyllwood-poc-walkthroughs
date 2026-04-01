# Idyllwood Lab — Claude Workflows

**Subdomain:** `walkthroughs.idyllwoodlab.com`
**Status:** Built locally, not yet deployed
**Stack:** Next.js 16 App Router + TypeScript + Tailwind CSS v4 + Framer Motion 12
**Deployment:** Vercel (separate project from Hub)
**Database:** None (frontend-only)

---

## Project Purpose

Interactive walkthroughs demonstrating real Claude automation workflows. Three scenarios, each a 7-screen narrative stepper with emotional hooks, before/after visuals, and a direct CTA to consulting engagement.

**Audiences:**
- Non-technical decision-makers (tier1 — hero copy, Playfair Display)
- Hands-on practitioners (tier2 — small tech pill, monospace)

---

## Workflows Included

1. **Mistakes Over, Now What?** (`/demos/mistakes-over`)
   - Meeting transcript → structured decisions, action items, owner assignments
   - MCP: Granola MCP, Supabase, decision ledger

2. **Your Day in 60 Seconds** (`/demos/your-day-60`)
   - 6 disconnected apps → one prioritized morning briefing
   - MCP: Dispatch, Gmail, Slack, Asana, Notion

3. **Receipt Box** (`/demos/receipt-box`)
   - Receipt photos → Google Sheet rows, auto-categorized
   - MCP: Vision API, Google Sheets, expense categorization

---

## Architecture

### File Structure
```
src/
  app/
    page.tsx                    # Gallery landing — animated cards, Claude mark badge
    demos/[slug]/page.tsx       # Individual walkthrough (SSG via generateStaticParams)
    layout.tsx                  # Header + GA4 setup
    globals.css                 # Tailwind v4 @theme tokens + @layer base reset
  components/
    Header.tsx                  # Sticky header — logomark centre-left, "← The Lab" far left, "All Workflows →" right (demo pages only)
    Logo.tsx                    # Idyllwood Lab logomark (Terminal icon + wordmark) — links to idyllwoodlab.com
    PoCStepper.tsx              # 7-screen stepper — progress bar, slide transitions, sticky footer nav
    ScreenVisual.tsx            # 21 visual panels keyed by slug:screenIndex
    PoCCard.tsx                 # Gallery card with hover arrow
  data/
    walkthroughs.ts             # All PoC config — screens, copy, MCP labels
```

### Data Model (`walkthroughs.ts`)
Each PoC has: `slug`, `title`, `emotionalHook`, `transformation`, `mcp`, `description`, `screens[]`

Each screen has:
- `tier1` — hero hook headline (Playfair Display, 42px)
- `content` — sub-copy (slate-400, 15px)
- `tier2` — tech pill text (shown only if present)

### Visual Panels (`ScreenVisual.tsx`)
Keyed by `slug:screenIndex` composite. Three types:
- **Chaos** (screen 0) — raw messy state before automation
- **Before/After** (transformation screens) — split grid, dim left / bright right
- **Output** (all other screens) — `OutputPanel` component with colored tag badges

Tag badge colors: `taupe` | `indigo` | `emerald` | `sky` | `amber` | `red`

---

## Tailwind v4 — Critical Notes

This project uses **Tailwind CSS v4**. v4 is meaningfully different from v3:

- **No `tailwind.config.js`** — v4 ignores it. Custom tokens go in `globals.css` inside `@theme {}`
- **Import syntax** — `@import "tailwindcss"` not `@tailwind base/components/utilities`
- **CSS reset must be in `@layer base`** — unlayered `* { margin: 0 }` outranks utility classes and breaks `mx-auto`
- **PostCSS plugin** — `@tailwindcss/postcss` in `postcss.config.mjs`, not `tailwindcss`

Current `globals.css` structure:
```css
@import url('https://fonts.googleapis.com/...');
@import "tailwindcss";
@theme { --color-slate-850, --color-taupe-400, --color-taupe-500, --font-display, --font-sans }
@layer components { .glass-panel, .gradient-text }
@layer base { *, html, body }
```

If styles break: `rm -rf .next && npm run dev` — Turbopack caches aggressively.

---

## Routing

| Route | Purpose |
|---|---|
| `/` | Gallery landing (all 3 workflow cards) |
| `/demos/mistakes-over` | Mistakes Over walkthrough |
| `/demos/your-day-60` | Your Day in 60 Seconds walkthrough |
| `/demos/receipt-box` | Receipt Box walkthrough |

---

## CTA Flow

Last screen → "Build this for my team" → `https://idyllwoodlab.com/#ai-consulting`

The Hub has a `useEffect` on mount to scroll to `#ai-consulting` on load (fixes Vite SPA hash timing).

---

## Analytics (GA4)

```bash
NEXT_PUBLIC_GA_ID=G-06NWSWEHV3   # Set in Vercel env vars on deploy
```

---

## Local Development

```bash
npm install
npm run dev
# http://localhost:3000
```

---

## Deployment (TODO)

1. `vercel deploy` — creates project at Vercel
2. Set custom domain `walkthroughs.idyllwoodlab.com` in Vercel project settings
3. Add CNAME at Namecheap: `walkthroughs` → `cname.vercel-dns.com`
4. Set `NEXT_PUBLIC_GA_ID` env var in Vercel dashboard
5. Update Hub `constants.ts` link from `https://walkthroughs.idyllwoodlab.com` (already done — goes live automatically once subdomain resolves)

---

## Outstanding TODOs

1. **Deploy to Vercel** — not yet deployed, localhost only
2. **Transcript attribution fix** — `mistakes-over` transcript doesn't establish speaker ownership clearly enough to justify named action items in the output. Rewrite 4 lines in `walkthroughs.ts` so speakers explicitly claim tasks.
3. **GA4 ID** — set after deploy

---

## Design Notes

- **Header:** Context-aware — gallery shows only "The Lab" back link; demo pages add "All Workflows →" top right
- **Title:** "Claude Workflows" (not "PoC Walkthroughs" — jargon)
- **CTA copy:** "Build this for my team" (not "Let's talk.")
- **Claude mark:** Real SVG from Wikimedia Commons (CC0). Animated — slow spin in badge, pulse in CTA section.
- **Transitions:** Framer Motion `AnimatePresence mode="wait"` with directional `custom` prop (±40px x offset)
- **Font hierarchy:** tier1 = Playfair Display bold; content = Inter 15px slate-400; tier2 = Inter 11px monospace pill
