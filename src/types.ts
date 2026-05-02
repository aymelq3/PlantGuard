export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  motDePasse: string;
  role: 'agriculteur' | 'admin';
}

export interface ImageData {
  id: number;
  chemin: string;
  dateUpload: string;
  file?: File;
  preview?: string;
}

export interface Resultat {
  id: number;
  prediction: string;
  confiance: number;
  dateAnalyse: string;
  imageId: number;
  maladieId: number;
}

export interface Maladie {
  id: number;
  nom: string;
  description: string;
  traitement: string;
  plante: string;
  severity: 'faible' | 'modérée' | 'élevée';
  image?: string;
}

export interface Historique {
  id: number;
  date: string;
  userId: number;
  imagePreview: string;
  resultat: Resultat;
  maladie: Maladie;
}

export interface AppState {
  user: Utilisateur | null;
  isAuthenticated: boolean;
}
