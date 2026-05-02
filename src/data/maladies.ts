import { Maladie } from '../types';

export const maladies: Maladie[] = [
  {
    id: 1,
    nom: 'Mildiou de la tomate',
    description: 'Le mildiou est une maladie fongique causée par Phytophthora infestans. Elle se manifeste par des taches brunes sur les feuilles, souvent entourées d\'un halo jaune. Les fruits peuvent aussi être affectés avec des zones brunes et dures.',
    traitement: 'Appliquer un fongicide à base de cuivre (bouillie bordelaise). Retirer et détruire les parties infectées. Assurer une bonne circulation d\'air entre les plants. Éviter l\'arrosage par aspersion.',
    plante: 'Tomate',
    severity: 'élevée',
  },
  {
    id: 2,
    nom: 'Oïdium du blé',
    description: 'L\'oïdium est causé par le champignon Blumeria graminis. Il se caractérise par un feutrage blanc-grisâtre sur les feuilles et les tiges. La maladie réduit la photosynthèse et peut entraîner une baisse significative du rendement.',
    traitement: 'Utiliser des variétés résistantes. Appliquer des fongicides à base de soufre ou de triazoles. Éviter les semis trop denses. Maintenir un bon drainage du sol.',
    plante: 'Blé',
    severity: 'modérée',
  },
  {
    id: 3,
    nom: 'Rouille du maïs',
    description: 'La rouille commune du maïs est causée par Puccinia sorghi. Elle se manifeste par des pustules brun-rougeâtre sur les deux faces des feuilles. En cas d\'infection sévère, les feuilles peuvent sécher prématurément.',
    traitement: 'Planter des hybrides résistants. Appliquer des fongicides foliaires si nécessaire. Rotation des cultures pour réduire l\'inoculum. Éliminer les résidus de culture.',
    plante: 'Maïs',
    severity: 'modérée',
  },
  {
    id: 4,
    nom: 'Tache foliaire du riz',
    description: 'La pyriculariose du riz est causée par Magnaporthe oryzae. Elle provoque des taches en forme de losange sur les feuilles, de couleur grise au centre avec des bords bruns. Peut affecter tous les organes aériens.',
    traitement: 'Utiliser des semences certifiées et des variétés résistantes. Appliquer des fongicides systémiques. Gérer l\'irrigation de manière appropriée. Fertilisation azotée modérée.',
    plante: 'Riz',
    severity: 'élevée',
  },
  {
    id: 5,
    nom: 'Pourriture grise de la vigne',
    description: 'Causée par Botrytis cinerea, cette maladie provoque un feutrage gris sur les grappes. Les baies se couvrent de moisissure et pourrissent. Favorisée par l\'humidité et les températures douces.',
    traitement: 'Effeuiller autour des grappes pour améliorer l\'aération. Appliquer des anti-botrytis avant la fermeture de la grappe. Récolter rapidement les grappes touchées. Éviter les blessures sur les baies.',
    plante: 'Vigne',
    severity: 'élevée',
  },
  {
    id: 6,
    nom: 'Alternariose de la pomme de terre',
    description: 'L\'alternariose est causée par Alternaria solani. Elle se manifeste par des taches concentriques brunes sur les feuilles les plus âgées. Les tubercules peuvent présenter des lésions sombres et déprimées.',
    traitement: 'Rotation des cultures sur 3-4 ans. Application préventive de fongicides. Irrigation régulière pour éviter le stress hydrique. Récolte à maturité et séchage correct des tubercules.',
    plante: 'Pomme de terre',
    severity: 'modérée',
  },
  {
    id: 7,
    nom: 'Plante saine',
    description: 'Aucune maladie détectée. La plante présente un aspect normal et sain avec une coloration verte uniforme, sans taches ni déformations visibles.',
    traitement: 'Aucun traitement nécessaire. Continuer les bonnes pratiques culturales : arrosage régulier, fertilisation équilibrée, surveillance régulière.',
    plante: 'Toutes',
    severity: 'faible',
  },
  {
    id: 8,
    nom: 'Mosaïque du concombre',
    description: 'Le virus de la mosaïque du concombre (CMV) provoque des marbrures jaunes et vertes sur les feuilles, un enroulement foliaire et un rabougrissement de la plante. Les fruits peuvent être déformés.',
    traitement: 'Éliminer les plants infectés immédiatement. Contrôler les pucerons vecteurs du virus. Utiliser des variétés résistantes. Désinfecter les outils de taille entre chaque plant.',
    plante: 'Concombre',
    severity: 'élevée',
  },
];

export const mockUsers = [
  {
    id: 1,
    nom: 'Ahmed Benali',
    email: 'ahmed@example.com',
    motDePasse: 'password123',
    role: 'agriculteur' as const,
  },
  {
    id: 2,
    nom: 'Admin System',
    email: 'admin@plantguard.com',
    motDePasse: 'admin123',
    role: 'admin' as const,
  },
  {
    id: 3,
    nom: 'Fatima Zahra',
    email: 'fatima@example.com',
    motDePasse: 'password456',
    role: 'agriculteur' as const,
  },
];
