export interface ReadingEntry {
  title: string;
  author: string;
  category: 'anthropology' | 'product' | 'organizations' | 'ai' | 'purpose';
  year?: number;
  note: { en: string; es: string };
  url?: string;
}

export const readingList: ReadingEntry[] = [
  {
    title: 'The Mushroom at the End of the World',
    author: 'Anna Lowenhaupt Tsing',
    category: 'anthropology',
    year: 2015,
    note: {
      en: 'On precarity, supply chains, and what it means to build in the ruins of capitalism. Surprisingly relevant to product work.',
      es: 'Sobre precariedad, cadenas de suministro y lo que significa construir entre las ruinas del capitalismo. Sorprendentemente relevante para trabajo de producto.',
    },
  },
  {
    title: 'Body Ritual Among the Nacirema',
    author: 'Horace Miner',
    category: 'anthropology',
    year: 1956,
    note: {
      en: 'A six-page essay that reframes the familiar as exotic. The best introduction to the anthropological gaze I know.',
      es: 'Un ensayo de seis páginas que reenmarca lo familiar como exótico. La mejor introducción a la mirada antropológica que conozco.',
    },
  },
  {
    title: 'Bullshit Jobs',
    author: 'David Graeber',
    category: 'anthropology',
    year: 2018,
    note: {
      en: 'On the proliferation of pointless work and what it reveals about how institutions actually allocate effort.',
      es: 'Sobre la proliferación del trabajo sin sentido y lo que revela sobre cómo las instituciones realmente asignan el esfuerzo.',
    },
  },
  {
    title: 'Taste for Makers',
    author: 'Paul Graham',
    category: 'product',
    year: 2002,
    url: 'https://paulgraham.com/taste.html',
    note: {
      en: 'Written more than two decades ago, feels more relevant today than ever. When AI lets you build infinitely fast, taste is the only bottleneck left.',
      es: 'Escrito hace más de dos décadas, se siente más relevante hoy que nunca. Cuando la IA te permite construir infinitamente rápido, el gusto es el único cuello de botella que queda.',
    },
  },
  {
    title: 'Inspired',
    author: 'Marty Cagan',
    category: 'product',
    year: 2017,
    note: {
      en: 'The standard reference on product management in tech. I disagree with parts of it, but it\'s the shared language.',
      es: 'La referencia estándar sobre gestión de producto en tecnología. No estoy de acuerdo con todo, pero es el lenguaje compartido.',
    },
  },
  {
    title: 'BlueDot Impact',
    author: 'BlueDot Impact',
    category: 'organizations',
    url: 'https://bluedot.org',
    note: {
      en: 'Courses on AI safety and governance. A serious entry point for anyone who wants to work on these problems.',
      es: 'Cursos sobre seguridad y gobernanza de IA. Un punto de entrada serio para cualquiera que quiera trabajar en estos problemas.',
    },
  },
  {
    title: 'Center for Humane Technology',
    author: 'Center for Humane Technology',
    category: 'organizations',
    url: 'https://www.humanetech.com',
    note: {
      en: 'Thinking clearly about the incentive structures behind attention-driven technology and what alternatives look like.',
      es: 'Pensando con claridad sobre las estructuras de incentivos detrás de la tecnología basada en atención y cómo se ven las alternativas.',
    },
  },
  {
    title: 'The Alignment Problem',
    author: 'Brian Christian',
    category: 'ai',
    year: 2020,
    note: {
      en: 'A thorough survey of the AI alignment landscape. Good for understanding the technical and philosophical dimensions of the problem.',
      es: 'Un recorrido completo por el panorama del alineamiento de IA. Bueno para entender las dimensiones técnicas y filosóficas del problema.',
    },
  },
  {
    title: 'Machines of Loving Grace',
    author: 'Dario Amodei',
    category: 'ai',
    year: 2024,
    url: 'https://dario.ai/essay/machines-of-loving-grace',
    note: {
      en: 'A concrete, optimistic vision of what AI could do for science, health, and governance — from someone building the systems.',
      es: 'Una visión concreta y optimista de lo que la IA podría hacer por la ciencia, la salud y la gobernanza — de alguien que está construyendo los sistemas.',
    },
  },
  {
    title: 'The Coming Wave',
    author: 'Mustafa Suleyman',
    category: 'ai',
    year: 2023,
    note: {
      en: 'On the convergence of AI and synthetic biology, and the containment problem that no one has solved yet.',
      es: 'Sobre la convergencia de IA y biología sintética, y el problema de contención que nadie ha resuelto todavía.',
    },
  },
  {
    title: 'Astronomical Waste: The Opportunity Cost of Delayed Technological Development',
    author: 'Nick Bostrom',
    category: 'purpose',
    year: 2003,
    url: 'https://nickbostrom.com/papers/astronomical-waste/',
    note: {
      en: 'A short paper that reframes urgency. Every moment of delay in reducing existential risk has a cost measured in potential lives — an argument that changes how you prioritize.',
      es: 'Un artículo corto que reenmarca la urgencia. Cada momento de demora en reducir el riesgo existencial tiene un costo medido en vidas potenciales — un argumento que cambia cómo priorizas.',
    },
  },
  {
    title: 'La fiesta de la insignificancia',
    author: 'Milan Kundera',
    category: 'purpose',
    year: 2013,
    note: {
      en: 'Kundera\'s last novel. A quiet meditation on the lightness of meaning — and why that lightness might be the point.',
      es: 'La última novela de Kundera. Una meditación silenciosa sobre la levedad del sentido — y por qué esa levedad podría ser el punto.',
    },
  },
  {
    title: 'What Makes a Good Life? Lessons from the Longest Study on Happiness',
    author: 'Robert Waldinger',
    category: 'purpose',
    url: 'https://www.ted.com/talks/robert_waldinger_what_makes_a_good_life_lessons_from_the_longest_study_on_happiness',
    year: 2015,
    note: {
      en: 'Seventy-five years of data, one finding: relationships. The simplest answer that keeps being right.',
      es: 'Setenta y cinco años de datos, un hallazgo: las relaciones. La respuesta más simple que sigue siendo correcta.',
    },
  },
];

export const categories = ['product', 'ai', 'anthropology', 'organizations', 'purpose'] as const;

export const categoryLabels: Record<string, { en: string; es: string }> = {
  anthropology: { en: 'Anthropology', es: 'Antropología' },
  product: { en: 'Product', es: 'Producto' },
  organizations: { en: 'Organizations', es: 'Organizaciones' },
  ai: { en: 'AI', es: 'IA' },
  purpose: { en: 'Purpose', es: 'Propósito' },
};
