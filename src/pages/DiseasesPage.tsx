import { useState } from 'react';
import { maladies } from '../data/maladies';
import { Search, Leaf, AlertTriangle, CheckCircle, X, Bug, Pill, ChevronRight } from 'lucide-react';
import { Maladie } from '../types';

export default function DiseasesPage() {
  const [search, setSearch] = useState('');
  const [selectedMaladie, setSelectedMaladie] = useState<Maladie | null>(null);

  const filtered = maladies.filter(m =>
    m.nom.toLowerCase().includes(search.toLowerCase()) ||
    m.plante.toLowerCase().includes(search.toLowerCase())
  );

  const getSeverityStyle = (s: string) => {
    switch (s) {
      case 'faible': return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' };
      case 'modérée': return { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' };
      case 'élevée': return { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
    }
  };

  const getPlantEmoji = (plante: string) => {
    const map: Record<string, string> = {
      'Tomate': '🍅',
      'Blé': '🌾',
      'Maïs': '🌽',
      'Riz': '🌾',
      'Vigne': '🍇',
      'Pomme de terre': '🥔',
      'Toutes': '🌿',
      'Concombre': '🥒',
    };
    return map[plante] || '🌱';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Catalogue des maladies</h1>
          <p className="text-sm text-gray-500">{maladies.length} maladies référencées</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher une maladie ou plante..."
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 shadow-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((maladie) => {
          const style = getSeverityStyle(maladie.severity);
          return (
            <div
              key={maladie.id}
              onClick={() => setSelectedMaladie(maladie)}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{getPlantEmoji(maladie.plante)}</span>
                <span className={`${style.bg} ${style.text} px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                  {maladie.severity}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-amber-700 transition-colors">{maladie.nom}</h3>
              <p className="text-xs text-gray-500 mb-3">Plante : {maladie.plante}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{maladie.description}</p>
              <div className="mt-3 flex items-center gap-1 text-amber-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Voir détails <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-400">Aucune maladie trouvée pour "{search}"</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedMaladie && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMaladie(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`p-6 rounded-t-2xl ${
              selectedMaladie.nom === 'Plante saine' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
              selectedMaladie.severity === 'élevée' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              'bg-gradient-to-r from-amber-500 to-orange-600'
            } text-white relative`}>
              <button onClick={() => setSelectedMaladie(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <span className="text-4xl mb-3 block">{getPlantEmoji(selectedMaladie.plante)}</span>
              <h3 className="text-xl font-bold mb-1">{selectedMaladie.nom}</h3>
              <p className="text-white/80 text-sm">Plante : {selectedMaladie.plante}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                {selectedMaladie.nom === 'Plante saine' ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                Sévérité : {selectedMaladie.severity}
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <h5 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4 text-gray-500" /> Description
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedMaladie.description}</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Pill className="w-4 h-4 text-green-600" /> Traitement recommandé
                </h5>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedMaladie.traitement}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
