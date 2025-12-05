# Protótipo — IHC (4º período)

Protótipo interativo do aplicativo **GitHub Mobile** adaptado para a disciplina de Interação Humano-Computador (4º período). A versão 2.0 reproduz a experiência móvel com navegação completa, feedbacks visuais e fluxos críticos para testes moderados de usabilidade antes do desenvolvimento final.

Descrição
- Protótipo de alta fidelidade desenvolvido como entrega avaliativa da disciplina.
- Objetivo: validar fluxo de interação, usabilidade e hierarquia visual do GitHub Mobile.
- Cobertura: tela inicial, lista de repositórios, detalhes de PRs, notificações, exploração e perfil.


Status
- Estado atual: protótipo funcional em HTML/CSS/JS estático.
- Principais entregáveis: telas navegáveis, histórico de navegação, cenários de uso e roteiro de testes.

Recursos principais
- Navegação superior dinâmica e barra inferior com estado ativo por tela.
- Criação de repositório simulada com persistência temporária via `localStorage` e feedback toast.
- Visualização de PRs, arquivos, notificações e filtros segmentados.
- Modais/sheets para conta, busca, uploads e configurações.
- Pontos de avaliação de usabilidade: tempo, erros e satisfação.

Tecnologias utilizadas
- HTML, CSS e JavaScript puros (sem frameworks) no arquivo raiz `index.html`.
- Versão modular em `Protótipo newgit/` com `style.css` e `script.js` separados para facilitar refactors.
- Assets complementares em `img/`.

Como abrir / executar
- Abra `index.html` diretamente no navegador para experimentar a versão monolítica.
- Opcional: execute `python -m http.server 8000` e acesse `http://localhost:8000` para testar em servidor local.
- Para a versão modular, abra `Protótipo newgit/index.html` após garantir sincronização dos assets.

Estrutura do repositório
- `index.html` — versão completa com CSS/JS inline (fonte de verdade para sincronizações).
- `Protótipo newgit/` — versão modular com assets separados.
- `img/` — imagens utilizadas no protótipo.
- `teste-usabilidade.md` — roteiro para sessões de avaliação.
- `README.md` — documentação geral do projeto.

Roteiro de avaliação sugerido
1. Definir tarefas representativas (ex.: criar repositório, revisar PR, filtrar notificações).
2. Medir tempo e número de interações necessárias para concluir cada tarefa.
3. Registrar erros, pontos de confusão e comentários espontâneos.
4. Coletar feedback qualitativo sobre clareza visual e satisfação.
5. Consolidar achados no `teste-usabilidade.md` e iterar no protótipo.

Contribuição
- Abra issues para problemas, sugestões ou resultados de testes.
- Submeta pull requests explicando alterações e impactos na experiência do usuário.
- Mantenha histórico de versões e notas de usabilidade (ex.: registro da versão 2.0 modular).

