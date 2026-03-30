# Stepper Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the PoC walkthrough stepper with narrative-first layout, context-specific visual panels per step, Framer Motion slide/fade transitions, and a zero-friction "Let's talk." CTA that links directly to the Hub.

**Architecture:** `PoCStepper` is fully rewritten with a new layout (hook → sub-copy → visual panel → tech pill). Visual content is isolated in a new `ScreenVisual` component keyed by `slug + screenIndex` — no encoding in the data layer. Framer Motion `AnimatePresence` wraps the content area for directional slide+fade transitions.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS (brand tokens already configured), Framer Motion 12, Lucide React

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/app/layout.tsx` | Modify | Remove `h-screen` / `overflow-hidden` — let pages own their height |
| `src/data/walkthroughs.ts` | Modify | Add `mcp` to `receipt-box` entry |
| `src/components/ScreenVisual.tsx` | Create | All 21 visual panels keyed by slug + screenIndex |
| `src/components/PoCStepper.tsx` | Rewrite | New layout, Framer Motion transitions, "Let's talk." CTA |
| `src/components/TierCallout.tsx` | Delete | No longer used after PoCStepper rewrite |

---

## Task 1: Fix layout nesting + data bug

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/data/walkthroughs.ts`

- [ ] **Step 1: Fix layout.tsx**

In `src/app/layout.tsx`, make two changes:
1. Remove `h-full` from the `<html>` tag: `<html lang="en" className="antialiased">`
2. Replace the `<body>` and its wrapper `<div>` with a flat structure:

```tsx
<body className="bg-slate-950">
  <Header />
  <main>
    {children}
  </main>
</body>
```

The GA4 `<Script>` blocks inside `<html>` are unchanged — leave them as-is.

- [ ] **Step 2: Fix receipt-box mcp field in walkthroughs.ts**

In `src/data/walkthroughs.ts`, find the `"receipt-box"` entry and add the missing field after `keyFeature`:

```ts
keyFeature: "Vision + folder processing",
mcp: "Vision + folder processing",
```

- [ ] **Step 3: Verify build passes**

```bash
cd "/Volumes/Crucial X9/Dev/repos/idyllwood-poc-walkthroughs"
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/data/walkthroughs.ts
git commit -m "fix: layout nesting and receipt-box mcp field"
```

---

## Task 2: Create ScreenVisual — chaos panels

**Files:**
- Create: `src/components/ScreenVisual.tsx`

The chaos panels show the messy "before" state. One per walkthrough, always screenIndex 0.

- [ ] **Step 1: Create the file with the component interface and chaos panels**

