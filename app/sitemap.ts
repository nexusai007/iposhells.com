import type { MetadataRoute } from "next";

const siteUrl = "https://runaudit.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/roi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 }
  ];
}
