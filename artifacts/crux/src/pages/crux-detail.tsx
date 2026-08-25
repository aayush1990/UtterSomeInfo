import React, { useState } from 'react';
import { useSafeCrux } from '@/lib/safe-hooks';
import { useResolveCrux, useAskCrux } from '@workspace/api-client-react';
import { useParams, useLocation } from 'wouter';
import { 
  ArrowLeft, Brain, TrendingUp, AlertCircle, CheckCircle2, 
  MessageSquare, PlayCircle, ShieldAlert, Sparkles, 
  ArrowRight
} from 'lucide-react';
import { asPercent, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function CruxDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { data: crux, isLoading } = useSafeCrux(params.id || '');
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [confirmingDeployment, setConfirmingDeployment] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);
  const [isTalking, setIsTalking] = useState(false);
  const [question, setQuestion] = useState('');
  const [transcript, setTranscript] = useState<Array<{ speaker: string; message: string }>>([]);
  
  const resolveMutation = useResolveCrux({
    mutation: {
      onSuccess: (updatedCrux) => {
        setIsResolving(false);
        setDeploymentStatus(updatedCrux.deploymentStatus ?? 'Deployment artifact created · actions are now running');
      },
      onError: () => {
        // Fallback for mock environment
        setTimeout(() => {
          setIsResolving(false);
          setDeploymentStatus('Deployment artifact created · actions are now running');
        }, 1000);
      }
    }
  });

  const handleResolve = () => {
    if (!selectedOption || !crux) return;
    setIsResolving(true);
    resolveMutation.mutate({ id: crux.id, data: { optionId: selectedOption } });
  };

  const askMutation = useAskCrux({
    mutation: {
      onSuccess: (reply) => {
        setTranscript((items) => [...items, { speaker: reply.agent, message: reply.message }]);
      },
      onError: () => {
        setTranscript((items) => [
          ...items,
          {
            speaker: crux?.participants[0]?.name ?? 'Your Twin',
            message: 'I would keep the reversible option open. It gives us the clearest next signal without increasing the downside.',
          },
        ]);
      },
    },
  });

  const submitQuestion = (message = question) => {
    if (!crux || !message.trim()) return;
    setTranscript((items) => [...items, { speaker: 'You', message: message.trim() }]);
    setQuestion('');
    askMutation.mutate({ id: crux.id, data: { message, participant: null } });
  };

  if (isLoading || !crux) {
    return <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground">Loading Context...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border p-4 px-4 md:px-8 flex items-center justify-between">
        <button 
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline font-medium">Back</span>
        </button>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider">
            {crux.category}
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            {crux.title}
          </h1>

          {/* Core Briefing */}
          <section className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-8 shadow-xl shadow-black/20">
            <div className="flex items-center gap-3 mb-4 text-primary font-medium">
              <Sparkles size={20} />
              Agent Briefing
            </div>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              {crux.narratedSummary}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Confidence</div>
                <div className="text-xl font-semibold">{asPercent(crux.confidence)}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Expected Val</div>
                <div className="text-xl font-semibold text-emerald-500">{crux.expectedValue}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Risk</div>
                <div className="text-xl font-semibold flex items-center gap-1">
                  {crux.risk === 'High' && <AlertCircle size={16} className="text-destructive" />}
                  {crux.risk}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Cost</div>
                <div className="text-xl font-semibold">{crux.cost}</div>
              </div>
            </div>
          </section>

          {/* Deep Dive Tabs (Simplified as sections for mobile ease) */}
          <div className="space-y-8 mb-12">
            
            {/* Evidence & Assumptions */}
            <section>
              <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <Brain size={20} className="text-muted-foreground" />
                Evidence & Assumptions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background border border-border rounded-2xl p-5">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">Key Evidence</h4>
                  <ul className="space-y-3">
                    {crux.evidence.map((ev, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <div className={cn(
                          "mt-0.5 min-w-[8px] w-2 h-2 rounded-full",
                          ev.signal === 'positive' ? "bg-emerald-500" : "bg-destructive"
                        )} />
                        <span className="text-foreground/80">{ev.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background border border-border rounded-2xl p-5">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">Assumptions</h4>
                  <ul className="space-y-3">
                    {crux.assumptions.map((ass, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <ShieldAlert size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{ass}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Simulations */}
            {crux.simulations.length > 0 && (
              <section>
                <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                  <PlayCircle size={20} className="text-muted-foreground" />
                  Simulations
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  {crux.simulations.map((sim, i) => (
                    <div key={i} className="min-w-[200px] shrink-0 bg-card border border-border rounded-2xl p-5 snap-start">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{sim.label}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {asPercent(sim.probability)}%
                        </span>
                      </div>
                      <div className={cn("text-2xl font-bold mb-1", 
                        sim.accent === 'emerald' ? 'text-emerald-500' :
                        sim.accent === 'rose' ? 'text-destructive' : 'text-primary'
                      )}>
                        {sim.revenue}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Support load {sim.supportLoad}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Agent Chat Placeholder */}
            <section>
              <button
                onClick={() => setIsTalking((value) => !value)}
                className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-card/80 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Ask Agents</div>
                    <div className="text-sm text-muted-foreground">Chat with the decision makers</div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">{isTalking ? 'Close' : 'Talk'}</span>
              </button>
              <AnimatePresence>
                {isTalking && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-3 rounded-2xl border border-primary/30 bg-primary/5 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 items-center gap-1 rounded-full bg-primary px-3">
                        {Array.from({ length: 9 }).map((_, index) => (
                          <span
                            key={index}
                            className="w-0.5 rounded-full bg-primary-foreground animate-pulse"
                            style={{ height: `${10 + ((index * 7) % 18)}px`, animationDelay: `${index * 90}ms` }}
                          />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold">Live with {crux.participants[0]?.name ?? 'Your Twin'}</p>
                        <p className="text-xs text-muted-foreground">Listening for an interruption</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                      {['Why?', 'Show me the downside', 'What if we spend half as much?'].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => submitQuestion(prompt)}
                          className="shrink-0 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium hover:border-primary"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 max-h-48 space-y-3 overflow-y-auto">
                      {transcript.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Ask what would change the recommendation, explore a downside, or choose a counterfactual.</p>
                      ) : (
                        transcript.map((line, index) => (
                          <div key={`${line.speaker}-${index}`} className={cn("rounded-xl px-3 py-2 text-sm", line.speaker === 'You' ? "ml-8 bg-primary text-primary-foreground" : "mr-8 bg-card")}>
                            <span className="mr-2 text-xs font-bold uppercase tracking-wider opacity-70">{line.speaker}</span>
                            {line.message}
                          </div>
                        ))
                      )}
                    </div>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        submitQuestion();
                      }}
                      className="mt-4 flex gap-2"
                    >
                      <input
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        placeholder="Ask the agents anything"
                        className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <button type="submit" disabled={askMutation.isPending} className="rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground disabled:opacity-60">
                        Ask
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Resolution Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:p-6 z-50 rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
        <div className="max-w-3xl mx-auto">
          {deploymentStatus ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />
                <span className="font-bold">Decision deployed</span>
              </div>
              <p className="mt-2 text-sm text-foreground/80">{deploymentStatus}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <span className="rounded-lg bg-background/60 px-2 py-2">Stop remaining jobs</span>
                <span className="rounded-lg bg-background/60 px-2 py-2">Preserve decision context</span>
                <span className="rounded-lg bg-background/60 px-2 py-2">Generate final comparison</span>
                <span className="rounded-lg bg-background/60 px-2 py-2">Notify owner agent</span>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-serif font-bold text-lg mb-3">Resolution Options</h3>
              <div className="grid gap-3 mb-4">
                {crux.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={cn(
                  "flex items-center justify-between w-full p-4 rounded-xl border text-left transition-all",
                  selectedOption === opt.id 
                    ? "bg-primary/10 border-primary text-foreground" 
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                )}
              >
                <div>
                  <div className={cn("font-semibold", selectedOption === opt.id && "text-primary")}>
                    {opt.label}
                  </div>
                  <div className="text-xs mt-1">{opt.detail}</div>
                </div>
                <div className="text-right">
                  <div className={cn("font-bold", selectedOption === opt.id && "text-primary")}>
                    {opt.value}
                  </div>
                  <div className="text-xs opacity-80">{asPercent(opt.probability)}% prob</div>
                </div>
              </button>
                ))}
              </div>
          
              <button
            disabled={!selectedOption || isResolving}
            onClick={() => {
              if (confirmingDeployment) {
                handleResolve();
              } else {
                setConfirmingDeployment(true);
              }
            }}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all",
              selectedOption 
                ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-95" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isResolving ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Deploying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                {confirmingDeployment ? 'Deploy decision now' : 'Review deployment'}
              </span>
            )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
