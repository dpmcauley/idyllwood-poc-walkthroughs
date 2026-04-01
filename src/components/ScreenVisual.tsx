'use client';

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
      <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 mb-1">{label}</div>
      {rows.map(({ tag, text, color = 'taupe' }, i) => (
        <div key={i} className="flex items-start gap-2 bg-white/[0.02] rounded-md px-3 py-2.5 border border-white/5">
          <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${tagClass(color)}`}>
            {tag}
          </span>
          <span className="text-sm text-slate-200 leading-relaxed">{text}</span>
        </div>
      ))}
    </div>
  );
}

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
        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 mb-1">
          Your raw transcript
        </div>
        {[
          { speaker: 'Sarah', text: "Okay so we're pushing the launch to Q3 — that's decided, right?", dim: true },
          { speaker: 'Marcus', text: "Yes. And I'll own the vendor contracts — I'll have a draft by end of week.", dim: false },
          { speaker: 'Dan', text: "Got it. I'll confirm the budget with Finance before Friday.", dim: true },
          { speaker: 'Sarah', text: "Perfect. Someone write this down so we don't lose it.", dim: true },
        ].map(({ speaker, text, dim }, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-xs font-semibold text-taupe-400 uppercase tracking-[0.5px] whitespace-nowrap pt-0.5 min-w-[52px]">
              {speaker}
            </span>
            <span className={`text-sm leading-relaxed ${dim ? 'text-slate-400' : 'text-slate-200'}`}>
              {text}
            </span>
          </div>
        ))}
        <div className="border-t border-white/5 mt-1 pt-3 text-sm text-slate-400 italic">
          Clear decisions. Named owners. No one wrote it down.
        </div>
      </div>
    );
  }

  if (key === 'your-day-60:0') {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 mb-1">
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
              <span className="text-sm font-semibold text-slate-300">{app}</span>
              <span className="text-[10px] font-bold bg-red-500/20 text-red-400 rounded-full px-1.5 py-0.5 leading-none">{badge}</span>
            </div>
            <span className="text-sm text-slate-400 truncate">{snippet}</span>
          </div>
        ))}
        <div className="border-t border-white/5 mt-1 pt-3 text-sm text-slate-400 italic">
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
              <span className="text-[9px] text-slate-500">IMG_{String(i + 1).padStart(3, '0')}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white">47</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Photos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">0</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Categorized</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">6w</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">To tax deadline</div>
          </div>
        </div>
        <div className="text-sm text-slate-400 italic">You have been meaning to do this for three months.</div>
      </div>
    );
  }

  // ── BEFORE / AFTER PANELS ───────────────────────────────────────

  if (key === 'mistakes-over:2') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 border-b border-white/5 pb-2">
            Before
          </div>
          {[
            "...I think we agreed? Or maybe not",
            "Someone mentioned Q3 I think",
            "We'll figure it out later",
          ].map((line, i) => (
            <div key={i} className="text-sm text-slate-400 leading-relaxed">{line}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-taupe-400 border-b border-white/5 pb-2">
            After Claude
          </div>
          {[
            { tag: 'decision', text: 'Launch pushed to Q3 — confirmed' },
            { tag: 'action',   text: 'Dan: confirm budget with Finance' },
            { tag: 'owner',    text: 'Marcus: vendor contracts this week' },
          ].map(({ tag, text }, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/[0.02] rounded-md px-2.5 py-2 border border-white/5">
              <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                tag === 'decision' ? 'bg-taupe-500/15 text-taupe-400' :
                tag === 'action'   ? 'bg-indigo-500/15 text-indigo-400' :
                                     'bg-emerald-500/15 text-emerald-400'
              }`}>{tag}</span>
              <span className="text-sm text-slate-200 leading-relaxed">{text}</span>
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
          <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 border-b border-white/5 pb-2">
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
            <div key={i} className="text-sm text-slate-400 leading-relaxed">{line}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-taupe-400 border-b border-white/5 pb-2">
            Morning Briefing
          </div>
          {[
            { tag: 'urgent',   text: '2 Slack threads need you today',          color: 'red' },
            { tag: 'meeting',  text: '3 meetings · prep loaded for 2',          color: 'indigo' },
            { tag: 'task',     text: 'Top priority: Q3 budget confirmation',    color: 'taupe' },
            { tag: 'decision', text: 'Infra proposal — needs your sign-off',    color: 'emerald' },
          ].map(({ tag, text, color }, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/[0.02] rounded-md px-2.5 py-2 border border-white/5">
              <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                color === 'red'     ? 'bg-red-500/15 text-red-400' :
                color === 'indigo'  ? 'bg-indigo-500/15 text-indigo-400' :
                color === 'taupe'   ? 'bg-taupe-500/15 text-taupe-400' :
                                      'bg-emerald-500/15 text-emerald-400'
              }`}>{tag}</span>
              <span className="text-sm text-slate-200 leading-relaxed">{text}</span>
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
          <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 border-b border-white/5 pb-2">
            The photo
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="w-full h-20 bg-slate-800/60 rounded border border-white/5 flex items-center justify-center">
              <span className="text-slate-400 text-xs">receipt_photo.jpg</span>
            </div>
            <div className="text-[11px] text-slate-500">Crumpled. Faded ink. Sideways.</div>
            <div className="text-[11px] text-slate-500">You have 46 more like this.</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-taupe-400 border-b border-white/5 pb-2">
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

  // Fallback — should not be reached once all panels are defined
  return (
    <div className="flex items-center justify-center h-32 text-slate-700 text-sm">
      Visual panel — {key}
    </div>
  );
}
