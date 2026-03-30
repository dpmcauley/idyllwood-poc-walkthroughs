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

  // Fallback — should not be reached once all panels are defined
  return (
    <div className="flex items-center justify-center h-32 text-slate-700 text-sm">
      Visual panel — {key}
    </div>
  );
}
