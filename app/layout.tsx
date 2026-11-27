import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://runaudit.io";
const description =
  "Identify costly manual work, improve workforce productivity, and prioritize workflow automation. Run Audit helps executives assess operational efficiency, workforce productivity and workflow automation ROI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Run Audit | Labor Cost Reduction & Workflow Automation",
    template: "%s | Run Audit"
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
  ],
  applicationName: "Run Audit",
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
    siteName: "Run Audit",
    title: "Run Audit | Reduce Manual Work & Labor Costs",
    description,
    images: [{ url: "/runaudit-logo.webp", width: 1200, height: 630, alt: "Run Audit — Secure Workflows. Verified Audit Trails." }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Run Audit | Reduce Manual Work & Labor Costs",
    description,
    images: ["/runaudit-logo.webp"]
  },
  icons: {
    icon: "/runaudit-logo.webp",
    apple: "/runaudit-logo.webp"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101a24"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Run Audit",
  url: siteUrl,
  logo: `${siteUrl}/runaudit-logo.webp`,
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