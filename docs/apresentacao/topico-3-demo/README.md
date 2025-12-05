# Tópico 3 — Demo Prática (Fernando)

Tempo estimado total: **5 a 6 minutos**. Gravar compartilhando a tela do navegador em modo mobile (390px).

## 1. Introdução e conexão (0:00 - 0:45)
- Texto sugerido:
   - "Obrigado pela explicação metodológica. Agora, como o NewGit funciona na prática?
   - O que eu vou mostrar aqui é o resultado da nossa Fase 5 e as correções críticas que aplicamos na Fase 6. O nosso objetivo foi pegar aquelas personas, o João e a Camila, e dar a eles a autonomia que o app original não dava.
   - Eu vou navegar pelos três fluxos principais que redesenhamos: a Criação de Repositório, o Upload de Arquivos e a Filtragem de Notificações. Vamos lá."
- Ação: manter a tela inicial do protótipo já carregada.
- Mostrar brevemente um print/vídeo do app original para reforçar o estado "somente leitura" antes de mudar para o protótipo.

## 2. Fluxo 1 — Criação de repositório (0:45 - 2:00)
- Texto sugerido:
   - "Primeiro, vamos atacar o problema mais grave que identificamos na Fase 3: a impossibilidade de criar um repositório pelo celular.
   - No app original, essa função simplesmente não existia. Aqui no protótipo, nós trouxemos esse botão 'Novo Repositório' para um lugar de destaque, logo abaixo da barra de busca, além do menu superior."
- Ações na tela:
   - Mostrar a tela inicial.
   - Caso possível, colocar lado a lado (ou rapidamente alternar) com o app original que não tinha o botão.
   - Clicar em "Novo Repositório" (botão tracejado ou ícone +).
   - Preencher campos: Owner, nome `projeto-ihc-final`, visibilidade.
   - Clicar em "Create Repository".
- Texto ao concluir:
   - "Pronto. Em menos de 10 segundos, resolvemos uma frustração que obrigava o usuário a ligar o notebook só para começar um projeto."

## 3. Fluxo 2 — Upload de arquivo (2:00 - 4:00)
- Texto sugerido:
   - "Agora, eu quero chamar a atenção para o fluxo de upload, que foi onde aprendemos nossa maior lição na Fase 6.
   - Imaginem a persona Camila: ela precisa subir um arquivo de log urgente enquanto está no ônibus.
   - Nos primeiros testes, nós tínhamos colocado o botão de upload lá no final da lista. O resultado? 33% de taxa de sucesso. Os usuários não rolavam a tela e não achavam o botão.
   - Corrigimos isso trazendo o botão de ação primária, esse com o ícone de +, para o topo da lista, antes de qualquer arquivo."
- Ações na tela:
   - Entrar no repositório criado (ou `mobile-app`) e abrir a aba "Arquivos".
   - Apontar cursor para o botão `+` no topo.
   - Antes de clicar, mostrar captura ou trecho do app original onde o botão ficava "abaixo da dobra" (ou inexistente).
   - Clicar no botão, escolher arquivo fictício (ex.: `hotfix.md`) e confirmar envio.
- Texto ao finalizar:
   - "Vejam a diferença: o botão está visível imediatamente. Eu clico, seleciono o arquivo e envio. Sem rolagem, sem procura, sem erro."

## 4. Fluxo 3 — Filtrar notificações (4:00 - 5:30)
- Texto sugerido:
   - "Por fim, a organização. O GitHub original mistura tudo. Para um usuário mobile, isso é ruído.
   - Aqui na aba de notificações, implementamos filtros visuais claros. Se eu sou o João e quero saber onde meu professor me citou, eu clico direto em 'Mencionado'."
- Ações na tela:
   - Abrir aba de notificações (ícone de sino).
   - Exibir rapidamente como a lista se apresentava no app original sem filtros claros.
   - Clicar no filtro "Mencionado" e mostrar a lista filtrada.
- Texto de fechamento:
   - "Isso limpa a interface e permite que o usuário foque no que é urgente.
   - O que vocês viram aqui não foi apenas um redesign bonito. Foi uma mudança de fluxo para permitir que tarefas críticas — criar, subir arquivos e responder — sejam feitas em movimento.
   - Mas será que essas mudanças realmente funcionaram nos números finais? Para mostrar os dados da nossa validação, eu passo a palavra para o nosso analista de dados."

## Check-list final
- [ ] Abrir o protótipo e ajustar para modo mobile antes da gravação.
- [ ] Limpar testes anteriores (`localStorage`) e preparar arquivo de upload.
- [ ] Ensaiar a fala com cronômetro para ficar entre 5 e 6 minutos.
- [ ] Alinhar transição com o responsável pelo Tópico 4.
