export const WORKFLOWS = [
  { id: "autonomous-outbound-engine", name: "Autonomous Outbound Engine", monthlyUsd: 149 },
  { id: "account-based-outreach-pipeline", name: "Account-Based Outreach Pipeline", monthlyUsd: 129 },
  { id: "lead-enrichment-scoring", name: "Lead Enrichment & Scoring", monthlyUsd: 79 },
  { id: "market-signal-monitoring", name: "Market Signal Monitoring", monthlyUsd: 99 },
  { id: "account-intelligence-pipeline", name: "Account Intelligence Pipeline", monthlyUsd: 109 },
  { id: "competitive-landscape-tracker", name: "Competitive Landscape Tracker", monthlyUsd: 89 },
  { id: "ticket-triage-routing", name: "Ticket Triage & Routing", monthlyUsd: 69 },
  { id: "sla-monitoring-alerts", name: "SLA Monitoring & Alerts", monthlyUsd: 59 },
  { id: "operational-status-broadcasting", name: "Operational Status Broadcasting", monthlyUsd: 49 },
  { id: "data-validation-cleansing", name: "Data Validation & Cleansing", monthlyUsd: 79 },
  { id: "multi-system-sync", name: "Multi-System Sync", monthlyUsd: 119 },
  { id: "analytics-feed-preparation", name: "Analytics Feed Preparation", monthlyUsd: 89 },
  { id: "audit-log-aggregation", name: "Audit Log Aggregation", monthlyUsd: 99 },
  { id: "policy-violation-detection", name: "Policy Violation Detection", monthlyUsd: 119 },
  { id: "compliance-report-generation", name: "Compliance Report Generation", monthlyUsd: 139 }
] as const;
export type BillingInterval = "month" | "year";
export function getWorkflow(id: string) {
  return WORKFLOWS.find((workflow) => workflow.id === id);
}
