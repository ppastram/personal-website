export interface ReadingEntry {
  title: string;
  author: string;
  category: 'anthropology' | 'product' | 'governance' | 'ai' | 'other';
  year?: number;
  note?: string;
  url?: string;
}

export const readingList: ReadingEntry[] = [
  {
    title: 'Seeing Like a State',
    author: 'James C. Scott',
    category: 'anthropology',
    year: 1998,
    note: 'The best book I know on why top-down institutional schemes fail. Changed how I think about legibility, simplification, and the gap between planning and reality.',
  },
  {
    title: 'The Mushroom at the End of the World',
    author: 'Anna Lowenhaupt Tsing',
    category: 'anthropology',
    year: 2015,
    note: 'On precarity, supply chains, and what it means to build in the ruins of capitalism. Surprisingly relevant to product work.',
  },
  {
    title: 'Weapons of Math Destruction',
    author: 'Cathy O\'Neil',
    category: 'ai',
    year: 2016,
    note: 'An early and still-relevant account of how algorithmic systems reproduce inequality.',
  },
  {
    title: 'Inspired',
    author: 'Marty Cagan',
    category: 'product',
    year: 2017,
    note: 'The standard reference on product management in tech. I disagree with parts of it, but it\'s the shared language.',
  },
  {
    title: 'Governing the Commons',
    author: 'Elinor Ostrom',
    category: 'governance',
    year: 1990,
    note: 'Ostrom\'s work on how communities self-govern shared resources without centralized authority. Foundational for thinking about institutional design.',
  },
  {
    title: 'The Alignment Problem',
    author: 'Brian Christian',
    category: 'ai',
    year: 2020,
    note: 'A thorough survey of the AI alignment landscape. Good for understanding the technical and philosophical dimensions of the problem.',
  },
  {
    title: 'Anthropology and Development',
    author: 'Jean-Pierre Olivier de Sardan',
    category: 'anthropology',
    year: 2005,
    note: 'On the gap between development policy and its implementation. The parallels to software deployment in institutions are striking.',
  },
  {
    title: 'Working in Public',
    author: 'Nadia Eghbal',
    category: 'other',
    year: 2020,
    note: 'On the maintenance of open source software and the economics of attention. Changed how I think about building in public.',
  },
];

export const categories = ['anthropology', 'product', 'governance', 'ai', 'other'] as const;

export const categoryLabels: Record<string, { en: string; es: string }> = {
  anthropology: { en: 'Anthropology', es: 'Antropología' },
  product: { en: 'Product', es: 'Producto' },
  governance: { en: 'Governance', es: 'Gobernanza' },
  ai: { en: 'AI', es: 'IA' },
  other: { en: 'Other', es: 'Otros' },
};
