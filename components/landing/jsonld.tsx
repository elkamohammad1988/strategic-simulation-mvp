const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pulse.app";

export function LandingJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#org`,
        name: "Pulse Analytics",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        sameAs: [
          "https://twitter.com/pulseanalytics",
          "https://github.com/pulseanalytics",
          "https://www.linkedin.com/company/pulse-analytics",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: "Pulse",
        publisher: { "@id": `${SITE_URL}#org` },
      },
      {
        "@type": "SoftwareApplication",
        name: "Pulse",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description:
          "Pulse pulls revenue, product, and growth data into one live dashboard. No SQL, no warehouse setup.",
        offers: [
          {
            "@type": "Offer",
            name: "Solo",
            price: "0",
            priceCurrency: "USD",
            description: "1 workspace, 3 data sources, 10K events / month.",
          },
          {
            "@type": "Offer",
            name: "Team",
            price: "49",
            priceCurrency: "USD",
            description: "Unlimited workspaces, 5M events / month, AI summaries.",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "324",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
