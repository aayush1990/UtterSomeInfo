import React from 'react';
import { useSafeLearnedPolicies } from '@/lib/safe-hooks';
import { BrainCircuit, Check, ToggleRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Learned() {
  const { data: learned, isLoading } = useSafeLearnedPolicies();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pt-12 md:pt-16">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Learned</h1>
        <p className="text-muted-foreground text-lg">Policies IncOS has synthesized from your past decisions.</p>
      </header>

      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-card rounded-3xl" />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 bg-card border border-border rounded-3xl p-6 flex items-center justify-between">
              <div>
                <div className="text-muted-foreground mb-1">Auto-Resolved This Week</div>
                <div className="text-3xl font-bold font-serif">{learned.weeklyDecisions}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Check size={24} />
              </div>
            </div>
            <div className="flex-1 bg-card border border-border rounded-3xl p-6 flex items-center justify-between">
              <div>
                <div className="text-muted-foreground mb-1">Time Saved</div>
                <div className="text-3xl font-bold font-serif text-primary">{learned.weeklySaved}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <BrainCircuit size={24} />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-serif font-bold mb-4">Active Policies</h2>
          <div className="space-y-4">
            {learned.policies.map((policy, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="mt-1">
                  <ToggleRight size={28} className={policy.enabled ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{policy.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{policy.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="px-2 py-1 rounded bg-background border border-border">
                      {policy.decisions} uses
                    </span>
                    <span className="text-primary">
                      {policy.saved} saved
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