```tsx
// src/components/ScreenVisual.tsx
'use client';

export interface ScreenVisualProps {
  slug: string;
  screenIndex: number;
}

export function ScreenVisual({ slug, screenIndex }: ScreenVisualProps) {
  const key = `${slug}:${screenIndex}`;

  // ── CHAOS PANELS ────────────────────────────────────────────────

  if (key === 'mistakes-over:0') {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-600 mb-1">
          Your raw transcript
        </div>
        {[
          { speaker: 'Sarah', text: '...okay so I think we agreed to push the launch, right? Or was that just a suggestion?', dim: true },
          { speaker: 'Marcus', text: "Yeah I'll follow up on that. Or maybe Dan will. We'll figure it out.", dim: false },
          { speaker: 'Dan', text: 'Sure, sure. And the budget thing — did we decide anything there?', dim: true },
          { speaker: 'Sarah', text: "I think so. Someone mentioned Q3 but I don't remember who.", dim: true },
        ].map(({ speaker, text, dim }, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-[11px] font-semibold text-taupe-500 uppercase tracking-[0.5px] whitespace-nowrap pt-0.5 min-w-[52px]">
              {speaker}
            </span>
            <span className={`text-[13px] leading-relaxed ${dim ? 'text-slate-600' : 'text-slate-300'}`}>
              {text}
            </span>
          </div>
        ))}
        <div className="border-t border-white/5 mt-1 pt-3 text-[12px] text-slate-500 italic">
          Nobody owns anything. Nothing is decided. The meeting is over.
        </div>
      </div>
    );
  }

  if (key === 'your-day-60:0') {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-600 mb-1">
          Your morning, right now
        </div>
        {[
          { app: 'Gmail', badge: '47', snippet: 'Re: Q3 budget — can you confirm by...' },
          { app: 'Slack', badge: '12', snippet: '#product: @here anyone seen the Figma...' },
          { app: 'Calendar', badge: '3', snippet: 'Standup in 8 min · Prep: none' },
          { app: 'Asana', badge: '9', snippet: 'Overdue: API docs · Launch checklist · ...' },
          { app: 'Linear', badge: '5', snippet: 'Assigned to you: ENG-441, ENG-...' },
          { app: 'Notion', badge: '2', snippet: 'Decision needed: Infra proposal v2' },
        ].map(({ app, badge, snippet }, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-[80px]">
              <span className="text-[12px] font-semibold text-slate-400">{app}</span>
              <span className="text-[10px] font-bold bg-red-500/20 text-red-400 rounded-full px-1.5 py-0.5 leading-none">{badge}</span>
            </div>
            <span className="text-[12px] text-slate-600 truncate">{snippet}</span>
          </div>
        ))}
        <div className="border-t border-white/5 mt-1 pt-3 text-[12px] text-slate-500 italic">
          Six tabs. No signal. Coffee is getting cold.
        </div>
      </div>
    );
  }

  if (key === 'receipt-box:0') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-4">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-20 rounded bg-slate-800/60 border border-white/5 flex items-end justify-center pb-2"
              style={{ transform: `rotate(${(i % 3 - 1) * 3}deg)` }}
            >
              <span className="text-[9px] text-slate-600">IMG_{String(i + 1).padStart(3, '0')}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white">47</div>
            <div className="text-[10px] text-slate-600 uppercase tracking-wider">Photos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">0</div>
            <div className="text-[10px] text-slate-600 uppercase tracking-wider">Categorized</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">6w</div>
            <div className="text-[10px] text-slate-600 uppercase tracking-wider">To tax deadline</div>
          </div>
        </div>
        <div className="text-[12px] text-slate-500 italic">You have been meaning to do this for three months.</div>
      </div>
    );
  }

  // Fallback — should not be reached once all panels are defined
  return (
    <div className="flex items-center justify-center h-32 text-slate-700 text-sm">
      Visual panel — {key}
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ScreenVisual.tsx
git commit -m "feat: add ScreenVisual component with chaos panels"
```

---

## Task 3: Add before/after panels to ScreenVisual

**Files:**
- Modify: `src/components/ScreenVisual.tsx`

One before/after panel per walkthrough — the transformation moments.

- [ ] **Step 1: Add before/after panels inside the ScreenVisual function, before the fallback return**

Insert after the `receipt-box:0` block and before the fallback `return`:

