import { SITE_URL, SITE_NAME } from "@/lib/site";
import type { ToolMeta } from "@/lib/tools";

interface Faq {
  question: string;
  answer: string;
}

/**
 * WebApplication schema for a single generator tool. Marked free and in the
 * Developer/Security category, which is how these tools are discovered.
 */
export function toolApplicationSchema(tool: ToolMeta, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${tool.name} - ${SITE_NAME}`,
    url: `${SITE_URL}${tool.href}`,
    description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (browser-based)",
    browserRequirements: "Requires JavaScript and the Web Crypto API",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** FAQPage schema built from a tool page's question/answer content. */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
