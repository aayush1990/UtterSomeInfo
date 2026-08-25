import type {
  Crux,
  Learned,
  Portfolio,
  Preferences,
  RunningLoop,
} from "@workspace/api-zod";

export const cruxes: Crux[] = [
  {
    id: "cruxbench-stop",
    title: "Stop CruxBench at 500 episodes?",
    category: "Research",
    goal: "Choose the evaluation point that gives the team a reliable model comparison without wasting compute.",
    owner: "Research Agent",
    narratedSummary:
      "Another 500 episodes cost about $34, but there is only a 12% chance the extra data changes which checkpoint wins.",
    urgency: "Today",
    deadline: "Today, 4:00 PM",
    expectedValue: "$8.4K",
    attention: "45 sec",
    cost: "$34",
    risk: "Low",
    reversibility: "Easy to reverse",
    confidence: 88,
    recommendation: "Stop at 500",
    priorityReason: "High priority · $8.4K expected value at stake",
    options: [
      { id: "stop-500", label: "Stop at 500", probability: 88, value: "$8.4K EV", detail: "Preserve the current lead and free compute for the launch run." },
      { id: "run-1000", label: "Run to 1,000", probability: 12, value: "$34 cost", detail: "Buy more certainty, with a small chance the ranking changes." },
    ],
    evidence: [
      { source: "Evaluation run", detail: "Checkpoint 3 leads by 4.1 points across 500 episodes.", signal: "positive" },
      { source: "Historical variance", detail: "Only 1 in 8 comparable runs changed leader after episode 500.", signal: "positive" },
      { source: "Budget guardrail", detail: "Research compute is 18% above its weekly median.", signal: "negative" },
    ],
    assumptions: ["The current benchmark mix represents the launch workload.", "Checkpoint 3's lead is not a sampling artifact."],
    unresolvedQuestions: ["Would the enterprise slice reverse the result?", "Is the next evaluation more valuable than more episodes?"],
    simulations: [
      { label: "Stop now", probability: 88, revenue: "+$8.4K", supportLoad: "-12%", accent: "mint" },
      { label: "Run to 1,000", probability: 12, revenue: "+$8.8K", supportLoad: "-10%", accent: "amber" },
    ],
    participants: [
      { name: "Your Twin", role: "Decision owner", initials: "YT", color: "violet" },
      { name: "Research", role: "Evidence", initials: "RS", color: "blue" },
      { name: "Finance", role: "Cost", initials: "FN", color: "orange" },
    ],
    status: "open",
    selectedResolution: null,
    deploymentStatus: null,
  },
  {
    id: "enterprise-pilot",
    title: "Ship the enterprise pilot this Friday?",
    category: "Product",
    goal: "Get the first enterprise design partner to value without creating an avoidable support fire.",
    owner: "Operator",
    narratedSummary:
      "Shipping Friday unlocks the pilot and $42K of expected expansion value, but support load could spike 2.4× during onboarding.",
    urgency: "High",
    deadline: "Friday, 9:00 AM",
    expectedValue: "$42K",
    attention: "2 min",
    cost: "$11.2K",
    risk: "Medium",
    reversibility: "Partially reversible",
    confidence: 71,
    recommendation: "Limited rollout",
    priorityReason: "High priority · unlocks the enterprise pilot",
    options: [
      { id: "ship-friday", label: "Ship Friday", probability: 61, value: "+$42K", detail: "Move fast, with the full onboarding surface available to the pilot team." },
      { id: "delay-two", label: "Delay 2 weeks", probability: 73, value: "+$31K", detail: "Buy time for support readiness and a more complete onboarding flow." },
      { id: "limited-rollout", label: "Limited rollout", probability: 78, value: "+$34K", detail: "Keep the pilot small while learning where the workflow breaks." },
    ],
    evidence: [
      { source: "Pilot readiness", detail: "Core workflow passes 94% of scripted acceptance checks.", signal: "positive" },
      { source: "Support forecast", detail: "Projected onboarding volume is 2.4× the current weekly capacity.", signal: "negative" },
      { source: "Design partner", detail: "Pilot team is available Friday and has budget approved.", signal: "positive" },
    ],
    assumptions: ["The pilot cohort will stay under 12 seats.", "The Operator can pause expansion if support queue exceeds 8 hours."],
    unresolvedQuestions: ["What does a successful first week look like?", "Which onboarding step creates the most support load?"],
    simulations: [
      { label: "Ship Friday", probability: 61, revenue: "+$380K", supportLoad: "+140%", accent: "coral" },
      { label: "Delay 2 weeks", probability: 73, revenue: "+$310K", supportLoad: "+40%", accent: "blue" },
      { label: "Limited rollout", probability: 78, revenue: "+$340K", supportLoad: "+55%", accent: "mint" },
    ],
    participants: [
      { name: "Operator", role: "Execution", initials: "OP", color: "coral" },
      { name: "Skeptic", role: "Counterweight", initials: "SK", color: "yellow" },
      { name: "Finance", role: "Expected value", initials: "FN", color: "orange" },
      { name: "Risk", role: "Guardrails", initials: "RK", color: "blue" },
    ],
    status: "open",
    selectedResolution: null,
    deploymentStatus: null,
  },
  {
    id: "pricing-experiment",
    title: "Test the $249 team plan next week?",
    category: "Finance",
    goal: "Find a pricing floor that grows qualified pipeline without lowering conversion quality.",
    owner: "Finance Agent",
    narratedSummary:
      "A higher team plan could add $18K in monthly recurring revenue, but the evidence is thin and the test is reversible.",
    urgency: "This week",
    deadline: "Wednesday, 12:00 PM",
    expectedValue: "$18K MRR",
    attention: "1 min",
    cost: "$1.8K",
    risk: "Medium",
    reversibility: "Easy to reverse",
    confidence: 64,
    recommendation: "Run the test",
    priorityReason: "Medium priority · low-cost learning with upside",
    options: [
      { id: "run-test", label: "Run test", probability: 64, value: "+$18K MRR", detail: "Show the plan to new teams for one week with a clean rollback." },
      { id: "hold-price", label: "Hold current price", probability: 52, value: "$0 cost", detail: "Keep conversion stable while collecting more demand signals." },
    ],
    evidence: [
      { source: "Win/loss notes", detail: "Three teams asked for more seats without negotiating price.", signal: "positive" },
      { source: "Conversion trend", detail: "Qualified trial-to-paid conversion is flat over four weeks.", signal: "neutral" },
    ],
    assumptions: ["The test cohort will contain at least 40 new teams.", "Price can be rolled back without customer confusion."],
    unresolvedQuestions: ["Will higher price filter out the right customers?", "Should annual billing be included in the test?"],
    simulations: [
      { label: "Run test", probability: 64, revenue: "+$18K", supportLoad: "+8%", accent: "mint" },
      { label: "Hold price", probability: 52, revenue: "+$6K", supportLoad: "0%", accent: "blue" },
    ],
    participants: [
      { name: "Finance", role: "Expected value", initials: "FN", color: "orange" },
      { name: "Research", role: "Customer signal", initials: "RS", color: "blue" },
      { name: "Your Twin", role: "Decision owner", initials: "YT", color: "violet" },
    ],
    status: "open",
    selectedResolution: null,
    deploymentStatus: null,
  },
  {
    id: "aws-spend",
    title: "Cap the nightly inference sweep?",
    category: "Operations",
    goal: "Protect the monthly compute budget while keeping the monitoring loop useful.",
    owner: "Operator",
    narratedSummary:
      "The nightly sweep is catching real regressions, but its last 20% of coverage costs nearly half the run budget.",
    urgency: "Tomorrow",
    deadline: "Tomorrow, 8:00 AM",
    expectedValue: "$3.1K",
    attention: "30 sec",
    cost: "$420 / week",
    risk: "Low",
    reversibility: "Easy to reverse",
    confidence: 82,
    recommendation: "Cap at 80% coverage",
    priorityReason: "Worth reviewing · $3.1K monthly spend at stake",
    options: [
      { id: "cap-80", label: "Cap at 80%", probability: 82, value: "Save $420/wk", detail: "Keep the highest-signal checks and cut the long tail." },
      { id: "keep-full", label: "Keep full sweep", probability: 69, value: "Full coverage", detail: "Preserve maximum detection coverage and accept the current spend." },
    ],
    evidence: [
      { source: "Spend monitor", detail: "The final 20% of cases represents 47% of sweep cost.", signal: "negative" },
      { source: "Regression history", detail: "No launch-blocking issue has appeared in the long-tail cases.", signal: "positive" },
    ],
    assumptions: ["The high-signal slice continues to catch regressions.", "A weekly full sweep can cover the long tail."],
    unresolvedQuestions: ["How often should the full sweep run?", "Can the low-signal cases be sampled instead?"],
    simulations: [
      { label: "Cap at 80%", probability: 82, revenue: "+$3.1K", supportLoad: "-4%", accent: "mint" },
      { label: "Keep full", probability: 69, revenue: "+$2.2K", supportLoad: "-8%", accent: "amber" },
    ],
    participants: [
      { name: "Operator", role: "Execution", initials: "OP", color: "coral" },
      { name: "Risk", role: "Guardrails", initials: "RK", color: "blue" },
    ],
    status: "open",
    selectedResolution: null,
    deploymentStatus: null,
  },
];

