import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../site-config";

export async function GET(context) {
  const writing = (await getCollection("writing")).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  return rss({
    title: `${siteConfig.name} — Writing`,
    description: "Field notes on product engineering, local-first software, automation, and building complete products.",
    site: context.site,
    items: writing.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: article.data.canonicalUrl,
      categories: article.data.topics,
    })),
  });
}
