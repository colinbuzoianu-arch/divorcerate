import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/pages";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / non-indexable areas (SEO rule 4).
      disallow: ["/r/", "/success", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
