import { useState, useRef, useCallback } from 'react';
import { Upload, Camera, X, Loader2, CheckCircle, AlertTriangle, Leaf, Bug, Pill, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { maladies } from '../data/maladies';
import { useAuth } from '../context/AuthContext';
import { useHistory } from '../context/HistoryContext';
import { Maladie, Resultat } from '../types';

type AnalysisState = 'idle' | 'preview' | 'preprocessing' | 'analyzing' | 'result' | 'error';

export default function AnalyzePage() {
  const { user } = useAuth();
  const { addToHistory } = useHistory();
  const [state, setState] = useState<AnalysisState>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [detectedMaladie, setDetectedMaladie] = useState<Maladie | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Format invalide. Veuillez sélectionner une image (JPG, PNG, etc.)');
      setState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image trop volumineuse. Taille maximale : 10 Mo.');
      setState('error');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setState('preview');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!imagePreview) return;

    // Step 1: Preprocessing
    setState('preprocessing');
    await new Promise(r => setTimeout(r, 1200));

    // Step 2: AI Analysis (simulated)
    setState('analyzing');
    await new Promise(r => setTimeout(r, 2000));

    // Simulate prediction
    const randomMaladie = maladies[Math.floor(Math.random() * maladies.length)];
    const randomConfidence = randomMaladie.nom === 'Plante saine'
      ? 85 + Math.random() * 14
      : 70 + Math.random() * 28;

    setDetectedMaladie(randomMaladie);
    setConfidence(randomConfidence);
    setState('result');

    // Save to history
    if (user) {
      const resultat: Resultat = {
        id: Date.now(),
        prediction: randomMaladie.nom,
        confiance: randomConfidence,
        dateAnalyse: new Date().toISOString(),
        imageId: Date.now(),
        maladieId: randomMaladie.id,
      };
      addToHistory(imagePreview, resultat, randomMaladie, user.id);
    }
  };

  const reset = () => {
    setState('idle');
    setImagePreview(null);
    setFileName('');
    setDetectedMaladie(null);
    setConfidence(0);
    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Analyser une image</h1>
          <p className="text-sm text-gray-500">Importez une photo de plante pour détecter les maladies</p>
        </div>
      </div>

      {/* Upload Zone - idle state */}
      {state === 'idle' && (
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
            dragActive
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Glissez-déposez votre image ici
          </h3>
          <p className="text-gray-400 text-sm mb-4">ou cliquez pour parcourir vos fichiers</p>
          <p className="text-xs text-gray-400">Formats acceptés : JPG, PNG, WEBP • Max 10 Mo</p>
        </div>
      )}

      {/* Image Preview */}
      {state === 'preview' && imagePreview && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-700">{fileName}</span>
            </div>
            <button onClick={reset} className="text-gray-400 hover:text-red-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-80 rounded-xl object-contain shadow-lg mb-6"
            />
            <button
              onClick={handleAnalyze}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center gap-2 active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5" />
              Analyser avec l'IA
            </button>
          </div>
        </div>
      )}

      {/* Preprocessing State */}
      {state === 'preprocessing' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Prétraitement de l'image...</h3>
          <p className="text-gray-400 text-sm">Redimensionnement et normalisation en cours</p>
          <div className="mt-6 max-w-xs mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-pulse" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing State */}
      {state === 'analyzing' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Analyse IA en cours...</h3>
          <p className="text-gray-400 text-sm">Le modèle d'intelligence artificielle examine votre image</p>
          <div className="mt-6 max-w-xs mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Sparkles className="w-3.5 h-3.5" />
            Modèle CNN - Classification multi-classes
          </div>
        </div>
      )}

      {/* Result State */}
      {state === 'result' && detectedMaladie && (
        <div className="space-y-4">
          {/* Result Summary */}
          <div className={`rounded-2xl p-6 border ${
            detectedMaladie.nom === 'Plante saine'
              ? 'bg-green-50 border-green-200'
              : detectedMaladie.severity === 'élevée'
                ? 'bg-red-50 border-red-200'
                : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                detectedMaladie.nom === 'Plante saine'
                  ? 'bg-green-200'
                  : detectedMaladie.severity === 'élevée'
                    ? 'bg-red-200'
                    : 'bg-amber-200'
              }`}>
                {detectedMaladie.nom === 'Plante saine' ? (
                  <CheckCircle className="w-7 h-7 text-green-700" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-red-700" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{detectedMaladie.nom}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    detectedMaladie.severity === 'faible'
                      ? 'bg-green-200 text-green-800'
                      : detectedMaladie.severity === 'modérée'
                        ? 'bg-amber-200 text-amber-800'
                        : 'bg-red-200 text-red-800'
                  }`}>
                    Sévérité : {detectedMaladie.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Plante : {detectedMaladie.plante}</p>
                {/* Confidence bar */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Confiance :</span>
                  <div className="flex-1 max-w-xs h-3 bg-white/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        confidence > 90 ? 'bg-green-500' : confidence > 75 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{confidence.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image & Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Image */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Image analysée
              </h4>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Analyzed"
                  className="w-full h-64 object-contain rounded-xl bg-gray-50"
                />
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Bug className="w-4 h-4" />
                Description
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{detectedMaladie.description}</p>
            </div>
          </div>

          {/* Treatment/Recommendations */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4 text-green-600" />
              Recommandations & Traitement
            </h4>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-sm text-gray-700 leading-relaxed">{detectedMaladie.traitement}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/25"
            >
              <RotateCcw className="w-4 h-4" />
              Nouvelle analyse
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {state === 'error' && (
        <div className="bg-red-50 rounded-2xl p-8 border border-red-200 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Erreur</h3>
          <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
          <button
            onClick={reset}
            className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
}
