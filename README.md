# Portfolio de Sophie Bluel - Architecte d'Intérieur 🏛️

Ce projet est une **plateforme de gestion de projets pour Sophie Bluel**, une architecte d'intérieur. Le site permet à Sophie de gérer et d'afficher ses projets d'architecture de manière dynamique, avec des fonctionnalités d'authentification et de filtrage des projets. Ce projet a été développé dans le cadre de la formation en développement web pour le **Projet 6**.

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique du site pour une meilleure accessibilité et un SEO optimisé.
- **CSS3** : Gestion de l'apparence et du responsive design pour une compatibilité sur tous les appareils.
- **JavaScript (ES6)** : Interaction avec l'API et gestion des fonctionnalités dynamiques de la plateforme.
- **Node.js** : Gestion du serveur backend pour les requêtes API.
- **Express** : Framework backend utilisé pour gérer les routes et les interactions côté serveur.
- **MongoDB** : Base de données pour stocker les informations sur les projets.
- **JWT (JSON Web Tokens)** : Authentification sécurisée pour protéger l'accès au back-office de Sophie.
- **Git & GitHub** : Gestion de version et hébergement du code.

## 🎯 Fonctionnalités

- **Affichage dynamique des projets** : Les projets de Sophie sont affichés en fonction des filtres appliqués par l'utilisateur (catégories de projets).
- **Gestion des projets** : Authentification sécurisée permettant à Sophie de gérer (ajouter, modifier, supprimer) ses projets depuis un espace back-office.
- **Filtrage des projets** : Les utilisateurs peuvent trier les projets par catégorie via un système de filtres dynamiques.
- **Connexion sécurisée** : Utilisation de JSON Web Tokens (JWT) pour sécuriser l'authentification.
- **Responsive Design** : Le site est entièrement responsive, s'adaptant à tous les types d'appareils, du smartphone au grand écran.

## 📦 Installation et Lancement du Projet

### Prérequis

- **Node.js** installé sur votre machine
- **Git** pour cloner le dépôt
- Un navigateur web moderne (Chrome, Firefox, Edge)

### Étapes d'installation

1. **Clonez ce repository** :
    ```bash
    git clone https://github.com/Solweg/Projet-3.git
    ```

2. **Installez les dépendances backend** :
    ```bash
    cd backend
    npm install
    ```

3. **Lancez le serveur backend** :
    ```bash
    npm start
    ```

4. **Installez les dépendances frontend** :
    Dans une nouvelle instance de terminal (ou une autre instance de VSCode), accédez au dossier `frontend` :
    ```bash
    cd frontend
    npm install
    ```

5. **Lancez le serveur frontend** :
    ```bash
    npm start
    ```

### Important :

- **Lancer le backend et le frontend dans deux instances de terminal différentes** pour éviter des conflits.
- Suivez les instructions du fichier **README** dans le dossier `backend` pour toute configuration spécifique.

## 📂 Structure du Projet

```bash
SophieBluel/
│
├── backend/                 # Serveur backend pour l'authentification et la gestion des projets
│   ├── app.js               # Fichier principal pour l'application backend (Node.js + Express)
│   ├── controllers/         # Logique des contrôleurs backend (gestion des requêtes API)
│   └── routes/              # Fichiers définissant les routes API (authentification, projets)
│
├── frontend/                # Dossier contenant le frontend
│   ├── index.html           # Page principale du site web
│   ├── styles/              # Styles CSS pour la mise en page
│   ├── scripts/             # Fichiers JavaScript pour les interactions côté client
└── README.md                # Documentation du projet (ce fichier)
