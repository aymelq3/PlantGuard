import { useHistory } from '../context/HistoryContext';
import { BarChart3, PieChart, TrendingUp, Activity, Camera, Bug, Shield, Target } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6', '#8b5cf6', '#f97316'];

export default function StatsPage() {
  const { getStats, historique } = useHistory();
  const stats = getStats();

  const pieData = stats.parMaladie.map(m => ({
    name: m.nom.length > 20 ? m.nom.substring(0, 18) + '...' : m.nom,
    value: m.count,
  }));

  const severityData = [
    { name: 'Saine', count: historique.filter(h => h.maladie.nom === 'Plante saine').length, fill: '#10b981' },
    { name: 'Faible', count: historique.filter(h => h.maladie.severity === 'faible' && h.maladie.nom !== 'Plante saine').length, fill: '#6366f1' },
    { name: 'Modérée', count: historique.filter(h => h.maladie.severity === 'modérée').length, fill: '#f59e0b' },
    { name: 'Élevée', count: historique.filter(h => h.maladie.severity === 'élevée').length, fill: '#ef4444' },
  ].filter(d => d.count > 0);

  const planteData: Record<string, number> = {};
  historique.forEach(h => {
    planteData[h.maladie.plante] = (planteData[h.maladie.plante] || 0) + 1;
  });
  const barData = Object.entries(planteData).map(([name, count]) => ({ name, count }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Statistiques</h1>
          <p className="text-sm text-gray-500">Vue d'ensemble de vos analyses</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
            <Camera className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-sm text-gray-500 mt-1">Total analyses</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
            <Bug className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.maladiesDetectees}</p>
          <p className="text-sm text-gray-500 mt-1">Maladies détectées</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.plantesSaines}</p>
          <p className="text-sm text-gray-500 mt-1">Plantes saines</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {stats.confianceMoyenne > 0 ? `${stats.confianceMoyenne.toFixed(1)}%` : '—'}
          </p>
          <p className="text-sm text-gray-500 mt-1">Confiance moyenne</p>
        </div>
      </div>

      {stats.total === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-600 font-medium mb-1">Pas encore de données</h3>
          <p className="text-gray-400 text-sm">Effectuez des analyses pour voir les statistiques apparaître ici.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pie Chart - Diseases */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" />
              Répartition par maladie
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - by plant */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Analyses par plante
            </h3>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Analyses" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">
                Pas de données disponibles
              </div>
            )}
          </div>

          {/* Severity Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-2">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              Répartition par sévérité
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={severityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Nombre d'analyses" radius={[0, 6, 6, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
