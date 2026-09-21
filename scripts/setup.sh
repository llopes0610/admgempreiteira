#!/usr/bin/env bash
set -e

echo "Instalando dependencias..."
npm install

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
fi

echo ""
echo "Projeto preparado."
echo "Execute: npm run dev"
