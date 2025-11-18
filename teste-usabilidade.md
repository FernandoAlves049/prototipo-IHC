# Roteiro de Teste de Usabilidade

> Sessões moderadas para validar fluxos críticos do protótipo **GitHub Mobile – Fluxo de gerenciamento rápido**.

## Visão Geral
| Tema | Descrição |
| --- | --- |
| Objetivos | 1) Confirmar que tarefas críticas são concluídas sem fricção. 2) Detectar gargalos de navegação, rotulagem e feedback. 3) Medir confiança e esforço percebido. |
| Hipóteses | (a) A hierarquia entre abas/subabas é intuitiva. (b) A ação de upload é facilmente encontrada em "Arquivos". (c) Filtros de notificações comunicam prioridade com clareza. |
| Participantes | 5 a 7 estudantes/desenvolvedores com experiência intermediária em Git que colaboraram via apps mobile nos últimos 6 meses. |
| Duração | ~40 minutos por sessão (5 introdução · 25 tarefas · 10 pós-teste). |

## Logística da Sessão
- **Ambiente:** Notebook com `index.html` aberto em navegador Chromium ou Firefox no modo responsivo 390x844.
- **Registro:** Gravação de tela/áudio (ex.: OBS), cronômetro visível ao moderador e planilha de métricas compartilhada.
- **Consentimento:** Coletar autorização de uso de dados e gravações em relatório interno.
- **Equipe:** Moderador conduz e estimula pensamento em voz alta; observador registra métricas, citações e comportamentos.
- **Backup:** Garantir conexão estável, testar protótipo antes da sessão e manter arquivos locais para contingência offline.

## Preparação Passo a Passo
1. Validar que o protótipo funciona (links, interações simuladas e feedback visual).
2. Abrir `index.html`, ajustar viewport para 390x844 e ocultar elementos de navegador que distraiam.
3. Revisar roteiro, perguntas de sondagem e critérios de sucesso; alinhar papéis de moderador e observador.
4. Testar gravação (áudio/vídeo), garantir armazenamento livre e definir nomenclatura de arquivos.
5. Separar formulários: consentimento, ficha do participante (demografia, experiência com Git e apps mobile) e planilha de notas.
6. Reforçar ao participante que o foco é avaliar o produto; incentivar relato em voz alta durante tentativas.
7. Registrar horário de início e fim da sessão para posterior organização de dados.
8. Conferir o checklist de setup em `docs/checklist-setup.md` e validar que o kit da sessão está completo.
9. Deixar aberto o script de condução (`docs/script-sessao.md`) para seguir a mesma cadência em todas as sessões.

## Kit de Sessão
- **Planilha de métricas:** `docs/planilha-metricas.csv` com cabeçalhos padronizados para sucesso, tempo, severidade, citações e escalas (NASA-TLX reduzida, confiança).
- **Script da sessão:** `docs/script-sessao.md` com fala de abertura, instruções de condução e perguntas de sondagem.
- **Checklist de setup:** `docs/checklist-setup.md` para garantir ambiente, protótipo e gravações prontos antes de cada rodada.
- **Equipe:** `docs/equipe-sessao.md` lista papéis, contatos e observações para moderadores e observadores.

## Roteiro de Tarefas
Para cada tarefa, iniciar o cronômetro quando a instrução terminar de ser lida. Evitar pistas durante a execução e usar as perguntas de sondagem apenas após a tentativa.

### Tarefa 1 — Criar um novo repositório
- **Instrução:** "Você precisa iniciar um novo projeto para o seu time. Como faria isso pelo aplicativo?"
- **Critérios de sucesso:** Abrir aba "Repositórios", tocar em "Novo", preencher dados plausíveis e confirmar.
- **Sondagem:** "O que esperava encontrar após tocar em Novo?" · "Algum campo gerou dúvida?"

---

