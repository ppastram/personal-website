import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const essays = await getCollection('essays', ({ data }) => !data.draft);

// Build pages object: essay slugs + a default site image
const pages: Record<string, { title: string; description: string }> = {
  site: {
    title: 'Pablo Pastrana Vega',
    description: 'Exploring technology\'s impact on society. Building technology with a deliberate positive impact on its users.',
  },
};

for (const essay of essays) {
  pages[`essays/${essay.id}`] = {
    title: essay.data.title,
    description: essay.data.description,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[42, 24, 21]],
    border: {
      color: [184, 92, 60],
      width: 12,
      side: 'inline-start',
    },
    font: {
      title: {
        color: [250, 248, 245],
        size: 64,
        families: ['Fraunces'],
        weight: 'SemiBold',
      },
      description: {
        color: [212, 207, 200],
        size: 32,
        families: ['Inter'],
      },
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/fraunces:vf@latest/latin-wght-normal.woff2',
      'https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2',
    ],
    padding: 60,
  }),
});
