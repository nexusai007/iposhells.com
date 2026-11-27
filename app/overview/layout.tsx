import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Runaudit Overview | Secure Workflows & Verified Audit Trails",
  description: "Watch the Runaudit overview: connect operational performance, financial visibility, workflow governance, and accountable automation.",
  alternates: { canonical: "/overview" },
  openGraph: {
    type: "website",
    url: "https://runaudit.io/overview",
    siteName: "Runaudit",
    title: "Runaudit Overview | Secure Workflows & Verified Audit Trails",
    description: "A 75-second visual overview of Runaudit's approach to operational visibility and accountable automation."
  },
  twitter: {
    card: "summary",
    title: "Runaudit Overview",
    description: "A visual overview of secure workflows and verified audit trails."
  }
};

export default function OverviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
