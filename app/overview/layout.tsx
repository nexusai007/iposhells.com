import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Run Audit Overview | Secure Workflows & Verified Audit Trails",
  description: "Watch the Run Audit overview: connect operational performance, financial visibility, workflow governance, and accountable automation.",
  alternates: { canonical: "/overview" },
  openGraph: {
    type: "website",
    url: "https://runaudit.io/overview",
    siteName: "Run Audit",
    title: "Run Audit Overview | Secure Workflows & Verified Audit Trails",
    description: "A 75-second visual overview of Run Audit's approach to operational visibility and accountable automation."
  },
  twitter: {
    card: "summary",
    title: "Run Audit Overview",
    description: "A visual overview of secure workflows and verified audit trails."
  }
};

export default function OverviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
