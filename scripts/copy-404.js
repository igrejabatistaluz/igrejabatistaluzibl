/**
 * Script para copiar index.html para 404.html
 * Necessário para o Angular Router funcionar no GitHub Pages
 * GitHub Pages usa 404.html para rotas não encontradas
 */

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist', 'igreja-batista-luz', 'browser');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

// Verifica se o diretório dist existe
if (!fs.existsSync(distPath)) {
  console.error('❌ Diretório dist não encontrado. Execute o build primeiro.');
  process.exit(1);
}

// Verifica se index.html existe
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html não encontrado no diretório dist.');
  process.exit(1);
}

// Copia index.html para 404.html
try {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('✅ 404.html criado com sucesso!');
  console.log('   O Angular Router agora funcionará corretamente no GitHub Pages.');
} catch (error) {
  console.error('❌ Erro ao copiar index.html para 404.html:', error);
  process.exit(1);
}

