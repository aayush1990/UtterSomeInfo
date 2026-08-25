import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

import { Layout } from '@/components/layout';
import { Feed } from '@/pages/feed';
import { CruxDetail } from '@/pages/crux-detail';
import { RunningLoops } from '@/pages/running';
import { Portfolio } from '@/pages/portfolio';
import { Learned } from '@/pages/learned';
import { You } from '@/pages/you';
import { MultimodalLab } from '@/pages/lab';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Feed} />
          <Route path="/crux/:id" component={CruxDetail} />
          <Route path="/running" component={RunningLoops} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/learned" component={Learned} />
          <Route path="/you" component={You} />
          <Route path="/lab" component={MultimodalLab} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Layout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
