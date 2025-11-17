# Roteiro de Teste de Usabilidade

## Contexto
- **Protótipo:** GitHub Mobile - Fluxo de gerenciamento rápido
- **Objetivo do teste:** Validar se usuários conseguem desempenhar tarefas críticas identificadas nas fases anteriores (criar repositório, navegar em repositórios, atuar sobre pull requests e enviar arquivos) usando o protótipo interativo.
- **Perfil de participantes:** Estudantes e desenvolvedores (nível intermediário em Git) que já utilizaram aplicativos mobile para trabalho colaborativo.

## Preparação
1. Abrir o arquivo `index.html` no navegador (modo responsivo em 390x844 recomendado).
2. Explicar ao participante que se trata de um protótipo e que algumas interações são simuladas.
3. Informar que o foco é no fluxo, não na aparência final.

## Tarefas
1. **Criar um novo repositório**
   - Instrução ao participante: "Você precisa iniciar um novo projeto para o seu time. Como faria isso pelo aplicativo?"
   - Resultado esperado: acessar "Repositórios" → tocar em "Novo" → preencher dados → confirmar.

2. **Ver detalhes de um repositório existente**
   - Instrução: "Verifique as atividades recentes do repositório mobile-app."
   - Resultado esperado: selecionar "mobile-app" e visualizar "Visão geral".

3. **Revisar um Pull Request**
   - Instrução: "Há um pull request chamado hotfix/login que precisa de feedback. Encontre-o e registre um comentário."
   - Resultado esperado: navegar até subaba "Pull Requests" → abrir "hotfix/login" → comentar.

4. **Enviar um arquivo para o repositório**
   - Instrução: "Imagine que você precisa enviar um arquivo rápido para o repositório. Como faria isso pelo app?"
   - Resultado esperado: acessar subaba "Arquivos" → iniciar upload → confirmar submissão.

5. **Filtrar notificações**
   - Instrução: "Você quer priorizar notificações críticas. Como faria para localizar rapidamente os alertas mais importantes?"
   - Resultado esperado: abrir aba "Notificações" → observar filtros e identificar alertas com prioridade.

## Métricas
Para cada tarefa, registrar:
- **Sucesso:** Concluiu, parcialmente concluiu ou não concluiu.
- **Tempo:** Cronometrar tempo aproximado (início da leitura da instrução até a conclusão).
- **Comentários:** Notas sobre dúvidas, cliques extras, feedback espontâneo.
- **Severidade de problemas:** Classificar problemas observados segundo Nielsen (Baixa, Média, Alta, Crítica).

## Pós-teste
- Perguntar sensação geral de esforço (escala 1-5) e principais frustrações.
- Coletar sugestões de melhorias e funcionalidades ausentes.

## Próximos passos
- Consolidar resultados em planilha com métricas.
- Priorizar ajustes com base em problemas de severidade alta ou casos de insucesso.
