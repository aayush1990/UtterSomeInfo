import React from 'react';
import { useSafePreferences } from '@/lib/safe-hooks';
import { Link } from 'wouter';
import { Settings, User, Bell, Shield, Mic2, ArrowRight } from 'lucide-react';

export function You() {
  const { data: prefs, isLoading } = useSafePreferences();

  if (isLoading) {
    return <div className="p-8 animate-pulse"><div className="h-64 bg-card rounded-3xl" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 pt-12 md:pt-16">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">You</h1>
        <p className="text-muted-foreground text-lg">Preferences and identity configuration.</p>
      </header>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-3xl p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center overflow-hidden border-2 border-primary">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif">Executive Mode</h2>
            <p className="text-muted-foreground">Current stance: <span className="text-primary font-medium capitalize">{prefs.mode}</span></p>
          </div>
        </div>

        {/* Algorithm Settings */}
        <section className="bg-card border border-border rounded-3xl p-6">
          <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
            <Settings size={20} className="text-primary" />
            Feed Algorithm
          </h3>
          
          <div className="space-y-6">
            {[
              { label: 'Importance', value: prefs.importance },
              { label: 'Urgency', value: prefs.urgency },
              { label: 'Risk Tolerance', value: prefs.risk },
              { label: 'Novelty', value: prefs.novelty }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>{item.label}</span>
                  <span className="text-primary">{item.value}/10</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${item.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications & Security */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link href="/lab">
            <div className="h-full cursor-pointer rounded-xl border border-primary/30 bg-primary p-6 text-primary-foreground transition-colors hover:bg-primary/90">
              <div className="mb-4 flex items-center justify-between">
                <Mic2 size={24} />
                <ArrowRight size={18} />
              </div>
              <h4 className="mb-1 font-bold">Multimodal Lab</h4>
              <p className="text-sm text-primary-foreground/75">Test voice, audio, image, and video inputs.</p>
            </div>
          </Link>
          <div className="cursor-pointer rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
            <Bell size={24} className="text-muted-foreground mb-4" />
            <h4 className="font-bold mb-1">Notifications</h4>
            <p className="text-sm text-muted-foreground">Manage push and email digests.</p>
          </div>
          <div className="cursor-pointer rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
            <Shield size={24} className="text-muted-foreground mb-4" />
            <h4 className="font-bold mb-1">Integrations</h4>
            <p className="text-sm text-muted-foreground">Connected data sources.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
