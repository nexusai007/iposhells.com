import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://runaudit.io";
const description =
  "Runaudit helps teams identify, assess, and automate business workflows with governed AI, secure integrations, and measurable operational improvements.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Runaudit | AI Workflow Audits & Enterprise Automation",
    template: "%s | Runaudit"
  },
  description,
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
    title: "Runaudit | AI Workflow Audits & Enterprise Automation",
    description,
    images: [{ url: "/run-logo.jpg", width: 1200, height: 630, alt: "Runaudit" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Runaudit | AI Workflow Audits & Enterprise Automation",
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