import React, { createContext, useContext, useState, useCallback } from 'react';
import { Historique, Resultat, Maladie } from '../types';

interface HistoryContextType {
  historique: Historique[];
  addToHistory: (imagePreview: string, resultat: Resultat, maladie: Maladie, userId: number) => void;
  clearHistory: () => void;
  getStats: () => {
    total: number;
    maladiesDetectees: number;
    plantesSaines: number;
    parMaladie: { nom: string; count: number }[];
    parJour: { date: string; count: number }[];
    confianceMoyenne: number;
  };
}

const HistoryContext = createContext<HistoryContextType | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [historique, setHistorique] = useState<Historique[]>([]);

  const addToHistory = useCallback((imagePreview: string, resultat: Resultat, maladie: Maladie, userId: number) => {
    const entry: Historique = {
      id: Date.now(),
      date: new Date().toISOString(),
      userId,
      imagePreview,
      resultat,
      maladie,
    };
    setHistorique(prev => [entry, ...prev]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistorique([]);
  }, []);

  const getStats = useCallback(() => {
    const total = historique.length;
    const maladiesDetectees = historique.filter(h => h.maladie.nom !== 'Plante saine').length;
    const plantesSaines = total - maladiesDetectees;

    const maladieCount: Record<string, number> = {};
    historique.forEach(h => {
      maladieCount[h.maladie.nom] = (maladieCount[h.maladie.nom] || 0) + 1;
    });
    const parMaladie = Object.entries(maladieCount).map(([nom, count]) => ({ nom, count }));

    const jourCount: Record<string, number> = {};
    historique.forEach(h => {
      const day = new Date(h.date).toLocaleDateString('fr-FR');
      jourCount[day] = (jourCount[day] || 0) + 1;
    });
    const parJour = Object.entries(jourCount).map(([date, count]) => ({ date, count }));

    const confianceMoyenne = total > 0
      ? historique.reduce((sum, h) => sum + h.resultat.confiance, 0) / total
      : 0;

    return { total, maladiesDetectees, plantesSaines, parMaladie, parJour, confianceMoyenne };
  }, [historique]);

  return (
    <HistoryContext.Provider value={{ historique, addToHistory, clearHistory, getStats }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within HistoryProvider');
  return context;
}