export const portfolio: Portfolio = {
  totalInvested: "$18,420",
  totalExpectedValue: "$92.6K",
  attentionSaved: "6h 48m",
  projects: [
    { name: "CruxBench", code: "CRX", invested: "$1,420", agentHours: 184, humanHours: 3.2, probability: 71, activeAgents: 4, unresolved: 2, progress: 68, risk: "Low" },
    { name: "MCP Launch", code: "MCP", invested: "$8,840", agentHours: 492, humanHours: 8.4, probability: 78, activeAgents: 7, unresolved: 1, progress: 82, risk: "Medium" },
    { name: "Customer Research", code: "CUS", invested: "$3,260", agentHours: 118, humanHours: 2.1, probability: 84, activeAgents: 4, unresolved: 3, progress: 49, risk: "Low" },
  ],
};

export const runningLoops: RunningLoop[] = [
  { name: "CruxBench Evaluation", goal: "Find the strongest checkpoint for launch", progress: 68, spend: "$184 / $240", time: "2h 18m", lastAction: "Compared checkpoint 3 against 4", nextMilestone: "500 episode readout", status: "running", agents: 4 },
  { name: "MCP Launch", goal: "Prepare the connector for first pilot", progress: 82, spend: "$1,040 / $1,200", time: "8h 42m", lastAction: "Generated rollback plan", nextMilestone: "Pilot readiness review", status: "running", agents: 7 },
  { name: "Customer Research", goal: "Understand why teams stall at onboarding", progress: 49, spend: "$420 / $600", time: "4h 06m", lastAction: "Clustered 38 interview notes", nextMilestone: "Surface top 3 blockers", status: "running", agents: 4 },
  { name: "Pricing Experiment", goal: "Validate the $249 team plan", progress: 22, spend: "$68 / $240", time: "36m", lastAction: "Waiting for trial cohort", nextMilestone: "First conversion signal", status: "waiting", agents: 2 },
  { name: "AWS Spend Monitor", goal: "Keep inference spend within guardrails", progress: 91, spend: "$72 / $100", time: "6d 14h", lastAction: "Flagged nightly sweep tail", nextMilestone: "Weekly budget close", status: "running", agents: 1 },
];

export const learned: Learned = {
  weeklyDecisions: 17,
  weeklySaved: "2h 14m / week",
  policies: [
    { name: "Small evaluation tails", description: "Stop benchmark runs when the leader has an 85%+ probability of holding.", decisions: 8, saved: "46m / wk", enabled: true },
    { name: "Support-aware launches", description: "Prefer limited rollouts when forecast support load exceeds 2× capacity.", decisions: 4, saved: "31m / wk", enabled: true },
    { name: "Reversible experiments", description: "Auto-approve low-cost tests with a clean rollback and clear success signal.", decisions: 5, saved: "57m / wk", enabled: true },
  ],
};

export let preferences: Preferences = {
  mode: "operator",
  importance: 82,
  urgency: 74,
  learning: 58,
  novelty: 44,
  risk: 66,
  cost: 51,
};