import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services/air-cargo",
    "/services/sea-cargo",
    "/services/parcel-courier",
    "/urgent-shipping",
    "/shipping-routes",
    "/get-a-quote",
    "/how-it-works",
    "/about",
    "/faq",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/shipping-terms",
  ];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/get-a-quote" ? 0.9 : 0.7,
  }));
}
