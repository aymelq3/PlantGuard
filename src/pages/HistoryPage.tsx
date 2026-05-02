import { useState } from 'react';
import { useHistory } from '../context/HistoryContext';
import { History, Trash2, Search, Calendar, Filter, Eye, X, Bug, Pill, ChevronDown } from 'lucide-react';
import { Historique } from '../types';

export default function HistoryPage() {
  const { historique, clearHistory } = useHistory();
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<Historique | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filtered = historique.filter(h => {
    const matchSearch = h.maladie.nom.toLowerCase().includes(search.toLowerCase()) ||
      h.maladie.plante.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = filterSeverity === 'all' || h.maladie.severity === filterSeverity ||
      (filterSeverity === 'saine' && h.maladie.nom === 'Plante saine');
    return matchSearch && matchSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Historique des analyses</h1>
            <p className="text-sm text-gray-500">{historique.length} analyse(s) effectuée(s)</p>
          </div>
        </div>
        {historique.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Vider l'historique
          </button>
        )}
      </div>

      {historique.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par maladie ou plante..."
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterSeverity}
              onChange={e => setFilterSeverity(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 appearance-none cursor-pointer"
            >
              <option value="all">Tous</option>
              <option value="saine">Plantes saines</option>
              <option value="faible">Sévérité faible</option>
              <option value="modérée">Sévérité modérée</option>
              <option value="élevée">Sévérité élevée</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-600 font-medium mb-1">Aucun résultat</h3>
          <p className="text-gray-400 text-sm">
            {historique.length === 0 ? "Aucune analyse n'a encore été effectuée." : 'Aucun résultat ne correspond à votre recherche.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedEntry(entry)}
            >
              <img
                src={entry.imagePreview}
                alt="Plant"
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800">{entry.maladie.nom}</h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span>•</span>
                  <span>{entry.maladie.plante}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  entry.maladie.nom === 'Plante saine'
                    ? 'bg-green-100 text-green-700'
                    : entry.maladie.severity === 'élevée'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                }`}>
                  {entry.resultat.confiance.toFixed(0)}%
                </span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                  <Eye className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEntry(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="font-bold text-gray-800">Détail de l'analyse</h3>
              <button onClick={() => setSelectedEntry(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <img
                src={selectedEntry.imagePreview}
                alt="Analyzed"
                className="w-full h-48 object-contain rounded-xl bg-gray-50"
              />
              <div className={`rounded-xl p-4 ${
                selectedEntry.maladie.nom === 'Plante saine' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <h4 className="font-bold text-gray-800 text-lg">{selectedEntry.maladie.nom}</h4>
                <p className="text-sm text-gray-600 mt-1">Plante : {selectedEntry.maladie.plante}</p>
                <p className="text-sm text-gray-500 mt-1">Confiance : {selectedEntry.resultat.confiance.toFixed(1)}%</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4" /> Description
                </h5>
                <p className="text-sm text-gray-600">{selectedEntry.maladie.description}</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Pill className="w-4 h-4 text-green-600" /> Traitement
                </h5>
                <p className="text-sm text-gray-600">{selectedEntry.maladie.traitement}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
