Write-Host "Criando projeto da empreiteira..." -ForegroundColor Cyan

npm install

if (-Not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
}

Write-Host ""
Write-Host "Projeto preparado." -ForegroundColor Green
Write-Host "Execute: npm run dev"
