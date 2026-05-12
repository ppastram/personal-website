export interface ProjectEntry {
  title: string;
  description: { en: string; es: string };
  url: string;
  year: number;
}

export const projectList: ProjectEntry[] = [
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