```tsx
  // ── BEFORE / AFTER PANELS ───────────────────────────────────────

  if (key === 'mistakes-over:2') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-red-400 border-b border-white/5 pb-2">
            Before
          </div>
          {[
            "...I think we agreed? Or maybe not",
            "Someone mentioned Q3 I think",
            "We'll figure it out later",
          ].map((line, i) => (
            <div key={i} className="text-[12px] text-slate-600 leading-relaxed">{line}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-400 border-b border-white/5 pb-2">
            After Claude
          </div>
          {[
            { tag: 'decision', text: 'Launch pushed to Q3 — confirmed' },
            { tag: 'action',   text: 'Dan: confirm budget with Finance' },
            { tag: 'owner',    text: 'Marcus: vendor contracts this week' },
          ].map(({ tag, text }, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/[0.02] rounded-md px-2.5 py-2 border border-white/5">
              <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                tag === 'decision' ? 'bg-taupe-500/15 text-taupe-400' :
                tag === 'action'   ? 'bg-indigo-500/15 text-indigo-400' :
                                     'bg-emerald-500/15 text-emerald-400'
              }`}>{tag}</span>
              <span className="text-[12px] text-slate-300 leading-relaxed">{text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (key === 'your-day-60:1') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-red-400 border-b border-white/5 pb-2">
            Before
          </div>
          {[
            'Gmail: 47 unread, unknown priority',
            'Slack: 12 threads, no urgency filter',
            'Calendar: no prep loaded',
            'Asana: 9 overdue tasks',
            'Linear: 5 unreviewed issues',
            'Notion: 2 pending decisions',
          ].map((line, i) => (
            <div key={i} className="text-[11px] text-slate-600 leading-relaxed">{line}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-400 border-b border-white/5 pb-2">
            Morning Briefing
          </div>
          {[
            { tag: 'urgent',   text: '2 Slack threads need you today',          color: 'red' },
            { tag: 'meeting',  text: '3 meetings · prep loaded for 2',          color: 'indigo' },
            { tag: 'task',     text: 'Top priority: Q3 budget confirmation',    color: 'taupe' },
            { tag: 'decision', text: 'Infra proposal — needs your sign-off',    color: 'emerald' },
          ].map(({ tag, text, color }, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/[0.02] rounded-md px-2.5 py-2 border border-white/5">
              <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                color === 'red'     ? 'bg-red-500/15 text-red-400' :
                color === 'indigo'  ? 'bg-indigo-500/15 text-indigo-400' :
                color === 'taupe'   ? 'bg-taupe-500/15 text-taupe-400' :
                                      'bg-emerald-500/15 text-emerald-400'
              }`}>{tag}</span>
              <span className="text-[12px] text-slate-300 leading-relaxed">{text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (key === 'receipt-box:3') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-red-400 border-b border-white/5 pb-2">
            The photo
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="w-full h-20 bg-slate-800/60 rounded border border-white/5 flex items-center justify-center">
              <span className="text-slate-600 text-[11px]">receipt_photo.jpg</span>
            </div>
            <div className="text-[11px] text-slate-600">Crumpled. Faded ink. Sideways.</div>
            <div className="text-[11px] text-slate-600">You have 46 more like this.</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-400 border-b border-white/5 pb-2">
            After Claude Vision
          </div>
          {[
            { tag: 'vendor',   text: 'Home Depot' },
            { tag: 'total',    text: '$47.32' },
            { tag: 'date',     text: '2024-03-15' },
            { tag: 'category', text: 'Supplies' },
          ].map(({ tag, text }, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/[0.02] rounded-md px-2.5 py-2 border border-white/5">
              <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-taupe-500/15 text-taupe-400 flex-shrink-0">
                {tag}
              </span>
              <span className="text-[12px] text-slate-300">{text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ScreenVisual.tsx
git commit -m "feat: add before/after visual panels to ScreenVisual"
```

---

## Task 4: Add output panels to ScreenVisual

**Files:**
- Modify: `src/components/ScreenVisual.tsx`

The 15 remaining screens use the structured output panel type — tagged rows.

- [ ] **Step 1: Add a shared OutputPanel helper above the ScreenVisual function**

Insert this above `export function ScreenVisual`:

```tsx
type TagColor = 'taupe' | 'indigo' | 'emerald' | 'sky' | 'amber' | 'red';

interface OutputRow {
  tag: string;
  text: string;
  color?: TagColor;
}

function tagClass(color: TagColor = 'taupe'): string {
  const map: Record<TagColor, string> = {
    taupe:   'bg-taupe-500/15 text-taupe-400',
    indigo:  'bg-indigo-500/15 text-indigo-400',
    emerald: 'bg-emerald-500/15 text-emerald-400',
    sky:     'bg-sky-500/15 text-sky-400',
    amber:   'bg-amber-500/15 text-amber-400',
    red:     'bg-red-500/15 text-red-400',
  };
  return map[color];
}

function OutputPanel({ label, rows }: { label: string; rows: OutputRow[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-600 mb-1">{label}</div>
      {rows.map(({ tag, text, color = 'taupe' }, i) => (
        <div key={i} className="flex items-start gap-2 bg-white/[0.02] rounded-md px-3 py-2.5 border border-white/5">
          <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${tagClass(color)}`}>
            {tag}
          </span>
          <span className="text-[12px] text-slate-300 leading-relaxed">{text}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add the 15 output panel cases before the fallback return**

Insert after the `receipt-box:3` before/after block:

```tsx
  // ── OUTPUT PANELS — mistakes-over ───────────────────────────────

  if (key === 'mistakes-over:1') {
    return <OutputPanel label="Processing" rows={[
      { tag: 'upload',  text: 'meeting_2024-03-15.mp4 — 847 MB',            color: 'sky' },
      { tag: 'status',  text: 'Extracting transcript…',                       color: 'amber' },
      { tag: 'queue',   text: 'Claude processing: ~40 seconds remaining',     color: 'indigo' },
    ]} />;
  }

  if (key === 'mistakes-over:3') {
    return <OutputPanel label="Granola MCP — speaker context added" rows={[
      { tag: 'speaker',  text: 'Sarah Chen — Product Lead, high confidence',              color: 'sky' },
      { tag: 'speaker',  text: 'Marcus Webb — Engineering, high confidence',              color: 'sky' },
      { tag: 'emphasis', text: 'Marcus flagged Q3 timeline twice — marked as priority',   color: 'amber' },
      { tag: 'tone',     text: 'Alignment reached at 41:22 — decision finalized',         color: 'emerald' },
    ]} />;
  }

  if (key === 'mistakes-over:4') {
    return <OutputPanel label="Slack export preview" rows={[
      { tag: 'decision', text: 'Launch pushed to Q3 2024',                    color: 'taupe' },
      { tag: 'action',   text: 'Dan → budget sign-off by Friday',             color: 'indigo' },
      { tag: 'action',   text: 'Marcus → vendor contracts this week',          color: 'indigo' },
      { tag: 'sent',     text: '#product-team — posted as thread reply',       color: 'emerald' },
    ]} />;
  }

  if (key === 'mistakes-over:5') {
    return <OutputPanel label="Decision ledger" rows={[
      { tag: 'decision', text: 'Launch → Q3',                                 color: 'taupe' },
      { tag: 'owner',    text: 'Dan McAuley',                                 color: 'sky' },
      { tag: 'date',     text: '2024-03-15',                                  color: 'sky' },
      { tag: 'status',   text: 'Open — budget pending',                       color: 'amber' },
    ]} />;
  }

  if (key === 'mistakes-over:6') {
    return <OutputPanel label="Downstream triggers fired" rows={[
      { tag: 'crm',    text: 'Salesforce opportunity stage updated to Q3',    color: 'sky' },
      { tag: 'linear', text: 'ENG-441 due date set to 2024-09-01',            color: 'indigo' },
      { tag: 'notion', text: 'Decision log page updated',                     color: 'taupe' },
      { tag: 'alert',  text: 'Finance notified of pending budget confirmation', color: 'amber' },
    ]} />;
  }

  // ── OUTPUT PANELS — your-day-60 ─────────────────────────────────

  if (key === 'your-day-60:2') {
    return <OutputPanel label="Urgent Slack threads" rows={[
      { tag: 'urgent', text: '#infra: prod deploy blocked — needs your approval', color: 'red' },
      { tag: 'urgent', text: '@you: Q3 budget thread — 3 replies waiting',        color: 'red' },
      { tag: 'score',  text: 'Urgency scored by Claude sentiment analysis',        color: 'indigo' },
    ]} />;
  }

  if (key === 'your-day-60:3') {
    return <OutputPanel label="Today's meetings" rows={[
      { tag: '9:00am',  text: "Standup — prep: yesterday's Linear digest loaded",  color: 'sky' },
      { tag: '11:00am', text: 'Q3 Planning — prep: budget doc + open decisions',   color: 'sky' },
      { tag: '2:00pm',  text: 'Vendor call — prep: none loaded (no prior context)', color: 'amber' },
    ]} />;
  }

  if (key === 'your-day-60:4') {
    return <OutputPanel label="Top tasks for today" rows={[
      { tag: 'priority', text: 'Confirm Q3 budget with Finance (overdue)',          color: 'red' },
      { tag: 'priority', text: 'Approve infra deploy — blocks two engineers',       color: 'red' },
      { tag: 'priority', text: 'Review Infra Proposal v2 — decision needed',        color: 'amber' },
    ]} />;
  }

  if (key === 'your-day-60:5') {
    return <OutputPanel label="Carried forward from yesterday" rows={[
      { tag: 'decision', text: 'Infra proposal — you agreed to decide by today',   color: 'taupe' },
      { tag: 'action',   text: 'Follow up with legal on vendor NDA (your item)',    color: 'indigo' },
      { tag: 'source',   text: 'Pulled from Mistakes Over decision ledger',         color: 'sky' },
    ]} />;
  }

  if (key === 'your-day-60:6') {
    return <OutputPanel label="Export and interact" rows={[
      { tag: 'export', text: 'PDF briefing — ready to download',                   color: 'sky' },
      { tag: 'export', text: 'Slack DM — sent to yourself at 7:02am',              color: 'emerald' },
      { tag: 'q&a',    text: 'Ask Claude: "What should I prep for the vendor call?"', color: 'indigo' },
    ]} />;
  }

  // ── OUTPUT PANELS — receipt-box ──────────────────────────────────

  if (key === 'receipt-box:1') {
    return <OutputPanel label="Watched folder" rows={[
      { tag: 'synced',  text: 'receipt_home_depot.jpg — ready',              color: 'emerald' },
      { tag: 'syncing', text: 'receipt_costco_march.jpg — uploading…',       color: 'amber' },
      { tag: 'pending', text: 'IMG_0847.jpg — queued',                       color: 'sky' },
    ]} />;
  }

  if (key === 'receipt-box:2') {
    return <OutputPanel label="How it works" rows={[
      { tag: 'step 1', text: 'Snap photo with your phone camera',            color: 'sky' },
      { tag: 'step 2', text: 'File lands in watched folder (Dropbox or local)', color: 'sky' },
      { tag: 'step 3', text: 'Trigger fires automatically — no manual upload', color: 'emerald' },
    ]} />;
  }

  if (key === 'receipt-box:4') {
    return <OutputPanel label="Category rules applied" rows={[
      { tag: 'match',    text: '"Home Depot" → Supplies (98% confidence)',    color: 'emerald' },
      { tag: 'match',    text: '"HD" → Home Depot (fuzzy normalize)',         color: 'emerald' },
      { tag: 'rule',     text: 'Amount > $200 at hardware stores → Capital Expense', color: 'taupe' },
      { tag: 'fallback', text: 'Unknown vendors flagged for manual review',   color: 'amber' },
    ]} />;
  }

  if (key === 'receipt-box:5') {
    return <OutputPanel label="Google Sheet — new row added" rows={[
      { tag: 'vendor',   text: 'Home Depot',    color: 'sky' },
      { tag: 'amount',   text: '$47.32',         color: 'taupe' },
      { tag: 'date',     text: '2024-03-15',     color: 'sky' },
      { tag: 'category', text: 'Supplies',       color: 'emerald' },
    ]} />;
  }

  if (key === 'receipt-box:6') {
    return <OutputPanel label="Ready to export" rows={[
      { tag: 'csv',        text: 'expenses_2024_q1.csv — 47 rows',           color: 'sky' },
      { tag: 'quickbooks', text: 'IIF format — ready to import',             color: 'emerald' },
      { tag: 'pdf',        text: 'Expense report — formatted for accountant', color: 'taupe' },
    ]} />;
  }
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ScreenVisual.tsx
git commit -m "feat: add output panels to ScreenVisual — all 21 screens covered"
```

---

## Task 5: Rewrite PoCStepper

**Files:**
- Rewrite: `src/components/PoCStepper.tsx`

Full replacement. New layout: hook → sub-copy → visual panel → tech pill. Framer Motion transitions. "Let's talk." CTA on last screen. No modal.

**Note on header height:** The `Header` component in `layout.tsx` renders at `57px` (4px border-bottom + padding + content). The stepper uses `h-[calc(100vh-57px)]` to fill the remaining viewport. If the header height ever changes, update this value.

- [ ] **Step 1: Replace PoCStepper.tsx entirely**

```tsx
// src/components/PoCStepper.tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PoC } from '@/data/walkthroughs';
import { ScreenVisual } from './ScreenVisual';

interface PoCStepperProps {
  poc: PoC;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export function PoCStepper({ poc }: PoCStepperProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(1);

  const isFirstScreen = currentScreen === 0;
  const isLastScreen = currentScreen === poc.screens.length - 1;
  const progress = ((currentScreen + 1) / poc.screens.length) * 100;
  const screen = poc.screens[currentScreen];

  const navigate = (next: number) => {
    setDirection(next > currentScreen ? 1 : -1);
    setCurrentScreen(next);
  };

  const handleNext = () => { if (!isLastScreen) navigate(currentScreen + 1); };
  const handlePrev = () => { if (!isFirstScreen) navigate(currentScreen - 1); };

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      {/* Progress bar */}
      <div className="h-[3px] bg-slate-900/50 flex-shrink-0">
        <div
          className="h-full bg-gradient-to-r from-taupe-500 to-taupe-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentScreen}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col gap-7"
            >
              {/* Hook — tier1 as hero */}
              {screen.tier1 && (
                <h2 className="font-display font-bold text-white leading-snug text-3xl md:text-4xl lg:text-[42px] max-w-2xl">
                  {screen.tier1}
                </h2>
              )}

              {/* Sub-copy — content field */}
              <p className="text-[15px] text-slate-400 leading-relaxed max-w-xl">
                {screen.content}
              </p>

              {/* Visual panel */}
              <div className="rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/[0.06] p-7">
                <ScreenVisual slug={poc.slug} screenIndex={currentScreen} />
              </div>

              {/* Tech pill — tier2, only if present */}
              {screen.tier2 && (
                <div className="inline-flex items-center gap-2 bg-taupe-500/[0.08] border border-taupe-500/20 rounded-full px-3 py-1.5 w-fit">
                  {poc.mcp && (
                    <span className="text-[11px] font-semibold text-taupe-400">
                      {poc.mcp}
                    </span>
                  )}
                  {poc.mcp && <span className="text-taupe-500/40 select-none">·</span>}
                  <span className="text-[11px] text-taupe-500">{screen.tier2}</span>
                </div>
              )}

              {/* Last screen CTA */}
              <AnimatePresence>
                {isLastScreen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex justify-center pt-2"
                  >
                    <a
                      href="https://idyllwoodlab.com/#ai-consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-taupe-500 to-taupe-400 text-slate-950 font-semibold text-[15px] hover:opacity-90 transition-opacity shadow-lg shadow-taupe-900/20"
                    >
                      Let&apos;s talk.
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="flex-shrink-0 border-t border-white/[0.05] bg-slate-900/60 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={isFirstScreen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/[0.05] text-sm font-medium text-slate-300"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="flex items-center gap-2">
            {poc.screens.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`Go to screen ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width:      i === currentScreen ? 10 : 7,
                  height:     i === currentScreen ? 10 : 7,
                  background: i === currentScreen ? '#a39785' : '#1e293b',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isLastScreen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/[0.05] text-sm font-medium text-slate-300"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Fix any TypeScript errors before continuing.

- [ ] **Step 3: Smoke test in dev**

```bash
npm run dev
```

Check each of the following:
- `http://localhost:3000` — home page scrolls normally, cards are visible
- `http://localhost:3000/demos/mistakes-over` — stepper fills viewport, hook text large, visual panel visible, tech pill present. Navigate all 7 screens. Last screen shows "Let's talk." button. Clicking it opens `idyllwoodlab.com/#ai-consulting` in a new tab.
- `http://localhost:3000/demos/your-day-60` — same checks, 7 screens
- `http://localhost:3000/demos/receipt-box` — same checks, 7 screens. mcp badge on home page card should now show "Vision + folder processing" instead of `undefined`.

- [ ] **Step 4: Commit**

```bash
git add src/components/PoCStepper.tsx
git commit -m "feat: rewrite PoCStepper with narrative layout, Framer Motion transitions, and CTA"
```

---

## Task 6: Remove unused TierCallout component

**Files:**
- Delete: `src/components/TierCallout.tsx`

- [ ] **Step 1: Confirm TierCallout is unused**

```bash
grep -r "TierCallout" "/Volumes/Crucial X9/Dev/repos/idyllwood-poc-walkthroughs/src"
```

Expected: no output. If any file still imports it, remove the import first.

- [ ] **Step 2: Delete the file**

```bash
rm "/Volumes/Crucial X9/Dev/repos/idyllwood-poc-walkthroughs/src/components/TierCallout.tsx"
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused TierCallout component"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|---|---|
| tier1 as hero hook, Playfair Display, 28–42px | Task 5 |
| content as sub-copy, slate-400, 15px | Task 5 |
| Glass visual panel, context-specific content | Tasks 2–4 + Task 5 |
| All 21 visual panels defined | Tasks 2, 3, 4 |
| tier2 as tech pill, 11px, taupe, rounded-full | Task 5 |
| Framer Motion slide+fade, directional | Task 5 |
| AnimatePresence mode="wait" | Task 5 |
| "Let's talk." CTA on last screen, fade-in | Task 5 |
| CTA opens Hub in new tab, no modal | Task 5 |
| Layout nesting fix (h-screen / overflow-hidden) | Task 1 |
| receipt-box mcp bug fixed | Task 1 |
| TierCallout removed | Task 6 |
