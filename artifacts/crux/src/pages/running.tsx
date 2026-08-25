import React from 'react';
import { useSafeRunningLoops } from '@/lib/safe-hooks';
import { Play, Pause, Activity, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function RunningLoops() {
  const { data: loops, isLoading } = useSafeRunningLoops();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pt-12 md:pt-16">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Running</h1>
        <p className="text-muted-foreground text-lg">Autonomous agent loops executing your goals.</p>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-card rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {loops.map((loop, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border rounded-3xl p-6 group hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif mb-1 flex items-center gap-2">
                    {loop.name}
                    {loop.status === 'running' && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    )}
                  </h2>
                  <p className="text-muted-foreground text-sm">{loop.goal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium flex items-center gap-1.5">
                    <Bot size={14} className="text-primary" />
                    {loop.agents} Agents
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Spend</div>
                  <div className="font-mono font-semibold">{loop.spend}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Uptime</div>
                  <div className="font-semibold">{loop.time}</div>
                </div>
                <div className="col-span-2 md:col-span-2">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Last Action</div>
                  <div className="font-medium truncate">{loop.lastAction}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${loop.progress}%` }}
                  />
                </div>
                <div className="text-xs font-medium w-10 text-right">{loop.progress}%</div>
                <div className="flex gap-2 ml-4">
                  <button className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:text-primary transition-colors">
                    {loop.status === 'running' ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
