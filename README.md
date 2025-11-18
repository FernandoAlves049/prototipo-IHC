# Protótipo GitHub Mobile

Heurísticas de colaboração em um modelo reduzido do GitHub Mobile, desenvolvido na disciplina de Interação Humano-Computador para testar fluxos críticos em campo.

## 📌 Objetivos
- Investigar se a navegação entre abas, subabas e breadcrumbs se mantém clara em contexto mobile.
- Validar a execução de tarefas essenciais: criação de repositório, revisão de pull request, upload rápido e filtragem de notificações.
- Levantar evidências qualitativas para priorizar ajustes de naming, feedback visual e disposição de ações.

## 🗂 Estrutura
- `index.html`: shell único com HTML+CSS+JS incorporados para facilitar avaliação rápida.
- `Protótipo newgit/`: versão modular com assets separados (`index.html`, `style.css`, `script.js`).
- `teste-usabilidade.md`: roteiro completo (hipóteses, tarefas, métricas e análise).
- `docs/`: kit de sessão (planilha de métricas, script de moderação, checklist, equipe).
- `img/`: screenshots e elementos visuais usados no protótipo.

## ▶️ Como rodar
1. Abrir `index.html` no navegador (Chrome/Edge/Firefox).
2. Ativar modo responsivo (390x844) para simular o dispositivo alvo.
3. Percorrer os fluxos sinalizados no roteiro de testes (Tarefas 1–5).

## 🔁 Fluxos cobertos
- Criar repositório com confirmação visual e atalho para detalhes.
- Revisar PR com formulário de comentário, breadcrumbs contextuais e toast de sucesso.
- Upload fictício de arquivo com persistência em `localStorage` e lista atualizada.
- Priorizar notificações aplicando filtros segmentados (Inbox, Participando, Mencionado, Repositório).

## 🧪 Testes de usabilidade
- Sessões moderadas com estudantes e devs intermediários em Git.
- Métricas coletadas: sucesso, tempo, severidade, falas críticas, NASA-TLX pós-tarefa.
- Referência cruzada com arquivos em `docs/` para replicar ou revisar boas práticas.

## 🤝 Contribuidores
- [Fernando Alves](https://github.com/FernandoAlves049)
- [Felipe Montalvão](https://github.com/Felipemonrod)
- [Victor Hugo](https://github.com/TempestOFC)
- henrique

