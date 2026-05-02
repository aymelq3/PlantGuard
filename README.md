# 🌿 PlantGuard

Application web de **détection de maladies des plantes par analyse d'image**.  
L'utilisateur upload une photo de sa plante, l'application analyse l'image et propose un diagnostic avec des recommandations de traitement.

---

## 🎯 Fonctionnalités

- 📷 Upload d'image de plante
- 🔍 Détection et identification de la maladie
- 📋 Affichage du diagnostic avec recommandations
- 📊 Dashboard de statistiques
- 🕓 Historique des analyses
- 🔐 Authentification utilisateur (Login / Admin)
- ⚙️ Page d'administration

---

## 🛠️ Technologies

| Couche | Technologie |
|--------|-------------|
| Frontend | React.js + TypeScript |
| Style | CSS3 |
| Build | Vite |
| Modélisation | UML — 5 diagrammes |

---

## 📐 Modélisation UML

| Diagramme | Description |
|-----------|-------------|
| **Use Case** | Interactions utilisateur avec le système |
| **Classes** | Structure des objets et leurs relations |
| **Séquence** | Déroulement de l'analyse d'une image |
| **Activité** | Flux de traitement de bout en bout |
| **Déploiement** | Architecture technique de l'application |

---

## 📁 Structure du projet

```
PlantGuard/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   └── Layout.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── HistoryContext.tsx
│   ├── data/
│   │   └── maladies.ts
│   ├── pages/
│   │   ├── AdminPage.tsx
│   │   ├── AnalyzePage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── DiseasesPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── StatsPage.tsx
│   ├── utils/
│   │   └── cn.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Lancer le projet

```bash
# Cloner le repo
git clone https://github.com/aymelq3/PlantGuard.git

# Aller dans le dossier
cd PlantGuard

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

---

## 👤 Auteur

**Aymane El Qaddouri**  
📧 elqaddouriaymane@gmail.com  
📍 Rabat, Maroc  
🎓 Étudiant en Licence ISI — SUPMTI Rabat
