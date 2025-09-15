#!/bin/bash

# Script de déploiement GitHub pour AvocaJust
echo "🚀 Déploiement vers GitHub..."

# Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation du repository Git..."
    git init
    git add .
    git commit -m "Initial commit - AvocaJust platform"
fi

# Demander l'URL du repository
read -p "Entrez l'URL de votre repository GitHub (ex: https://github.com/username/avocajust.git): " REPO_URL

# Ajouter le remote origin
git remote add origin $REPO_URL 2>/dev/null || git remote set-url origin $REPO_URL

# Pousser vers GitHub
echo "📤 Push vers GitHub..."
git branch -M main
git push -u origin main

echo "✅ Déploiement terminé !"
echo "🌐 Votre code est maintenant sur GitHub : $REPO_URL"