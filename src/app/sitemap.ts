import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { concepts, products } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/start",
    ...services.map((s) => `/services/${s.slug}`),
    ...products.map((p) => `/work/${p.slug}`),
    ...concepts.map((c) => `/work/${c.slug}`),
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p.startsWith("/services") ? 0.9 : 0.7,
  }));
}
