import type { Crux, Portfolio, RunningLoop, Learned, Preferences } from '@workspace/api-client-react';

export const MOCK_CRUXES: Crux[] = [
  {
    id: 'crx-1',
    title: 'Acquire Syntax Dynamics?',
    category: 'M&A',
    goal: 'Accelerate IDE market penetration',
    owner: 'Strategic M&A Agent',
    narratedSummary: 'Syntax Dynamics has an impressive user base of 400k developers. Acquiring them would leapfrog our go-to-market by 18 months, but their technical debt introduces significant integration risk.',
    urgency: 'High - Term sheet expires in 48 hours',
    deadline: new Date(Date.now() + 172800000).toISOString(),
    expectedValue: '+$14.2M ARR',
    attention: 'High (requires board approval)',
    cost: '$24M Cash + Equity',
    risk: 'High',
    reversibility: 'Irreversible',
    confidence: 0.82,
    recommendation: 'Proceed with acquisition',
    priorityReason: 'Competitor preparing counter-offer. Strategic value outweights technical integration risks.',
    options: [
      { id: 'opt-1', label: 'Acquire', probability: 0.82, value: '+$14.2M', detail: 'Execute term sheet' },
      { id: 'opt-2', label: 'Pass', probability: 0.18, value: '$0', detail: 'Walk away' },
      { id: 'opt-3', label: 'Renegotiate', probability: 0.45, value: '+$12M', detail: 'Lower cash portion' }
    ],
    evidence: [
      { source: 'Market Analysis', detail: '400k active users map perfectly to our target demographic.', signal: 'positive' },
      { source: 'Code Audit', detail: 'Core architecture requires a rewrite within 12 months.', signal: 'negative' }
    ],
    assumptions: [
      'We can retain 80% of their users post-acquisition',
      'Integration costs will not exceed $2M'
    ],
    unresolvedQuestions: [
      'Will their lead engineers stay post-vesting?'
    ],
    simulations: [
      { label: 'Best Case', probability: 0.2, revenue: '+$22M', supportLoad: '+15%', accent: 'emerald' },
      { label: 'Base Case', probability: 0.6, revenue: '+$14M', supportLoad: '+25%', accent: 'blue' },
      { label: 'Worst Case', probability: 0.2, revenue: '+$6M', supportLoad: '+60%', accent: 'rose' }
    ],
    participants: [
      { name: 'M&A Agent', role: 'Lead Analyst', initials: 'MA', color: 'bg-primary' },
      { name: 'Tech Due Diligence', role: 'Risk', initials: 'TD', color: 'bg-blue-500' }
    ],
    status: 'open'
  },
  {
    id: 'crx-2',
    title: 'Deploy New Pricing Model',
    category: 'Monetization',
    goal: 'Optimize LTV to CAC ratio',
    owner: 'Revenue Agent',
    narratedSummary: 'Switching to usage-based pricing for the enterprise tier could increase ARPU by 34%, but simulations show a 12% churn risk among legacy customers.',
    urgency: 'Medium',
    deadline: new Date(Date.now() + 864000000).toISOString(),
    expectedValue: '+$2.1M ARR',
    attention: 'Medium',
    cost: '$0',
    risk: 'Medium',
    reversibility: 'Reversible within 30 days',
    confidence: 0.89,
    recommendation: 'Deploy to 10% cohort',
    priorityReason: 'Revenue optimization is Q3 priority.',
    options: [
      { id: 'opt-1', label: 'Deploy Full', probability: 0.6, value: '+$2.1M', detail: 'All customers' },
      { id: 'opt-2', label: 'Deploy 10%', probability: 0.9, value: '+$200k', detail: 'Canary release' }
    ],
    evidence: [
      { source: 'Competitor Data', detail: 'Market is moving toward usage-based.', signal: 'positive' }
    ],
    assumptions: ['Usage will not drop when metered'],
    unresolvedQuestions: [],
    simulations: [],
    participants: [
      { name: 'Revenue Agent', role: 'Lead', initials: 'RA', color: 'bg-emerald-500' }
    ],
    status: 'open'
  }
];

export const MOCK_PORTFOLIO: Portfolio = {
  totalInvested: '$4.2M',
  totalExpectedValue: '$18.5M',
  attentionSaved: '2,450 hrs',
  projects: [
    { name: 'Project Apollo', code: 'APL-1', invested: '$1.2M', agentHours: 4500, humanHours: 120, probability: 0.85, activeAgents: 12, unresolved: 3, progress: 75, risk: 'Low' },
    { name: 'Project Borealis', code: 'BRL-2', invested: '$800k', agentHours: 2100, humanHours: 340, probability: 0.45, activeAgents: 4, unresolved: 12, progress: 30, risk: 'High' }
  ]
};

export const MOCK_RUNNING_LOOPS: RunningLoop[] = [
  { name: 'Market Sentiment Tracker', goal: 'Monitor brand perception', progress: 100, spend: '$45/day', time: 'Running 24/7', lastAction: 'Compiled daily digest', nextMilestone: 'Weekly summary (Friday)', status: 'running', agents: 3 },
  { name: 'Lead Enrichment Pipeline', goal: 'Enrich inbound leads with clearbit data', progress: 45, spend: '$120/day', time: 'Running for 3h', lastAction: 'Enriched 400 leads', nextMilestone: 'Sync to CRM', status: 'running', agents: 2 }
];

export const MOCK_LEARNED: Learned = {
  weeklyDecisions: 142,
  weeklySaved: '84 hrs',
  policies: [
    { name: 'Auto-approve SaaS < $500', description: 'Automatically approve software subscriptions under $500/mo', decisions: 45, saved: '12 hrs', enabled: true },
    { name: 'Reject low-intent leads', description: 'Filter out leads missing business email and phone', decisions: 89, saved: '40 hrs', enabled: true }
  ]
};

export const MOCK_PREFERENCES: Preferences = {
  mode: 'portfolio',
  importance: 8,
  urgency: 7,
  learning: 5,
  novelty: 4,
  risk: 6,
  cost: 7
};
