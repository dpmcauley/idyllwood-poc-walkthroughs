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
