# PoC Walkthrough Stepper — Redesign Spec
**Date:** 2026-03-30
**Status:** Approved for implementation

---

## Goal

Rebuild the walkthrough stepper experience to feel like a polished, story-first product demo. The current implementation has a grey placeholder box for the visual area, inconsistent layout nesting, and a contact CTA that dead-ends. This spec covers the full redesign.

---

## Design Direction

**Narrative-first, polished.** Each step opens with the emotional hook as the hero. The visual panel shows contextually appropriate mock content — not a placeholder. The tech detail exists but doesn't lead.

Approved in brainstorming session 2026-03-30.

---

## Component: `PoCStepper`

### Layout (top to bottom)
1. **Progress bar** — 3px, taupe gradient, spans full width
2. **Content area** — flex column, vertically centered, scrollable
3. **Sticky footer** — prev/next nav + dot indicators

### Content area structure per screen

```
[hook]         ← tier1, Playfair Display, 28–42px, white, max-width 640px (plain text, no markup)
[sub-copy]     ← content field, Inter 15px, slate-400, max-width 560px
[visual panel] ← glass panel, context-specific (see Visual Panel Rules)
[tech pill]    ← tier2, single inline pill, taupe-500/20 border, 11px
```

### Visual Panel Rules

Three panel types. Which type to use is determined by screen role:

**Type 1 — Raw chaos** (problem/opening screens)
- Shows the messy "before" state as mock document content
- `mistakes-over` → fake meeting transcript with vague speakers and no owners
- `your-day-60` → mock inbox: 6 app icons, unread badges, fragmented snippets
- `receipt-box` → a pile description: "47 photos. No dates. No categories."

**Type 2 — Before/After split** (the transformation moment — one screen per walkthrough)
- Two columns: "Before" (red label, muted chaos lines) / "After Claude" (green label, clean tagged lines)
- Used for the screen where Claude has just processed the input
- `mistakes-over` → screen 3 (Claude extracts decisions)
- `your-day-60` → screen 2 (one briefing replaces 6 apps)
- `receipt-box` → screen 4 (Claude Vision reads the receipt)

**Type 3 — Structured output** (all remaining solution/downstream screens)
- Tagged result rows: `decision`, `action`, `owner`, `item`, `category`, etc.
- Each row: tag badge + content text
- Background: `rgba(255,255,255,0.03)`, border `rgba(255,255,255,0.05)`
- Tag colors: taupe (decisions), indigo (actions), emerald (owners/outputs)

### Tech pill
- Single line: `Powered by [mcp/feature] · [brief description]`
- If `mcp` field is absent, omit the pill entirely
- Style: `bg-taupe-500/8 border-taupe-500/20 text-taupe-500`, 11px, rounded-full

### Navigation footer
- Prev button: disabled + 30% opacity on screen 0
- Next button: disabled + 30% opacity on last screen
- Dot indicators: active dot is `taupe-400`, 10×10px; inactive is `slate-800`, 7×7px
- On last screen: dot indicators stay, Next button stays disabled — no CTA button in footer
- CTA appears as a separate full-width button **above** the footer on the last screen only

### Last screen CTA
- Button text: **"Let's talk."**
- Action: `window.open('https://idyllwoodlab.com/#ai-consulting', '_blank')`
- No modal, no form
- Style: `bg-gradient-to-r from-taupe-500 to-taupe-400 text-slate-950 font-semibold`, full-width on mobile, `max-w-xs` centered on desktop
- Appears with a fade-in when `isLastScreen` becomes true

---

## Transitions (Framer Motion)

Screen changes animate with a slide + fade. Direction is determined by nav direction.

```
enter  (forward):  x: 40, opacity: 0  →  x: 0, opacity: 1
exit   (forward):  x: 0,  opacity: 1  →  x: -40, opacity: 0
enter  (backward): x: -40, opacity: 0 →  x: 0, opacity: 1
exit   (backward): x: 0,  opacity: 1  →  x: 40, opacity: 0
duration: 0.25s, ease: easeOut
```

