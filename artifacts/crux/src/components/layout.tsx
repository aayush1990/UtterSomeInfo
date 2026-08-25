import React from 'react';
import { useLocation, Link } from 'wouter';
import { LayoutDashboard, Zap, Activity, BrainCircuit, UserCircle, Hexagon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: '/', label: 'Crux', icon: Hexagon },
    { href: '/running', label: 'Running', icon: Activity },
    { href: '/portfolio', label: 'Portfolio', icon: LayoutDashboard },
    { href: '/learned', label: 'Learned', icon: BrainCircuit },
    { href: '/you', label: 'You', icon: UserCircle },
  ];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col md:flex-row selection:bg-primary selection:text-primary-foreground">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-md sticky top-0 h-screen p-4">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Zap size={18} className="fill-current" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">IncOS</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group select-none",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                  <item.icon size={20} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
        {children}
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-lg z-50 px-2 py-2 flex items-center justify-around pb-safe">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className="flex flex-col items-center gap-1 p-2 min-w-[4rem] cursor-pointer touch-manipulation">
                <div className={cn(
                  "p-1.5 rounded-full transition-all",
                  isActive ? "bg-primary/20 text-primary" : "text-muted-foreground"
                )}>
                  <item.icon size={22} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