### Tarefa 2 — Ver detalhes de um repositório existente
- **Instrução:** "Verifique as atividades recentes do repositório mobile-app."
- **Critérios de sucesso:** Localizar "mobile-app", acessar "Visão geral" e mencionar ao menos um elemento recente.
- **Sondagem:** "A visão geral trouxe o que você esperava?" · "Os rótulos da aba fizeram sentido?"

---

### Tarefa 3 — Revisar um Pull Request
- **Instrução:** "Há um pull request chamado hotfix/login que precisa de feedback. Encontre-o e registre um comentário."
- **Critérios de sucesso:** Acessar subaba "Pull Requests", abrir "hotfix/login" e adicionar comentário ou ação equivalente.
- **Sondagem:** "O fluxo de revisão pareceu familiar?" · "Faltou alguma informação antes de comentar?"

---

### Tarefa 4 — Enviar um arquivo para o repositório
- **Instrução:** "Imagine que você precisa enviar rapidamente um arquivo para o repositório. Como faria isso pelo app?"
- **Critérios de sucesso:** Entrar em "Arquivos", iniciar upload e finalizar confirmação (mesmo que simulada).
- **Sondagem:** "Onde imaginou que estaria a opção de upload?" · "O feedback após o envio ficou claro?"

---

### Tarefa 5 — Filtrar notificações
- **Instrução:** "Você quer priorizar notificações críticas. Como localizaria rapidamente os alertas mais importantes?"
- **Critérios de sucesso:** Abrir "Notificações", identificar e aplicar filtros de prioridade, apontar qual alerta trataria primeiro.
- **Sondagem:** "Os filtros estavam claros?" · "Sentiu falta de algum critério de ordenação?"

---

### Tarefa 6 — Exploração opcional
- **Instrução:** "Há algo que você gostaria de fazer neste app que não cobrimos? Tente realizá-lo rapidamente."
- **Objetivo:** Captar expectativas não mapeadas, oportunidades futuras e funcionalidades desejadas.

## Métricas e Instrumentação
| Métrica | Descrição |
| --- | --- |
| Sucesso por tarefa | Classificar como concluiu, parcialmente concluiu ou não concluiu; anotar bloqueios e momento exato. |
| Tempo | Cronometrar da leitura da instrução até a conclusão ou desistência; registrar em segundos. |
| Erros/Desvios | Mapear cliques extras, caminhos alternativos, tentativas repetidas e comentários sobre confusão. |
| Citações e observações | Registrar falas textuais relevantes com carimbo de tempo e contexto. |
| Severidade | Classificar problemas por Nielsen (Baixa, Média, Alta, Crítica) com breve justificativa. |
| Carga percebida | Aplicar NASA-TLX reduzida (esforço mental, físico, frustração) ou escala Likert 1-5 se houver restrição de tempo. |
| Confiança | Escala 1-5 perguntando: "Quão confiante você se sente usando este app após as tarefas?" |

- **Registro em tempo real:** utilizar `docs/planilha-metricas.csv` para centralizar dados quantitativos e qualitativos durante a sessão.

## Pós-Teste
- **Entrevista rápida:** Sensação geral de esforço, pontos positivos, momentos de frustração e funcionalidades ausentes.
- **Perguntas-guia:** "O que mais surpreendeu positivamente?" · "Qual ação gostaria que fosse mais simples?" · "Usaria o app hoje? Por quê?"
- **Prioridades:** Solicitar que o participante aponte o problema mais crítico experienciado.
- **Encerramento:** Agradecer participação e informar como insights serão tratados e quando resultados serão compartilhados.

## Análise e Próximos Passos
- Consolidar dados quantitativos e qualitativos na planilha compartilhada (`docs/planilha-metricas.csv`), destacando severidade e frequência por tarefa.
- Identificar padrões de erro, desconfortos recorrentes e oportunidades emergentes da tarefa exploratória.
- Priorizar correções com foco em issues de severidade Alta/Crítica e tarefas não concluídas.
- Produzir resumo executivo (máx. 1 página) para o time e planejar nova rodada de validação após ajustes críticos.
