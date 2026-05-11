import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const essays = (await getCollection('essays', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Pablo Pastrana Vega',
    description: 'Essays on product, anthropology, governance, and AI — from the intersection of computer science and how technology meets institutions.',
    site: context.site!,
    items: essays.map((essay) => ({
      title: essay.data.title,
      pubDate: essay.data.pubDate,
      description: essay.data.description,
      link: `/en/essays/${essay.id}/`,
      categories: essay.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