Wrap the content area in `AnimatePresence mode="wait"`. Track direction in state.

---

## Data: `walkthroughs.ts`

### Changes required

1. **Add `mcp` field to `receipt-box`**: `"Vision + folder processing"`
2. No other data changes needed — visual content lives in the component, not the data.

## New Component: `ScreenVisual.tsx`

A dedicated component that renders the correct visual panel based on `slug` and `screenIndex`. Keeps all visual content in one file, out of the data layer.

```ts
interface ScreenVisualProps {
  slug: string;
  screenIndex: number;
  visualType: 'chaos' | 'before-after' | 'output';
}
```

**Visual assignments** (slug → screen index → type → content summary):

| slug | index | type | content |
|---|---|---|---|
| mistakes-over | 0 | chaos | Fake meeting transcript — 4 lines, vague speakers, no owners, nothing decided |
| mistakes-over | 1 | output | `action: Upload recording`, `status: Processing…` |
| mistakes-over | 2 | before-after | Before: vague transcript lines / After: Decision, Action, Owner rows |
| mistakes-over | 3 | output | Speaker tags + emphasis markers from Granola |
| mistakes-over | 4 | output | Slack Block Kit preview — threaded summary |
| mistakes-over | 5 | output | Decision ledger rows with date/owner/status |
| mistakes-over | 6 | output | Webhook trigger list → CRM, Linear, Notion |
| your-day-60 | 0 | chaos | 6 app icons in a row, each with an unread badge and a fragmented snippet |
| your-day-60 | 1 | before-after | Before: 6 fragmented app rows / After: single Morning Briefing summary |
| your-day-60 | 2 | output | Urgent Slack threads — 2 items, urgency score badge |
| your-day-60 | 3 | output | Calendar: 3 meetings with prep note status |
| your-day-60 | 4 | output | Task inbox: 3 items, priority tags |
| your-day-60 | 5 | output | Decision carry-forward: 2 items from prior day |
| your-day-60 | 6 | output | Export options: PDF, Slack, Email + Q&A prompt |
| receipt-box | 0 | chaos | Receipt pile stat: "47 photos · 0 categorized · tax deadline in 6 weeks" |
| receipt-box | 1 | output | Folder watcher: 3 files shown as pending → syncing |
| receipt-box | 2 | output | Camera roll → folder drop illustration (icon + arrow + folder) |
| receipt-box | 3 | before-after | Before: photo of crumpled receipt / After: extracted fields (vendor, amount, date, items) |
| receipt-box | 4 | output | Category rule: `"Home Depot" → Supplies`, confidence 98% |
| receipt-box | 5 | output | Google Sheet row append — 4 columns populated |
| receipt-box | 6 | output | Export formats: CSV, IIF (QuickBooks), PDF Report |

`ScreenVisual` contains hard-coded JSX per case. It's verbose but easy to update — no encoding scheme, no parsing.

---

## Layout Fix

`layout.tsx` currently wraps `<main>` in `overflow-hidden` inside an `h-screen` flex container. `PoCStepper` also uses `h-screen`. This works for the demo pages but clips the home page scroll.

**Fix:** Remove `overflow-hidden` and `h-full` from the `<body>` wrapper in `layout.tsx`. Let each page manage its own height. `PoCStepper` keeps `h-screen` via its own container.

---

## Bug Fix

`receipt-box` has no `mcp` field — the badge in `PoCCard` renders `undefined`. Add `mcp: "Vision + folder processing"` to the data entry.

---

## Out of Scope

- Home page card redesign (cards are working correctly)
- Supabase contact form integration (deferred — Hub contact form is the capture point)
- GA4 event wiring (scaffolded, leave as-is)
- Mobile-specific layout changes (responsive already works at current breakpoints)
