export interface ProjectEntry {
  title: string;
  description: { en: string; es: string };
  url: string;
  year: number;
}

export const projectList: ProjectEntry[] = [
  {
    title: 'Adonay Distribution',
    url: 'https://www.adonaydistribution.com',
    year: 2021,
    description: {
      en: 'A footwear brand I co-founded during university (2021–2024). We held the exclusive distribution of legendary brand Feiyue for Colombia. I handled operations, supply chain, and the parts of building a physical product that no one warns you about. That experience shaped how I think about constraints — the kind you can\'t abstract away with software.',
      es: 'Una marca de calzado que cofundé durante la universidad (2021–2024). Tuvimos la distribución exclusiva de la legendaria marca Feiyue para Colombia. Manejé operaciones, cadena de suministro y las partes de construir un producto físico de las que nadie te advierte. Esa experiencia moldeó cómo pienso sobre las restricciones — el tipo que no se puede abstraer con software.',
    },
  },
  {
    title: 'Haciendo visible la ENUT',
    url: 'https://ppastram.pythonanywhere.com/#',
    year: 2024,
    description: {
      en: 'My anthropology undergraduate thesis at Universidad de los Andes, co-authored with Benjamín Reyes Pisciotti. Interactive data visualizations of Colombia\'s National Time Use Survey, making open data accessible to non-technical audiences. Built with Python, Plotly, and Flask.',
      es: 'Mi tesis de pregrado en antropología en la Universidad de los Andes, coautorada con Benjamín Reyes Pisciotti. Visualizaciones interactivas de la Encuesta Nacional de Uso del Tiempo de Colombia, haciendo datos abiertos accesibles para audiencias no técnicas. Construida con Python, Plotly y Flask.',
    },
  },
  {
    title: 'Ampolla Mundialista',
    url: 'https://ampollamundialista.com',
    year: 2026,
    description: {
      en: 'A World Cup prediction platform where participants compete with friends. Leaderboards, head-to-head comparisons, and a referral system. Running it since 2014.',
      es: 'Una plataforma de predicción del Mundial donde los participantes compiten con sus amigos. Tablas de posiciones, comparaciones directas y sistema de referidos. La organizo desde 2014.',
    },
  },
];
