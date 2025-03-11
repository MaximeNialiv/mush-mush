# Mush•Mush - Application de parcours climatique

Cette application permet aux utilisateurs de suivre un parcours éducatif sur le climat à travers différents types de contenu : médias, quiz et modules.

## Migration d'Airtable vers Supabase

Ce projet est en cours de migration depuis Airtable vers Supabase pour améliorer les performances et la fiabilité.

### Pourquoi Supabase ?

- **Base de données PostgreSQL** complète et puissante
- **Performance** supérieure à Airtable
- **Tarification** plus prévisible sans limitations strictes
- **Développement robuste** avec typage fort via TypeScript
- **Fonctionnalités supplémentaires** : authentification, stockage, fonctions Edge, etc.
- **Open Source** et possibilité d'auto-hébergement

### Configuration de Supabase

1. **Créer un compte Supabase**
   - Rendez-vous sur [supabase.com](https://supabase.com)
   - Créez un nouveau projet

2. **Configurer le schéma de base de données**
   - Exécutez le script SQL situé dans `supabase/schema.sql` dans l'interface SQL de Supabase

3. **Configurer les variables d'environnement**
   - Copiez `.env.example` en `.env.local`
   - Remplissez les variables Supabase avec vos informations :
     ```
     VITE_SUPABASE_URL=https://votre-projet.supabase.co
     VITE_SUPABASE_ANON_KEY=votre-clé-anon-supabase
     ```

### Migration des données

Pour migrer les données d'Airtable vers Supabase :

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   - Assurez-vous que votre fichier `.env.local` contient à la fois les variables Airtable et Supabase

3. **Exécuter le script de migration**
   ```bash
   node scripts/migrate-airtable-to-supabase.js
   ```

4. **Vérifier les données**
   - Vérifiez dans l'interface Supabase que les données ont été correctement migrées

### Développement avec Supabase

L'application utilise désormais le service Supabase pour les opérations de données :

```typescript
import { supabaseService } from '@/services/supabase';

// Récupérer toutes les cartes
const cards = await supabaseService.getAllCards();

// Gérer les interactions utilisateur
await supabaseService.saveUserCardInteraction(
  userId,
  cardId,
  'completed',
  { knowledge: 10, behavior: 5, skills: 5 }
);
```

## Développement local

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Accéder à l'application**
   - Ouvrez votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000)

## Déploiement

L'application peut être déployée sur Vercel, Netlify ou tout autre service compatible avec les applications Vite/React.

```bash
npm run build
```

## Structure du projet

- `src/`: Code source de l'application
  - `components/`: Composants React
  - `services/`: Services pour l'accès aux données
  - `store/`: État global avec Zustand
  - `types/`: Définitions de types TypeScript
- `scripts/`: Scripts utilitaires (migration, etc.)
- `supabase/`: Configuration Supabase

## Project info

**URL**: https://lovable.dev/projects/7c21d336-4add-438f-a701-6355039bba17

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7c21d336-4add-438f-a701-6355039bba17) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7c21d336-4add-438f-a701-6355039bba17) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
