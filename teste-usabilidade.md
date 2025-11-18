# Roteiro de Teste de Usabilidade

## Contexto
- **Protótipo:** GitHub Mobile - Fluxo de gerenciamento rápido.
- **Objetivos principais:**
  - Validar se usuários completam tarefas críticas (criar repositório, navegar em repositórios, atuar sobre pull requests, enviar arquivos e priorizar notificações).
  - Identificar gargalos de navegação, rótulos confusos ou fluxos interrompidos.
  - Levantar percepções iniciais sobre utilidade e confiança no protótipo.
- **Hipóteses a validar:**
  - Usuários reconhecem a hierarquia entre abas e subabas sem instruções adicionais.
  - A ação de upload é percebida rapidamente dentro da subaba "Arquivos".
  - Filtros de notificações comunicam prioridade de maneira clara.
- **Perfil e número de participantes:** 5 a 7 estudantes e desenvolvedores (nível intermediário em Git) que realizaram colaboração em apps mobile nos últimos 6 meses.

## Logística
- **Ambiente:** Notebook com `index.html` aberto em navegador Chromium ou Firefox em modo responsivo (390x844). Garantir conexão estável para captura de telas.
- **Ferramentas de registro:** Software de gravação de tela/áudio (ex.: OBS), cronômetro visível para moderador, planilha de métricas compartilhada.
- **Consentimento:** Coletar autorização para gravação e uso dos dados em relatório interno.
- **Funções na sessão:** Moderador conduz, observador registra métricas e citações.
- **Tempo estimado por sessão:** 35 a 40 minutos (5 min introdução, 25 min tarefas, 10 min pós-teste).

## Preparação
1. Validar que o protótipo está atualizado e funcional (links e interações simuladas).
2. Abrir `index.html` no navegador e ajustar para modo responsivo 390x844.
3. Revisar roteiro, perguntas de sondagem e critérios de sucesso antes da sessão.
4. Testar gravação de tela/áudio e confirmar espaço de armazenamento disponível.
5. Preparar formulário de consentimento e ficha do participante (dados demográficos, experiência prévia com Git e apps mobile).
6. Lembrar o participante que se trata de um protótipo; partes podem ser não interativas e o foco é avaliar fluxo, não aparência.
7. Solicitar pensamento em voz alta durante as tarefas e reforçar que o produto (não o participante) está sendo avaliado.

## Tarefas
Para cada tarefa, registrar tempo, sucesso e dificuldades. Fazer perguntas de sondagem apenas após o participante declarar fim da tentativa.

1. **Criar um novo repositório**
   - Instrução ao participante: "Você precisa iniciar um novo projeto para o seu time. Como faria isso pelo aplicativo?"
   - Critérios de sucesso: abrir aba "Repositórios", tocar em "Novo", preencher formulário com dados plausíveis e confirmar.
   - Perguntas de sondagem (se necessário): "O que esperava encontrar após tocar em Novo?"; "Algo dificultou entender os campos?"

2. **Ver detalhes de um repositório existente**
   - Instrução: "Verifique as atividades recentes do repositório mobile-app."
   - Critérios de sucesso: localizar repositório "mobile-app", acessar "Visão geral" e mencionar pelo menos um elemento de atividade recente.
   - Sondagem: "A visão geral trouxe as informações que esperava?"; "O título da aba é claro para você?"

3. **Revisar um Pull Request**
   - Instrução: "Há um pull request chamado hotfix/login que precisa de feedback. Encontre-o e registre um comentário."
   - Critérios de sucesso: acessar subaba "Pull Requests", abrir "hotfix/login" e inserir comentário ou ação equivalente.
   - Sondagem: "O fluxo de revisão esteve alinhado ao que você já usa?"; "Faltou alguma informação antes de comentar?"

4. **Enviar um arquivo para o repositório**
   - Instrução: "Imagine que você precisa enviar rapidamente um arquivo para o repositório. Como faria isso pelo app?"
   - Critérios de sucesso: acessar subaba "Arquivos", iniciar processo de upload e confirmar submissão (mesmo que simulado).
   - Sondagem: "Onde esperava encontrar a opção de upload?"; "O feedback após o envio deixou claro o status?"

5. **Filtrar notificações**
   - Instrução: "Você quer priorizar notificações críticas. Como localizaria rapidamente os alertas mais importantes?"
   - Critérios de sucesso: abrir aba "Notificações", identificar e aplicar filtros de prioridade, apontar qual alerta teria prioridade.
   - Sondagem: "Os filtros estavam claros?"; "Sentiu falta de algum critério de ordenação?"

6. **Tarefa exploratória opcional**
   - Instrução: "Há algo que você gostaria de fazer neste app que não cobrimos? Tente realizá-lo rapidamente."
   - Objetivo: captar oportunidades adicionais ou expectativas não atendidas.

## Métricas e instrumentação
- **Sucesso por tarefa:** Concluiu, parcialmente concluiu, não concluiu; registrar bloqueios e onde ocorreram.
- **Tempo:** Cronometrar do início da leitura até a declaração de conclusão ou desistência.
- **Erros e cliques extras:** Mapear desvios, caminhos alternativos e tentativas repetidas.
- **Comentários espontâneos:** Anotar citações textuais relevantes (com carimbo de tempo).
- **Severidade dos problemas:** Classificar segundo Nielsen (Baixa, Média, Alta, Crítica) e justificar brevemente.
- **Carga percebida:** Aplicar escala NASA-TLX reduzida (esforço mental, esforço físico, frustração) ao final; se inviável, usar escala Likert 1-5 para esforço geral.
- **Confiança:** Perguntar quão confiante ficaram em usar o app (escala 1-5).

## Pós-teste
- **Entrevista breve:** Perguntar sensação geral de esforço, pontos positivos, momentos de frustração e funcionalidades ausentes.
- **Perguntas orientadoras:** "O que mais surpreendeu positivamente?"; "Qual ação você gostaria que fosse mais simples?"; "Usaria esse app no trabalho atual? Por quê?"
- **Prioridades de melhoria:** Pedir ao participante que destaque o problema mais crítico enfrentado.
- **Agradecimento e próximos passos:** Informar como os resultados serão utilizados e prazo para retorno (se aplicável).

## Análise e próximos passos
- Consolidar dados quantitativos e qualitativos na planilha compartilhada.
- Identificar padrões de erro por tarefa e cruzar com severidade.
- Priorizar ajustes com foco em problemas Alta/Crítica e tarefas não concluídas.
- Compartilhar resumo executivo com equipe (máx. 1 página) e planejar rodada de validação após correções.
