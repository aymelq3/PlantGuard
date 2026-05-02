import { useAuth } from '../context/AuthContext';
import { useHistory } from '../context/HistoryContext';
import { Camera, History, BarChart3, Leaf, Bug, Shield, TrendingUp } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ onNavigate }: Props) {
  const { user } = useAuth();
  const { getStats, historique } = useHistory();
  const stats = getStats();

  const quickActions = [
    {
      icon: Camera,
      title: 'Analyser une image',
      description: 'Importer et analyser une photo de plante',
      color: 'from-green-500 to-emerald-600',
      shadowColor: 'shadow-green-500/25',
      page: 'analyze',
    },
    {
      icon: History,
      title: 'Historique',
      description: 'Consulter vos analyses précédentes',
      color: 'from-blue-500 to-indigo-600',
      shadowColor: 'shadow-blue-500/25',
      page: 'history',
    },
    {
      icon: BarChart3,
      title: 'Statistiques',
      description: 'Voir les statistiques détaillées',
      color: 'from-purple-500 to-violet-600',
      shadowColor: 'shadow-purple-500/25',
      page: 'stats',
    },
    {
      icon: Leaf,
      title: 'Maladies',
      description: 'Catalogue des maladies connues',
      color: 'from-amber-500 to-orange-600',
      shadowColor: 'shadow-amber-500/25',
      page: 'diseases',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Bonjour, {user?.nom || 'Utilisateur'} 👋
          </h1>
          <p className="text-green-100/80 text-sm md:text-base max-w-lg">
            Bienvenue sur PlantGuard. Analysez vos plantes en quelques secondes grâce à notre système d'intelligence artificielle.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-xs text-gray-500">Analyses</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Bug className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.maladiesDetectees}</p>
              <p className="text-xs text-gray-500">Maladies</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.plantesSaines}</p>
              <p className="text-xs text-gray-500">Saines</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.confianceMoyenne > 0 ? `${stats.confianceMoyenne.toFixed(0)}%` : '—'}</p>
              <p className="text-xs text-gray-500">Confiance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.page}
              onClick={() => onNavigate(action.page)}
              className={`group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg ${action.shadowColor} transition-all duration-300 text-left hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 shadow-lg ${action.shadowColor} group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h2>
        {historique.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-600 font-medium mb-1">Aucune analyse récente</h3>
            <p className="text-gray-400 text-sm mb-4">Commencez par analyser une image de plante</p>
            <button
              onClick={() => onNavigate('analyze')}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Commencer l'analyse
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {historique.slice(0, 5).map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                <img
                  src={entry.imagePreview}
                  alt="Plant"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">{entry.maladie.nom}</h4>
                  <p className="text-sm text-gray-500">{entry.maladie.plante} • {new Date(entry.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    entry.maladie.nom === 'Plante saine'
                      ? 'bg-green-100 text-green-700'
                      : entry.maladie.severity === 'élevée'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                  }`}>
                    {entry.resultat.confiance.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
