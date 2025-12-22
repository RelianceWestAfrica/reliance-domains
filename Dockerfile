# Utiliser une image Node légère
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install --force

# Copier le reste du code source
COPY . .

# Définir les variables d'environnement par défaut
ENV HOST=0.0.0.0
ENV PORT=5175
ENV NODE_ENV=development

# Exposer le port 4000
EXPOSE 5175

# Commande de démarrage
CMD ["npm", "run", "start"]
