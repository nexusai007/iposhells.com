import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://runaudit.io";
const description =
  "Identify costly manual work, improve workforce productivity, and prioritize workflow automation. Runaudit helps executives assess operational efficiency and automation ROI, with a 14-day free trial at $0 to get started.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Runaudit | Labor Cost Reduction & Workflow Automation",
    template: "%s | Runaudit"
  },
  description,
  keywords: [
    "labor cost reduction",
    "workforce productivity",
    "reduce manual work",
    "business process automation",
    "workflow automation",
    "operational efficiency",
    "automation ROI",
    "CFO cost management",
    "enterprise workflow governance",
    "14-day free trial",
    "free workflow automation trial"
  ],
  applicationName: "Runaudit",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Runaudit",
    title: "Runaudit | Reduce Manual Work & Labor Costs",
    description,
    images: [{ url: "/run-logo.jpg", width: 1200, height: 630, alt: "Runaudit — Secure Workflows. Verified Audit Trails." }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Runaudit | Reduce Manual Work & Labor Costs",
    description,
    images: ["/run-logo.jpg"]
  },
  icons: {
    icon: "/run-logo.jpg",
    apple: "/run-logo.jpg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101b2c"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Runaudit",
  url: siteUrl,
  logo: `${siteUrl}/run-logo.jpg`,
  description
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}