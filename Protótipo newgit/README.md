# Protótipo NewGit (assets separados)

Ambiente alternativo do protótipo mobile do GitHub com HTML, CSS e JavaScript divididos em arquivos individuais para acelerar refactors e comparar propostas de layout/comportamento.

## Conteúdo
- `index.html` → estrutura do dispositivo simulado, fluxos e estados de navegação.
- `style.css` → estilos globais, componentes reutilizáveis e responsividade desktop.
- `script.js` → navegação entre telas, histórico, toasts e simulação de uploads.

## Pré-visualização rápida
1. Abra `index.html` diretamente no navegador (não requer servidor).
2. Explore o menu inferior ou o botão "Criar" para validar os fluxos principais.
3. Utilize `localStorage.clear()` no console para reiniciar o estado simulado de uploads, se necessário.

## Fluxos de teste cobertos
- Criação de repositório com feedback de sucesso.
- Navegação para detalhes do repo (abas Visão geral, Pull Requests e Arquivos).
- Comentário em PR com breadcrumbs de retorno.
- Upload de arquivo fictício com lista persistente em `localStorage`.
- Filtros de notificações e navegação por abas segmentadas.

## Dicas de manutenção
- A versão raiz do protótipo (`../index.html`) continua como fonte de verdade; sincronize alterações relevantes entre as duas versões quando aplicável.
- Ajustes de estilo ou comportamento devem ser feitos em `style.css` ou `script.js` e depois, se necessário, reintroduzidos no arquivo combinado original.
- Ao testar novas ideias, mantenha commits separados para facilitar diff entre a versão monolítica e esta versão modular.
