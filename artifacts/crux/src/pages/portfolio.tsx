import React from 'react';
import { useSafePortfolio } from '@/lib/safe-hooks';
import { PieChart, ShieldAlert, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function Portfolio() {
  const { data: portfolio, isLoading } = useSafePortfolio();

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pt-12 md:pt-16">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Portfolio</h1>
        <p className="text-muted-foreground text-lg">Your productive positions and expected value.</p>
      </header>

      {isLoading ? (
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-card rounded-3xl" />
          <div className="h-64 bg-card rounded-3xl" />
        </div>
      ) : (
        <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <PieChart size={18} />
                <span className="font-medium">Total Invested</span>
              </div>
              <div className="text-3xl font-bold font-serif">{portfolio.totalInvested}</div>
            </div>
            <div className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-lg shadow-primary/20">
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                <Zap size={18} />
                <span className="font-medium">Expected Value</span>
              </div>
              <div className="text-3xl font-bold font-serif">{portfolio.totalExpectedValue}</div>
            </div>
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ShieldAlert size={18} />
                <span className="font-medium">Attention Saved</span>
              </div>
              <div className="text-3xl font-bold font-serif">{portfolio.attentionSaved}</div>
            </div>
          </div>

          {/* Projects Table/List */}
          <h2 className="text-xl font-serif font-bold mb-4">Active Projects</h2>
          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                  <tr>
                    <th className="p-4 font-medium">Project</th>
                    <th className="p-4 font-medium">Invested</th>
                    <th className="p-4 font-medium">Leverage</th>
                    <th className="p-4 font-medium">Progress</th>
                    <th className="p-4 font-medium">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {portfolio.projects.map((project, idx) => (
                    <motion.tr 
                      key={project.code}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-bold">{project.name}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">{project.code}</div>
                      </td>
                      <td className="p-4 font-mono font-medium">{project.invested}</td>
                      <td className="p-4">
                        <div className="text-sm">
                          <span className="text-primary font-semibold">{Math.round(project.agentHours / (project.humanHours || 1))}x</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Agent/Human hrs</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                          </div>
                          <span className="text-xs font-medium">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.risk === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {project.risk}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
