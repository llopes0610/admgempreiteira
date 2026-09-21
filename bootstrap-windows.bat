@echo off
set PROJECT=empreiteira-site
npx create-next-app@latest %PROJECT% --typescript --eslint --app --src-dir --import-alias "@/*" --use-npm
cd %PROJECT%
npm install framer-motion lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
echo Projeto base criado. Agora substitua os arquivos pelos arquivos do starter fornecido.
pause
