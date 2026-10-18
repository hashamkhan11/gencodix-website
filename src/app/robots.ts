import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// AI crawlers are explicitly welcome: being cited by AI assistants is part of the strategy.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
