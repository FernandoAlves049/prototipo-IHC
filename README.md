# GitHub Mobile – Protótipo de Fluxo Rápido

> Protótipo navegável criado na disciplina de Interação Humano-Computador para validar fluxos críticos de colaboração no GitHub Mobile.

## Visão Rápida
| Aspecto | Detalhes |
| --- | --- |
| Público | Estudantes e desenvolvedores com experiência intermediária em Git |
| Plataforma | Protótipo web responsivo (390x844) |
| Foco | Criação de repositórios, revisão de PRs, upload rápido e priorização de alertas |
| Status | Em avaliação com testes de usabilidade moderados |

## Objetivos do Protótipo
- Validar se usuários compreendem a hierarquia entre abas e subabas sem instrução adicional.
- Medir fluidez e clareza nas ações principais (criar repositório, revisar PR, enviar arquivo, filtrar notificações).
- Coletar feedback qualitativo para ajustes de rotulagem, feedback visual e distribuição de ações.

## Estrutura do Repositório
| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Ponto de entrada do protótipo interativo |
| `img/` | Recursos visuais utilizados nas telas |
| `teste-usabilidade.md` | Plano completo de preparação, execução e análise dos testes |
| `docs/` | Kit de sessão com planilha, script, checklist e responsáveis |

## Como Executar o Protótipo
1. Abra `index.html` em um navegador Chromium ou Firefox.
2. Ative o modo responsivo e defina a viewport para 390x844.
3. Interaja com cliques ou toques simulados para percorrer menus, subabas e fluxos principais.

## Interações Simuladas
- Fluxo completo de criação de repositório com estado de sucesso e retorno direto para os detalhes (aba Visão geral).
- Navegação entre abas e subabas com breadcrumbs e botão de retorno na barra superior.
- Revisão de pull request com formulário de comentário, breadcrumbs contextuais e feedback em toast.
- Upload de arquivos com armazenamento local simulado, listagem atualizada e confirmação visual.
- Filtros de notificações ativos destacando prioridades (Alta, Média, Baixa) em tempo real.

## Artefatos de Pesquisa
- `teste-usabilidade.md`: roteiro com hipóteses, tarefas, métricas e plano de análise.
- `docs/planilha-metricas.csv`: coleta padronizada de sucesso, tempo, severidade, citações e escalas pós-tarefa.
- `docs/script-sessao.md`: guia de condução com script de abertura, sondagens e encerramento.
- `docs/checklist-setup.md`: verificação rápida de ambiente, protótipo e gravação antes das sessões.
- `docs/equipe-sessao.md`: contatos e responsabilidades de moderadores e observadores.
- Gravações de sessão (opcional): evidenciar comportamentos e falas críticas.



