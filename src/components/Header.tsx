'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

export function Header() {
  const pathname = usePathname();
  const isDemo = pathname.startsWith('/demos/');

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/5 backdrop-blur-xl p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Branding — matches Buyer's Dashboard pattern */}
        <div className="flex items-center gap-4">
          <Link
            href="https://idyllwoodlab.com"
            className="flex items-center gap-2 text-slate-500 hover:text-taupe-400 transition-colors pr-4 border-r border-slate-800"
            title="Return to Idyllwood Lab"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">The Lab</span>
          </Link>
          <Logo />
          <div className="hidden md:block h-8 w-px border-l border-slate-800" />
          <div className="hidden md:block">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Claude</h2>
            <p className="text-[10px] text-slate-500 font-mono">Workflows</p>
          </div>
        </div>

        {isDemo ? (
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-taupe-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            All Workflows
            <ArrowLeft size={14} strokeWidth={2} className="rotate-180" />
          </Link>
        ) : (
          <div className="w-24" />
        )}
      </div>
    </header>
  );
}

