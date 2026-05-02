import { useState } from 'react';
import { useHistory } from '../context/HistoryContext';
import { mockUsers } from '../data/maladies';
import { maladies as allMaladies } from '../data/maladies';
import { Users, Shield, Bug, BarChart3, Trash2, Eye, UserCheck, UserX } from 'lucide-react';

type Tab = 'users' | 'diseases' | 'overview';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const { getStats, historique } = useHistory();
  const stats = getStats();

  const tabs = [
    { id: 'overview' as Tab, label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'users' as Tab, label: 'Utilisateurs', icon: Users },
    { id: 'diseases' as Tab, label: 'Maladies / Plantes', icon: Bug },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Administration</h1>
          <p className="text-sm text-gray-500">Gérer le système PlantGuard</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-blue-600">{mockUsers.length}</p>
              <p className="text-sm text-gray-500 mt-1">Utilisateurs</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.total}</p>
              <p className="text-sm text-gray-500 mt-1">Analyses totales</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-amber-600">{allMaladies.length}</p>
              <p className="text-sm text-gray-500 mt-1">Maladies cataloguées</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {stats.confianceMoyenne > 0 ? `${stats.confianceMoyenne.toFixed(0)}%` : '—'}
              </p>
              <p className="text-sm text-gray-500 mt-1">Précision IA</p>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">État du système</h3>
            <div className="space-y-3">
              {[
                { label: 'Serveur API', status: 'En ligne', ok: true },
                { label: 'Modèle IA (CNN)', status: 'Actif', ok: true },
                { label: 'Base de données', status: 'Connectée', ok: true },
                { label: 'Dernière mise à jour du modèle', status: 'Il y a 2 jours', ok: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`flex items-center gap-1.5 text-sm font-medium ${item.ok ? 'text-green-600' : 'text-red-600'}`}>
                    <span className={`w-2 h-2 rounded-full ${item.ok ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rôle</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-500">#{user.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {user.nom.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{user.nom}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? '👨‍💼 Admin' : '👨‍🌾 Agriculteur'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="Voir">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-green-500 transition-colors" title="Activer">
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Désactiver">
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Diseases Tab */}
      {activeTab === 'diseases' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Maladie</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plante</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sévérité</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Détections</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allMaladies.map(maladie => {
                  const detections = historique.filter(h => h.maladie.id === maladie.id).length;
                  return (
                    <tr key={maladie.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-500">#{maladie.id}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">{maladie.nom}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{maladie.plante}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          maladie.severity === 'faible' ? 'bg-green-100 text-green-700' :
                          maladie.severity === 'modérée' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {maladie.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{detections}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
