import React from 'react';
import { useSafeCruxes } from '@/lib/safe-hooks';
import { Link } from 'wouter';
import { Clock, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import { asPercent, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Feed() {
  const { data: cruxes, isLoading } = useSafeCruxes();

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 pt-12 md:pt-16">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">For You</h1>
        <p className="text-muted-foreground text-lg">2 decisions require your attention today.</p>
      </header>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-card rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {cruxes.map((crux, idx) => (
            <motion.div
              key={crux.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <Link href={`/crux/${crux.id}`}>
                <div className="block bg-card hover:bg-card/80 border border-border rounded-3xl p-6 transition-all cursor-pointer group active:scale-[0.98]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                        {crux.category}
                      </span>
                      {crux.urgency.includes('High') && (
                        <span className="flex items-center gap-1 text-destructive text-xs font-medium">
                          <AlertTriangle size={14} /> High Urgency
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Clock size={14} />
                      <span>{crux.deadline}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-serif font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                    {crux.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {crux.narratedSummary}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1">Expected Value</div>
                      <div className="font-semibold text-emerald-500 flex items-center gap-1">
                        <TrendingUp size={14} />
                        {crux.expectedValue}
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                      <div className="font-semibold text-foreground">
                        {asPercent(crux.confidence)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex -space-x-2">
                      {crux.participants.map((p, i) => (
                        <div key={i} className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-card", p.color)}>
                          {p.initials}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Open Decision <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
