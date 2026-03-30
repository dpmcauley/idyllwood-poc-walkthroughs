import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { PoC } from '@/data/walkthroughs';

interface PoCCardProps {
  poc: PoC;
  id: number;
}

export function PoCCard({ poc, id }: PoCCardProps) {
  return (
    <Link href={`/demos/${poc.slug}`}>
      <div className="group relative bg-slate-850 rounded-2xl p-8 border border-white/5 transition-all duration-300 h-full hover:border-taupe-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-taupe-900/20 cursor-pointer">
        
        {/* Header with ID and Status Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold border bg-slate-950 text-taupe-400 border-taupe-500/30 group-hover:bg-taupe-400 group-hover:text-slate-900 transition-colors">
            {id.toString().padStart(2, '0')}
          </div>
          {poc.mcp && (
            <div className="px-3 py-1 rounded-full text-xs font-mono border bg-taupe-400/10 text-taupe-400 border-taupe-500/20">
              {poc.mcp}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-taupe-400 transition-colors">
          {poc.title}
        </h3>

        {/* Emotional Hook */}
        <p className="text-taupe-400 text-sm italic mb-3">
          {poc.emotionalHook}
        </p>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          {poc.description}
        </p>

        {/* Transformation Row */}
        <div className="flex flex-col gap-2 mb-12 pt-6 border-t border-white/5">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Transformation</span>
          <p className="text-white font-medium">{poc.transformation}</p>
        </div>

        {/* Arrow Icon (appears on hover) */}
        <div className="absolute bottom-8 right-8 transition-all duration-300">
          <div className="bg-taupe-400 text-slate-900 p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
