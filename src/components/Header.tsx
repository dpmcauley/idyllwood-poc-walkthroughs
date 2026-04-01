'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const isDemo = pathname.startsWith('/demos/');

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="https://idyllwoodlab.com"
          className="flex items-center gap-2 text-slate-500 hover:text-taupe-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          title="Return to Idyllwood Lab"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">The Lab</span>
        </Link>
        <h1 className="text-lg font-display font-bold text-white flex-1 text-center hidden sm:block">
          Claude Workflows
        </h1>
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

