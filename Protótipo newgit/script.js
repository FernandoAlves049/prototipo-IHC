<<<<<<< HEAD
// Seletores DOM
const device = document.querySelector(".device");
const topbar = document.querySelector(".topbar");
const topbarTitle = document.querySelector(".topbar-title");
const backButton = document.querySelector("[data-nav-back]");
const menuButton = document.querySelector("[data-sheet-target='account']");
const screens = Array.from(document.querySelectorAll(".screen"));
const bottomItems = Array.from(document.querySelectorAll(".bottom-item"));
const subTabs = Array.from(document.querySelectorAll(".sub-tab"));
const subScreens = Array.from(document.querySelectorAll(".sub-screen"));
const sheets = Array.from(document.querySelectorAll(".sheet"));
const sheetBackdrop = document.querySelector(".sheet-backdrop");
const segmentedButtons = Array.from(document.querySelectorAll(".segmented"));
const segmentedPanels = Array.from(document.querySelectorAll("[data-segment-panel]"));
const notificationFilters = Array.from(document.querySelectorAll(".filter"));
const notificationPanels = Array.from(document.querySelectorAll("[data-filter-panel]"));
const bottomNav = document.querySelector(".bottom-nav");
const appRoot = document.getElementById("app");
const toast = document.querySelector("[data-toast]");

// Seletores de Autenticação (não usados no fluxo principal, mas parte do código)
const authScreen = document.getElementById("auth-screen");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authMessage = document.getElementById("auth-message");
const authToggleButtons = Array.from(document.querySelectorAll("[data-auth-toggle]"));

// Seletores de Upload
const quickUploadInput = document.querySelector("#quick-upload");
const quickUploadLabel = document.querySelector("#screen-submit-file .filename");
const uploadList = document.querySelector("#sub-files [data-upload-list]");

const rootScreens = new Set(["home", "repos", "explore", "pulls", "notifications", "profile"]);
const navigationStack = [];

let toastTimeout = null;

// Constantes de Simulação de Storage
const USER_STORAGE_KEY = "gh-mobile-user";
const SESSION_STORAGE_KEY = "gh-mobile-session";
const UPLOAD_STORAGE_KEY = "gh-mobile-uploads";
const UPLOAD_LIMIT = 20; // Limita o histórico de uploads
let pendingUpload = null;
let isReadingUpload = false;

// Seletores de Detalhes do Repositório
const repoDetailSection = document.querySelector("#screen-repo-details");
const detailOwner = repoDetailSection?.querySelector(".repo-heading .owner");
const detailName = repoDetailSection?.querySelector(".repo-heading h1");
const detailAvatar = repoDetailSection?.querySelector(".owner-avatar");
const detailSummaryTitle = repoDetailSection?.querySelector(".summary-card h3");
const detailDescription = repoDetailSection?.querySelector(".repo-description");
const detailStatStars = repoDetailSection?.querySelector("[data-stat='stars']");
const detailStatUpdated = repoDetailSection?.querySelector("[data-stat='updated']");
const breadcrumbRoot = repoDetailSection?.querySelector("[data-breadcrumb-root]");
const breadcrumbCurrent = repoDetailSection?.querySelector("[data-breadcrumb-current]");
const breadcrumbCommentRoot = document.querySelector("[data-breadcrumb-comment-root]");
const breadcrumbUploadRoot = document.querySelector("[data-breadcrumb-upload-root]");
const breadcrumbPr = document.querySelector("[data-breadcrumb-pr]");
const breadcrumbUpload = document.querySelector("[data-breadcrumb-upload]");
const repoList = document.querySelector(".repo-list[data-segment-panel='all']"); // Alvo específico

// Seletores de Telas de Submissão
const submitCommentHeading = document.querySelector("#screen-submit-comment h2");
const submitFileHeading = document.querySelector("#screen-submit-file h2");
const submitFileButton = document.querySelector("#screen-submit-file .primary");

// Seletores da Tela de Sucesso
const successScreen = document.querySelector("#screen-repo-created");
const successRepoName = successScreen?.querySelector("strong");
const successButton = successScreen?.querySelector(".primary");

// Estado Global Simulado
let currentScreen = "repos"; // Tela inicial do protótipo
let currentNavKey = "repos";
let currentRepo = {
  owner: "newgit",
  name: "mobile-app",
  description: "App mobile para revisão rápida de pull requests.",
  stars: "128",
  updated: "há 2 dias"
};
let currentPullRequest = "hotfix/login";

/**
 * Exibe uma tela específica e atualiza a navegação.
 * @param {string} screenKey - A chave da tela (ex: "home", "repos").
 * @param {object} options - Opções como "title" e "navKey".
 */
function showScreen(screenKey, options = {}) {
  const targetId = `screen-${screenKey}`;
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`Tela não encontrada: ${targetId}`);
    return;
  }

  const navKey = options.navKey ?? screenKey;
  const title = options.title || target.dataset.title || topbar.dataset.defaultTitle || "GitHub";
  const skipHistory = options.skipHistory === true;
  const isRoot = rootScreens.has(screenKey);

  if (!skipHistory && currentScreen && currentScreen !== screenKey) {
    navigationStack.push({
      screen: currentScreen,
      title: topbarTitle?.textContent || "",
      navKey: currentNavKey
    });
  }

  if (isRoot) {
    navigationStack.length = 0;
  }

  // Esconde todas as telas e mostra a tela alvo
  screens.forEach(section => {
    section.classList.toggle("active", section === target);
  });

  // Atualiza o item ativo na barra de navegação inferior
  bottomItems.forEach(item => {
    item.classList.toggle("active", item.dataset.screen === navKey);
  });

  // Atualiza o título na barra superior
  if (topbarTitle) {
    topbarTitle.textContent = title;
  }

  if (backButton) {
    backButton.hidden = isRoot;
    backButton.setAttribute("aria-hidden", isRoot ? "true" : "false");
  }

  if (menuButton) {
    menuButton.hidden = !isRoot;
    menuButton.setAttribute("aria-hidden", !isRoot ? "true" : "false");
  }

  currentScreen = screenKey;
  currentNavKey = navKey;
}

function hideToast() {
  if (!toast) {
    return;
  }
  toast.classList.remove("visible");
  clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    if (!toast.classList.contains("visible")) {
      toast.hidden = true;
      toast.textContent = "";
    }
  }, 200);
}

function showToast(message, duration = 2600) {
  if (!toast || !message) {
    return;
  }
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(hideToast, duration);
}

function handleBackNavigation() {
  const previous = navigationStack.pop();
  if (previous) {
    showScreen(previous.screen, {
      title: previous.title,
      navKey: previous.navKey,
      skipHistory: true
    });
    return;
  }
  showScreen("repos", {
    title: "Repositórios",
    navKey: "repos",
    skipHistory: true
  });
}

/**
 * Ativa uma sub-tela (abas dentro de uma tela, ex: "Arquivos" em Repositório).
 * @param {string} subId - O ID da sub-tela a ser mostrada.
 */
function setActiveSubScreen(subId) {
  subScreens.forEach(sub => {
    sub.classList.toggle("active", sub.id === `sub-${subId}`);
  });

  subTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.subscreen === subId);
  });
}

/**
 * Gerencia a seleção de botões segmentados (ex: "Todos", "Meus").
 * @param {HTMLElement} target - O botão segmentado que foi clicado.
 */
function setActiveSegment(target) {
  segmentedButtons.forEach(button => {
    button.classList.toggle("active", button === target);
    button.setAttribute("aria-pressed", button === target ? "true" : "false");
  });

  const keyToShow = target?.dataset.segmentKey || segmentedPanels[0]?.dataset.segmentPanel;
  segmentedPanels.forEach(panel => {
    const isMatch = panel.dataset.segmentPanel === keyToShow;
    panel.classList.toggle("hidden", !isMatch);
    panel.setAttribute("aria-hidden", isMatch ? "false" : "true");
  });
}

/**
 * Gerencia os filtros na tela de notificações.
 * @param {HTMLElement} target - O botão de filtro que foi clicado.
 */
function setActiveFilter(target) {
  notificationFilters.forEach(button => {
    button.classList.toggle("active", button === target);
    button.setAttribute("aria-pressed", button === target ? "true" : "false");
  });

  const keyToShow = target?.dataset.filterKey || notificationPanels[0]?.dataset.filterPanel;
  notificationPanels.forEach(panel => {
    const isMatch = panel.dataset.filterPanel === keyToShow;
    panel.classList.toggle("hidden", !isMatch);
    panel.setAttribute("aria-hidden", isMatch ? "false" : "true");
  });
}

/**
 * Abre um modal (sheet) pelo nome.
 * @param {string} name - O nome do sheet (ex: "create-menu").
 */
function openSheet(name) {
  const sheet = document.getElementById(`sheet-${name}`);
  if (!sheet) {
    return;
  }
  sheets.forEach(item => item.classList.remove("open"));
  sheet.classList.add("open");
  if (sheetBackdrop) {
    sheetBackdrop.hidden = false;
  }
}

/**
 * Fecha todos os modais (sheets) abertos.
 */
function closeSheets() {
  sheets.forEach(item => item.classList.remove("open"));
  if (sheetBackdrop) {
    sheetBackdrop.hidden = true;
  }
}

/**
 * Reseta o estado do input de upload de arquivo.
 */
function resetQuickUpload() {
  pendingUpload = null;
  isReadingUpload = false;
  if (quickUploadInput) {
    quickUploadInput.value = "";
  }
  if (quickUploadLabel) {
    const fallback = quickUploadLabel.dataset.default || "Nenhum arquivo selecionado";
    quickUploadLabel.textContent = fallback;
  }
}

/**
 * Carrega os uploads simulados do localStorage.
 * @returns {object} - Objeto com os uploads por repositório.
 */
function loadUploads() {
  try {
    const raw = localStorage.getItem(UPLOAD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Falha ao carregar uploads", error);
    return {};
  }
}

/**
 * Salva os uploads simulados no localStorage.
 * @param {object} data - Objeto de uploads para salvar.
 */
function saveUploads(data) {
  try {
    localStorage.setItem(UPLOAD_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Falha ao salvar uploads", error);
  }
}

/**
 * Obtém a chave única do repositório (owner/name).
 * @param {object} repo - O objeto do repositório atual.
 * @returns {string|null} - A chave do repositório.
 */
function getRepoKey(repo = currentRepo) {
  if (!repo || !repo.owner || !repo.name) {
    return null;
  }
  return `${repo.owner}/${repo.name}`;
}

// --- Funções de formatação (Helpers) ---
function formatRelativeTime(timestamp) {
  if (!timestamp) return "agora mesmo";
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  if (diff < minute) return "agora mesmo";
  if (diff < hour) {
    const minutes = Math.round(diff / minute);
    return `há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }
  if (diff < day) {
    const hours = Math.round(diff / hour);
    return `há ${hours} ${hours === 1 ? "hora" : "horas"}`;
  }
  if (diff < week) {
    const days = Math.round(diff / day);
    return `há ${days} ${days === 1 ? "dia" : "dias"}`;
  }
  const weeks = Math.round(diff / week);
  if (weeks < 5) return `há ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  const months = Math.round(diff / (30 * day));
  if (months < 12) return `há ${months} ${months === 1 ? "mês" : "meses"}`;
  const years = Math.round(diff / (365 * day));
  return `há ${years} ${years === 1 ? "ano" : "anos"}`;
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes)) return "-";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
// --- Fim das Funções de formatação ---

/**
 * Renderiza a lista de arquivos "enviados" (do localStorage) na UI.
 */
function renderUploads() {
  if (!uploadList) {
    return;
  }
  const uploads = loadUploads();
  const repoKey = getRepoKey();
  uploadList.innerHTML = ""; // Limpa a lista

  if (!repoKey || !uploads[repoKey] || uploads[repoKey].length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "upload-empty";
    emptyItem.textContent = "Nenhum arquivo enviado ainda.";
    uploadList.append(emptyItem);
    return;
  }

  // Adiciona cada arquivo da simulação
  uploads[repoKey].forEach(entry => {
    const li = document.createElement("li");
    const info = document.createElement("div");
    const nameEl = document.createElement("strong");
    nameEl.textContent = entry.name;
    const metaEl = document.createElement("span");
    const parts = [formatRelativeTime(entry.uploadedAt), formatFileSize(entry.size)];
    if (entry.message) {
      parts.push(entry.message);
    }
    metaEl.textContent = parts.join(" · ");
    info.append(nameEl, metaEl);

    // Simula um link de download (Data URL)
    const downloadLink = document.createElement("a");
    downloadLink.className = "secondary";
    downloadLink.textContent = "Baixar";
    downloadLink.href = entry.content;
    downloadLink.download = entry.name;

    li.append(info, downloadLink);
    uploadList.append(li);
  });
}

/**
 * Processa o arquivo pendente (lido do input) e salva no localStorage.
 * @param {HTMLFormElement} form - O formulário de envio.
 * @returns {boolean} - Sucesso ou falha.
 */
function processPendingUpload(form) {
  if (isReadingUpload) {
    // Usando console.warn em vez de alert para não travar o teste
    console.warn("Aguarde o carregamento do arquivo.");
    return false;
  }
  if (!pendingUpload) {
    console.warn("Selecione um arquivo antes de enviar.");
    return false;
  }
  const uploads = loadUploads();
  const repoKey = getRepoKey();
  if (!repoKey) {
    console.warn("Selecione um repositório válido.");
    return false;
  }

  const messageInput = form?.querySelector("input[type='text']");
  const message = messageInput?.value?.trim() || "Upload via app";
  const entry = {
    ...pendingUpload,
    uploadedAt: Date.now(),
    message
  };

  const repoUploads = uploads[repoKey] || [];
  repoUploads.unshift(entry); // Adiciona no início
  uploads[repoKey] = repoUploads.slice(0, UPLOAD_LIMIT); // Limita o histórico

  saveUploads(uploads);
  if (messageInput) {
    messageInput.value = "";
  }

  renderUploads();
  resetQuickUpload();
  return true;
}

/**
 * Gera iniciais a partir do nome do "owner".
 * @param {string} owner - Nome do owner.
 * @returns {string} - Iniciais (ex: "NG").
 */
function initialsFromOwner(owner) {
  if (!owner) return "--";
  const parts = owner.split(/[\W_]+/).filter(Boolean);
  if (parts.length === 0) return owner.slice(0, 2).toUpperCase();
  const chars = parts.map(part => part.charAt(0)).join("");
  return chars.slice(0, 2).toUpperCase();
}

/**
 * Atualiza a tela de detalhes do repositório com novos dados.
 * @param {object} data - Dados do repositório.
 */
function updateRepoDetails(data) {
  currentRepo = { ...currentRepo, ...data };

  if (repoDetailSection) repoDetailSection.dataset.title = data.name;
  if (detailOwner) detailOwner.textContent = data.owner;
  if (detailName) detailName.textContent = data.name;
  if (detailAvatar) detailAvatar.textContent = initialsFromOwner(data.owner);
  if (detailSummaryTitle) detailSummaryTitle.textContent = `Atividade recente em ${data.name}`;
  if (detailDescription && data.description) detailDescription.textContent = data.description;

  if (detailStatStars) {
    const starsValue = data.stars !== undefined ? data.stars : currentRepo.stars;
    detailStatStars.textContent = `⭐ ${starsValue} favoritos`;
  }
  if (detailStatUpdated) {
    const updatedValue = data.updated || currentRepo.updated;
    detailStatUpdated.textContent = `Atualizado ${updatedValue}`;
  }

  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = data.name;
  }
  if (breadcrumbCommentRoot) {
    breadcrumbCommentRoot.textContent = data.name;
  }
  if (breadcrumbUploadRoot) {
    breadcrumbUploadRoot.textContent = data.name;
  }

  // Atualiza telas dependentes (Envio de Arquivo, Sucesso)
  if (submitFileHeading) submitFileHeading.textContent = `Enviar arquivo — ${data.name}`;
  if (submitFileButton) submitFileButton.textContent = `Submeter para ${data.name}`;
  if (successButton) {
    successButton.dataset.repoOwner = data.owner;
    successButton.dataset.repoName = data.name;
  }

  renderUploads(); // Recarrega os uploads para este repositório
}

/**
 * Manipula o clique em um card de repositório.
 * @param {HTMLElement} card - O elemento <li> do card clicado.
 */
function handleRepoCard(card, options = {}) {
  const data = {
    owner: card.dataset.repoOwner,
    name: card.dataset.repoName,
    description: card.dataset.repoDescription,
    stars: card.dataset.repoStars,
    updated: card.dataset.repoUpdated
  };
  updateRepoDetails(data);
  showScreen("repo-details", {
    title: data.name,
    navKey: "repos",
    skipHistory: options.skipHistory === true
  });
  setActiveSubScreen(options.subscreen || "overview");
  if (options.toast) {
    showToast(options.toast);
  }
}

/**
 * Manipula o fluxo de criação de repositório (simulado).
 * @param {HTMLElement} trigger - O botão que disparou a criação.
 */
function handleCreateFlow(trigger) {
  const form = trigger.closest("form");
  if (!form) return;

  const owner = form.querySelector("select")?.value?.trim() || "newgit";
  const nameValue = form.querySelector("input[type='text']")?.value?.trim();
  const repoName = nameValue && nameValue.length ? nameValue : "novo-repositorio";

  const repoData = {
    owner,
    name: repoName,
    description: "Repositório criado pelo app",
    stars: "0",
    updated: "agora mesmo"
  };

  // Prepara a tela de sucesso com os dados
  if (successRepoName) successRepoName.textContent = `${owner}/${repoName}`;
  if (successButton) {
    Object.keys(repoData).forEach(key => {
      successButton.dataset[`repo${key.charAt(0).toUpperCase() + key.slice(1)}`] = repoData[key];
    });
  }

  renderRepoCard(repoData); // Adiciona o novo repo na lista
  showScreen("repo-created", { title: "Sucesso", navKey: "repos" });
}

/**
 * Manipula o clique para comentar em um PR.
 * @param {HTMLElement} target - O elemento que disparou a ação.
 */
function handlePullRequestTrigger(target) {
  const prTitle = target.dataset.prTitle || target.closest("[data-pr-title]")?.dataset.prTitle || currentPullRequest;
  currentPullRequest = prTitle;
  if (submitCommentHeading) {
    submitCommentHeading.textContent = `Comentário em ${prTitle}`;
  }
  if (breadcrumbPr) {
    breadcrumbPr.textContent = prTitle;
  }
  if (breadcrumbCommentRoot) {
    breadcrumbCommentRoot.textContent = currentRepo.name;
  }
  showScreen("submit-comment", { title: "Comentar PR", navKey: "repos" });
}

/**
 * Manipulador principal para gatilhos de navegação de tela.
 * @param {HTMLElement} trigger - O elemento (botão, li, etc.) com `data-screen`.
 */
function handleScreenTrigger(trigger) {
  const screenKey = trigger.dataset.screen;
  if (!screenKey) return;

  const returnSubscreen = trigger.dataset.returnSubscreen;
  const toastMessage = trigger.dataset.toast;
  const skipHistory = trigger.dataset.skipHistory === "true";
  let historyPopped = false;

  const popHistoryIfNeeded = () => {
    if (skipHistory && !historyPopped && navigationStack.length) {
      navigationStack.pop();
      historyPopped = true;
    }
  };

  // Lógica específica para o fluxo de SUBMISSÃO DE ARQUIVO
  if (trigger.closest("#screen-submit-file") && screenKey === "repo-details") {
    // Tenta processar o upload ANTES de navegar
    const form = trigger.closest("form");
    const success = processPendingUpload(form);
    if (!success) {
      showToast("Selecione um arquivo antes de enviar");
      return;
    }
    popHistoryIfNeeded();
  }

  // Fecha o sheet se a navegação partiu de dentro de um
  if (trigger.closest(".sheet")) {
    closeSheets();
  }

  // Se o gatilho for um card de repositório (que tem data-repo-name)
  if (screenKey === "repo-details" && trigger.dataset.repoName) {
    popHistoryIfNeeded();
    handleRepoCard(trigger, {
      subscreen: returnSubscreen,
      toast: toastMessage,
      skipHistory
    });
    return;
  }

  // Se for o botão "Criar repositório" (que leva a repo-created)
  if (screenKey === "repo-created") {
    handleCreateFlow(trigger);
    return;
  }

  // Se for um botão de "Comentar PR"
  if (screenKey === "submit-comment") {
    handlePullRequestTrigger(trigger);
    return;
  }

  // Se for o botão "Ir para repositório" (da tela de sucesso)
  if (screenKey === "repo-details" && trigger.dataset.repoOwner) {
    const data = {
      owner: trigger.dataset.repoOwner,
      name: trigger.dataset.repoName,
      description: trigger.dataset.repoDescription || currentRepo.description,
      stars: trigger.dataset.repoStars || currentRepo.stars,
      updated: trigger.dataset.repoUpdated || currentRepo.updated
    };
    updateRepoDetails(data);
    popHistoryIfNeeded();
    showScreen("repo-details", { title: data.name, navKey: "repos", skipHistory });
    setActiveSubScreen(returnSubscreen || "overview"); // Define aba
    if (toastMessage) {
      showToast(toastMessage);
    }
    return;
  }

  // Navegação padrão
  const options = {
    title: trigger.dataset.title,
    navKey: trigger.dataset.navKey,
    skipHistory
  };
  popHistoryIfNeeded();
  showScreen(screenKey, options);

  if (screenKey === "repo-details" && returnSubscreen) {
    setActiveSubScreen(returnSubscreen);
  }

  if (toastMessage) {
    showToast(toastMessage);
  }
}

/**
 * Renderiza um novo card de repositório na lista (ou atualiza um existente).
 * @param {object} data - Dados do repositório a ser renderizado.
 */
function renderRepoCard(data) {
  if (!repoList || !data.owner || !data.name) {
    return;
  }

  const selector = `[data-repo-owner="${data.owner}"][data-repo-name="${data.name}"]`;
  const existing = repoList.querySelector(selector);

  // Atualiza se já existir
  if (existing) {
    existing.dataset.repoDescription = data.description;
    existing.dataset.repoStars = data.stars;
    existing.dataset.repoUpdated = data.updated;
    const title = existing.querySelector(".repo-title h2");
    const description = existing.querySelector("p");
    const metaItems = existing.querySelectorAll(".meta-item");
    if (title) title.textContent = `${data.owner}/${data.name}`;
    if (description) description.textContent = data.description;
    if (metaItems[0]) metaItems[0].textContent = `Atualizado ${data.updated}`;
    if (metaItems[1]) metaItems[1].textContent = `★ ${data.stars}`;
    repoList.prepend(existing); // Move para o topo
    return;
  }

  // Cria novo se não existir
  const li = document.createElement("li");
  li.className = "repo-card";
  li.dataset.screen = "repo-details";
  li.dataset.repoOwner = data.owner;
  li.dataset.repoName = data.name;
  li.dataset.repoDescription = data.description;
  li.dataset.repoStars = data.stars;
  li.dataset.repoUpdated = data.updated;
  li.innerHTML = `
        <div class="repo-title">
          <h2>${data.owner}/${data.name}</h2>
          <span class="badge">Novo</span>
        </div>
        <p>${data.description}</p>
        <div class="repo-meta">
          <span class="meta-item">Atualizado ${data.updated}</span>
          <span class="meta-item">★ ${data.stars}</span>
        </div>
      `;
  repoList.prepend(li);
}

/**
 * Manipulador de clique global para o documento.
 */
function handleClick(event) {
  const target = event.target;

  // Fecha modais
  const sheetClose = target.closest("[data-sheet-close]");
  if (sheetClose) {
    event.preventDefault();
    closeSheets();
    return;
  }

  // Abre modais
  const sheetTrigger = target.closest("[data-sheet-target]");
  if (sheetTrigger) {
    event.preventDefault();
    openSheet(sheetTrigger.dataset.sheetTarget);
    return;
  }

  // Filtros segmentados (Repos)
  const segmentedTrigger = target.closest(".segmented");
  if (segmentedTrigger) {
    event.preventDefault();
    setActiveSegment(segmentedTrigger);
    return;
  }

  // Filtros (Notificações)
  const filterTrigger = target.closest(".filter");
  if (filterTrigger) {
    event.preventDefault();
    setActiveFilter(filterTrigger);
    return;
  }

  // Botão "Escolher arquivo"
  const fileTrigger = target.closest("[data-action='choose-file']");
  if (fileTrigger) {
    event.preventDefault();
    const targetId = fileTrigger.dataset.target;
    const input = targetId ? document.getElementById(targetId) : quickUploadInput;
    input?.click(); // Abre o seletor de arquivos
    return;
  }

  // Navegação da barra inferior
  const bottomTrigger = target.closest(".bottom-item");
  if (bottomTrigger) {
    event.preventDefault();
    const screenKey = bottomTrigger.dataset.screen;
    const title = bottomTrigger.dataset.title;
    showScreen(screenKey, { title });
    closeSheets(); // Fecha modais ao navegar
    return;
  }

  // Gatilho genérico de navegação de tela
  const screenTrigger = target.closest("[data-screen]");
  if (screenTrigger) {
    event.preventDefault();
    handleScreenTrigger(screenTrigger);
    return;
  }
}

/**
 * Manipulador de clique para as sub-abas (Visão Geral, PRs, Arquivos).
 */
function handleSubTabClick(event) {
  const button = event.target.closest(".sub-tab");
  if (!button) {
    return;
  }
  setActiveSubScreen(button.dataset.subscreen);
}

/**
 * Manipulador de mudança no input de arquivo (para simulação de upload).
 */
function handleFileChange(event) {
  if (!quickUploadLabel) return;
  const file = event.target.files?.[0];

  if (file) {
    isReadingUpload = true; // Trava a submissão
    quickUploadLabel.textContent = `Carregando ${file.name}...`;

    // Simula a leitura do arquivo como Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      pendingUpload = {
        name: file.name,
        size: file.size,
        type: file.type,
        content: e.target.result // Salva o conteúdo como Base64
      };
      quickUploadLabel.textContent = file.name; // Pronto para enviar
      isReadingUpload = false; // Libera a submissão
    };
    reader.onerror = () => {
      console.error("Falha ao ler o arquivo.");
      quickUploadLabel.textContent = "Erro ao ler arquivo.";
      isReadingUpload = false;
    };
    reader.readAsDataURL(file); // Inicia a leitura

  } else {
    const fallback = quickUploadLabel.dataset.default || "Nenhum arquivo selecionado";
    quickUploadLabel.textContent = fallback;
    pendingUpload = null;
  }
}

// --- Inicialização e Event Listeners ---

// Manipulador de clique principal
document.addEventListener("click", handleClick);

if (backButton) {
  backButton.addEventListener("click", handleBackNavigation);
}

// Manipulador das sub-abas
if (repoDetailSection) {
  const subTabContainer = repoDetailSection.querySelector(".sub-tabs");
  if (subTabContainer) {
    subTabContainer.addEventListener("click", handleSubTabClick);
  }
}

// Fechar modal ao clicar no backdrop
if (sheetBackdrop) {
  sheetBackdrop.addEventListener("click", closeSheets);
}

// Fechar modal com a tecla 'Escape'
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeSheets();
  }
});

// Listener para o input de arquivo
if (quickUploadInput) {
  quickUploadInput.addEventListener("change", handleFileChange);
}

// --- Estado Inicial do App ---

// Define o segmento "Todos" como ativo
if (segmentedButtons[0]) {
  setActiveSegment(segmentedButtons[0]);
}

// Define o filtro "Inbox" como ativo
if (notificationFilters[0]) {
  setActiveFilter(notificationFilters[0]);
}

// Exibe a tela inicial ("Repositórios")
showScreen("repos", { title: "Repositórios", navKey: "repos", skipHistory: true });
// Ativa a sub-aba inicial ("Visão geral")
setActiveSubScreen("overview");
// Carrega os dados do repositório padrão
updateRepoDetails(currentRepo);
=======
// Seletores DOM
const device = document.querySelector(".device");
const topbar = document.querySelector(".topbar");
const topbarTitle = document.querySelector(".topbar-title");
const backButton = document.querySelector("[data-nav-back]");
const menuButton = document.querySelector("[data-sheet-target='account']");
const screens = Array.from(document.querySelectorAll(".screen"));
const bottomItems = Array.from(document.querySelectorAll(".bottom-item"));
const subTabs = Array.from(document.querySelectorAll(".sub-tab"));
const subScreens = Array.from(document.querySelectorAll(".sub-screen"));
const sheets = Array.from(document.querySelectorAll(".sheet"));
const sheetBackdrop = document.querySelector(".sheet-backdrop");
const segmentedButtons = Array.from(document.querySelectorAll(".segmented"));
const segmentedPanels = Array.from(document.querySelectorAll("[data-segment-panel]"));
const notificationFilters = Array.from(document.querySelectorAll(".filter"));
const notificationPanels = Array.from(document.querySelectorAll("[data-filter-panel]"));
const bottomNav = document.querySelector(".bottom-nav");
const appRoot = document.getElementById("app");
const toast = document.querySelector("[data-toast]");

// Seletores de Autenticação (não usados no fluxo principal, mas parte do código)
const authScreen = document.getElementById("auth-screen");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authMessage = document.getElementById("auth-message");
const authToggleButtons = Array.from(document.querySelectorAll("[data-auth-toggle]"));

// Seletores de Upload
const quickUploadInput = document.querySelector("#quick-upload");
const quickUploadLabel = document.querySelector("#screen-submit-file .filename");
const uploadList = document.querySelector("#sub-files [data-upload-list]");

const rootScreens = new Set(["home", "repos", "explore", "pulls", "notifications", "profile"]);
const navigationStack = [];

let toastTimeout = null;

// Constantes de Simulação de Storage
const USER_STORAGE_KEY = "gh-mobile-user";
const SESSION_STORAGE_KEY = "gh-mobile-session";
const UPLOAD_STORAGE_KEY = "gh-mobile-uploads";
const UPLOAD_LIMIT = 20; // Limita o histórico de uploads
let pendingUpload = null;
let isReadingUpload = false;

// Seletores de Detalhes do Repositório
const repoDetailSection = document.querySelector("#screen-repo-details");
const detailOwner = repoDetailSection?.querySelector(".repo-heading .owner");
const detailName = repoDetailSection?.querySelector(".repo-heading h1");
const detailAvatar = repoDetailSection?.querySelector(".owner-avatar");
const detailSummaryTitle = repoDetailSection?.querySelector(".summary-card h3");
const detailDescription = repoDetailSection?.querySelector(".repo-description");
const detailStatStars = repoDetailSection?.querySelector("[data-stat='stars']");
const detailStatUpdated = repoDetailSection?.querySelector("[data-stat='updated']");
const breadcrumbRoot = repoDetailSection?.querySelector("[data-breadcrumb-root]");
const breadcrumbCurrent = repoDetailSection?.querySelector("[data-breadcrumb-current]");
const breadcrumbCommentRoot = document.querySelector("[data-breadcrumb-comment-root]");
const breadcrumbUploadRoot = document.querySelector("[data-breadcrumb-upload-root]");
const breadcrumbPr = document.querySelector("[data-breadcrumb-pr]");
const breadcrumbUpload = document.querySelector("[data-breadcrumb-upload]");
const repoList = document.querySelector(".repo-list[data-segment-panel='all']"); // Alvo específico

// Seletores de Telas de Submissão
const submitCommentHeading = document.querySelector("#screen-submit-comment h2");
const submitFileHeading = document.querySelector("#screen-submit-file h2");
const submitFileButton = document.querySelector("#screen-submit-file .primary");

// Seletores da Tela de Sucesso
const successScreen = document.querySelector("#screen-repo-created");
const successRepoName = successScreen?.querySelector("strong");
const successButton = successScreen?.querySelector(".primary");

// Estado Global Simulado
let currentScreen = "repos"; // Tela inicial do protótipo
let currentNavKey = "repos";
let currentRepo = {
  owner: "newgit",
  name: "mobile-app",
  description: "App mobile para revisão rápida de pull requests.",
  stars: "128",
  updated: "há 2 dias"
};
let currentPullRequest = "hotfix/login";

/**
 * Exibe uma tela específica e atualiza a navegação.
 * @param {string} screenKey - A chave da tela (ex: "home", "repos").
 * @param {object} options - Opções como "title" e "navKey".
 */
function showScreen(screenKey, options = {}) {
  const targetId = `screen-${screenKey}`;
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`Tela não encontrada: ${targetId}`);
    return;
  }

  const navKey = options.navKey ?? screenKey;
  const title = options.title || target.dataset.title || topbar.dataset.defaultTitle || "GitHub";
  const skipHistory = options.skipHistory === true;
  const isRoot = rootScreens.has(screenKey);

  if (!skipHistory && currentScreen && currentScreen !== screenKey) {
    navigationStack.push({
      screen: currentScreen,
      title: topbarTitle?.textContent || "",
      navKey: currentNavKey
    });
  }

  if (isRoot) {
    navigationStack.length = 0;
  }

  // Esconde todas as telas e mostra a tela alvo
  screens.forEach(section => {
    section.classList.toggle("active", section === target);
  });

  // Atualiza o item ativo na barra de navegação inferior
  bottomItems.forEach(item => {
    item.classList.toggle("active", item.dataset.screen === navKey);
  });

  // Atualiza o título na barra superior
  if (topbarTitle) {
    topbarTitle.textContent = title;
  }

  if (backButton) {
    backButton.hidden = isRoot;
    backButton.setAttribute("aria-hidden", isRoot ? "true" : "false");
  }

  if (menuButton) {
    menuButton.hidden = !isRoot;
    menuButton.setAttribute("aria-hidden", !isRoot ? "true" : "false");
  }

  currentScreen = screenKey;
  currentNavKey = navKey;
}

function hideToast() {
  if (!toast) {
    return;
  }
  toast.classList.remove("visible");
  clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    if (!toast.classList.contains("visible")) {
      toast.hidden = true;
      toast.textContent = "";
    }
  }, 200);
}

function showToast(message, duration = 2600) {
  if (!toast || !message) {
    return;
  }
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(hideToast, duration);
}

function handleBackNavigation() {
  const previous = navigationStack.pop();
  if (previous) {
    showScreen(previous.screen, {
      title: previous.title,
      navKey: previous.navKey,
      skipHistory: true
    });
    return;
  }
  showScreen("repos", {
    title: "Repositórios",
    navKey: "repos",
    skipHistory: true
  });
}

/**
 * Ativa uma sub-tela (abas dentro de uma tela, ex: "Arquivos" em Repositório).
 * @param {string} subId - O ID da sub-tela a ser mostrada.
 */
function setActiveSubScreen(subId) {
  subScreens.forEach(sub => {
    sub.classList.toggle("active", sub.id === `sub-${subId}`);
  });

  subTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.subscreen === subId);
  });
}

/**
 * Gerencia a seleção de botões segmentados (ex: "Todos", "Meus").
 * @param {HTMLElement} target - O botão segmentado que foi clicado.
 */
function setActiveSegment(target) {
  segmentedButtons.forEach(button => {
    button.classList.toggle("active", button === target);
    button.setAttribute("aria-pressed", button === target ? "true" : "false");
  });

  const keyToShow = target?.dataset.segmentKey || segmentedPanels[0]?.dataset.segmentPanel;
  segmentedPanels.forEach(panel => {
    const isMatch = panel.dataset.segmentPanel === keyToShow;
    panel.classList.toggle("hidden", !isMatch);
    panel.setAttribute("aria-hidden", isMatch ? "false" : "true");
  });
}

/**
 * Gerencia os filtros na tela de notificações.
 * @param {HTMLElement} target - O botão de filtro que foi clicado.
 */
function setActiveFilter(target) {
  notificationFilters.forEach(button => {
    button.classList.toggle("active", button === target);
    button.setAttribute("aria-pressed", button === target ? "true" : "false");
  });

  const keyToShow = target?.dataset.filterKey || notificationPanels[0]?.dataset.filterPanel;
  notificationPanels.forEach(panel => {
    const isMatch = panel.dataset.filterPanel === keyToShow;
    panel.classList.toggle("hidden", !isMatch);
    panel.setAttribute("aria-hidden", isMatch ? "false" : "true");
  });
}

/**
 * Abre um modal (sheet) pelo nome.
 * @param {string} name - O nome do sheet (ex: "create-menu").
 */
function openSheet(name) {
  const sheet = document.getElementById(`sheet-${name}`);
  if (!sheet) {
    return;
  }
  sheets.forEach(item => item.classList.remove("open"));
  sheet.classList.add("open");
  if (sheetBackdrop) {
    sheetBackdrop.hidden = false;
  }
}

/**
 * Fecha todos os modais (sheets) abertos.
 */
function closeSheets() {
  sheets.forEach(item => item.classList.remove("open"));
  if (sheetBackdrop) {
    sheetBackdrop.hidden = true;
  }
}

/**
 * Reseta o estado do input de upload de arquivo.
 */
function resetQuickUpload() {
  pendingUpload = null;
  isReadingUpload = false;
  if (quickUploadInput) {
    quickUploadInput.value = "";
  }
  if (quickUploadLabel) {
    const fallback = quickUploadLabel.dataset.default || "Nenhum arquivo selecionado";
    quickUploadLabel.textContent = fallback;
  }
}

/**
 * Carrega os uploads simulados do localStorage.
 * @returns {object} - Objeto com os uploads por repositório.
 */
function loadUploads() {
  try {
    const raw = localStorage.getItem(UPLOAD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Falha ao carregar uploads", error);
    return {};
  }
}

/**
 * Salva os uploads simulados no localStorage.
 * @param {object} data - Objeto de uploads para salvar.
 */
function saveUploads(data) {
  try {
    localStorage.setItem(UPLOAD_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Falha ao salvar uploads", error);
  }
}

/**
 * Obtém a chave única do repositório (owner/name).
 * @param {object} repo - O objeto do repositório atual.
 * @returns {string|null} - A chave do repositório.
 */
function getRepoKey(repo = currentRepo) {
  if (!repo || !repo.owner || !repo.name) {
    return null;
  }
  return `${repo.owner}/${repo.name}`;
}

// --- Funções de formatação (Helpers) ---
function formatRelativeTime(timestamp) {
  if (!timestamp) return "agora mesmo";
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  if (diff < minute) return "agora mesmo";
  if (diff < hour) {
    const minutes = Math.round(diff / minute);
    return `há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }
  if (diff < day) {
    const hours = Math.round(diff / hour);
    return `há ${hours} ${hours === 1 ? "hora" : "horas"}`;
  }
  if (diff < week) {
    const days = Math.round(diff / day);
    return `há ${days} ${days === 1 ? "dia" : "dias"}`;
  }
  const weeks = Math.round(diff / week);
  if (weeks < 5) return `há ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  const months = Math.round(diff / (30 * day));
  if (months < 12) return `há ${months} ${months === 1 ? "mês" : "meses"}`;
  const years = Math.round(diff / (365 * day));
  return `há ${years} ${years === 1 ? "ano" : "anos"}`;
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes)) return "-";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
// --- Fim das Funções de formatação ---

/**
 * Renderiza a lista de arquivos "enviados" (do localStorage) na UI.
 */
function renderUploads() {
  if (!uploadList) {
    return;
  }
  const uploads = loadUploads();
  const repoKey = getRepoKey();
  uploadList.innerHTML = ""; // Limpa a lista

  if (!repoKey || !uploads[repoKey] || uploads[repoKey].length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "upload-empty";
    emptyItem.textContent = "Nenhum arquivo enviado ainda.";
    uploadList.append(emptyItem);
    return;
  }

  // Adiciona cada arquivo da simulação
  uploads[repoKey].forEach(entry => {
    const li = document.createElement("li");
    const info = document.createElement("div");
    const nameEl = document.createElement("strong");
    nameEl.textContent = entry.name;
    const metaEl = document.createElement("span");
    const parts = [formatRelativeTime(entry.uploadedAt), formatFileSize(entry.size)];
    if (entry.message) {
      parts.push(entry.message);
    }
    metaEl.textContent = parts.join(" · ");
    info.append(nameEl, metaEl);

    // Simula um link de download (Data URL)
    const downloadLink = document.createElement("a");
    downloadLink.className = "secondary";
    downloadLink.textContent = "Baixar";
    downloadLink.href = entry.content;
    downloadLink.download = entry.name;

    li.append(info, downloadLink);
    uploadList.append(li);
  });
}

/**
 * Processa o arquivo pendente (lido do input) e salva no localStorage.
 * @param {HTMLFormElement} form - O formulário de envio.
 * @returns {boolean} - Sucesso ou falha.
 */
function processPendingUpload(form) {
  if (isReadingUpload) {
    // Usando console.warn em vez de alert para não travar o teste
    console.warn("Aguarde o carregamento do arquivo.");
    return false;
  }
  if (!pendingUpload) {
    console.warn("Selecione um arquivo antes de enviar.");
    return false;
  }
  const uploads = loadUploads();
  const repoKey = getRepoKey();
  if (!repoKey) {
    console.warn("Selecione um repositório válido.");
    return false;
  }

  const messageInput = form?.querySelector("input[type='text']");
  const message = messageInput?.value?.trim() || "Upload via app";
  const entry = {
    ...pendingUpload,
    uploadedAt: Date.now(),
    message
  };

  const repoUploads = uploads[repoKey] || [];
  repoUploads.unshift(entry); // Adiciona no início
  uploads[repoKey] = repoUploads.slice(0, UPLOAD_LIMIT); // Limita o histórico

  saveUploads(uploads);
  if (messageInput) {
    messageInput.value = "";
  }

  renderUploads();
  resetQuickUpload();
  return true;
}

/**
 * Gera iniciais a partir do nome do "owner".
 * @param {string} owner - Nome do owner.
 * @returns {string} - Iniciais (ex: "NG").
 */
function initialsFromOwner(owner) {
  if (!owner) return "--";
  const parts = owner.split(/[\W_]+/).filter(Boolean);
  if (parts.length === 0) return owner.slice(0, 2).toUpperCase();
  const chars = parts.map(part => part.charAt(0)).join("");
  return chars.slice(0, 2).toUpperCase();
}

/**
 * Atualiza a tela de detalhes do repositório com novos dados.
 * @param {object} data - Dados do repositório.
 */
function updateRepoDetails(data) {
  currentRepo = { ...currentRepo, ...data };

  if (repoDetailSection) repoDetailSection.dataset.title = data.name;
  if (detailOwner) detailOwner.textContent = data.owner;
  if (detailName) detailName.textContent = data.name;
  if (detailAvatar) detailAvatar.textContent = initialsFromOwner(data.owner);
  if (detailSummaryTitle) detailSummaryTitle.textContent = `Atividade recente em ${data.name}`;
  if (detailDescription && data.description) detailDescription.textContent = data.description;

  if (detailStatStars) {
    const starsValue = data.stars !== undefined ? data.stars : currentRepo.stars;
    detailStatStars.textContent = `⭐ ${starsValue} favoritos`;
  }
  if (detailStatUpdated) {
    const updatedValue = data.updated || currentRepo.updated;
    detailStatUpdated.textContent = `Atualizado ${updatedValue}`;
  }

  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = data.name;
  }
  if (breadcrumbCommentRoot) {
    breadcrumbCommentRoot.textContent = data.name;
  }
  if (breadcrumbUploadRoot) {
    breadcrumbUploadRoot.textContent = data.name;
  }

  // Atualiza telas dependentes (Envio de Arquivo, Sucesso)
  if (submitFileHeading) submitFileHeading.textContent = `Enviar arquivo — ${data.name}`;
  if (submitFileButton) submitFileButton.textContent = `Submeter para ${data.name}`;
  if (successButton) {
    successButton.dataset.repoOwner = data.owner;
    successButton.dataset.repoName = data.name;
  }

  renderUploads(); // Recarrega os uploads para este repositório
}

/**
 * Manipula o clique em um card de repositório.
 * @param {HTMLElement} card - O elemento <li> do card clicado.
 */
function handleRepoCard(card, options = {}) {
  const data = {
    owner: card.dataset.repoOwner,
    name: card.dataset.repoName,
    description: card.dataset.repoDescription,
    stars: card.dataset.repoStars,
    updated: card.dataset.repoUpdated
  };
  updateRepoDetails(data);
  showScreen("repo-details", {
    title: data.name,
    navKey: "repos",
    skipHistory: options.skipHistory === true
  });
  setActiveSubScreen(options.subscreen || "overview");
  if (options.toast) {
    showToast(options.toast);
  }
}

/**
 * Manipula o fluxo de criação de repositório (simulado).
 * @param {HTMLElement} trigger - O botão que disparou a criação.
 */
function handleCreateFlow(trigger) {
  const form = trigger.closest("form");
  if (!form) return;

  const owner = form.querySelector("select")?.value?.trim() || "newgit";
  const nameValue = form.querySelector("input[type='text']")?.value?.trim();
  const repoName = nameValue && nameValue.length ? nameValue : "novo-repositorio";

  const repoData = {
    owner,
    name: repoName,
    description: "Repositório criado pelo app",
    stars: "0",
    updated: "agora mesmo"
  };

  // Prepara a tela de sucesso com os dados
  if (successRepoName) successRepoName.textContent = `${owner}/${repoName}`;
  if (successButton) {
    Object.keys(repoData).forEach(key => {
      successButton.dataset[`repo${key.charAt(0).toUpperCase() + key.slice(1)}`] = repoData[key];
    });
  }

  renderRepoCard(repoData); // Adiciona o novo repo na lista
  showScreen("repo-created", { title: "Sucesso", navKey: "repos" });
}

/**
 * Manipula o clique para comentar em um PR.
 * @param {HTMLElement} target - O elemento que disparou a ação.
 */
function handlePullRequestTrigger(target) {
  const prTitle = target.dataset.prTitle || target.closest("[data-pr-title]")?.dataset.prTitle || currentPullRequest;
  currentPullRequest = prTitle;
  if (submitCommentHeading) {
    submitCommentHeading.textContent = `Comentário em ${prTitle}`;
  }
  if (breadcrumbPr) {
    breadcrumbPr.textContent = prTitle;
  }
  if (breadcrumbCommentRoot) {
    breadcrumbCommentRoot.textContent = currentRepo.name;
  }
  showScreen("submit-comment", { title: "Comentar PR", navKey: "repos" });
}

/**
 * Manipulador principal para gatilhos de navegação de tela.
 * @param {HTMLElement} trigger - O elemento (botão, li, etc.) com `data-screen`.
 */
function handleScreenTrigger(trigger) {
  const screenKey = trigger.dataset.screen;
  if (!screenKey) return;

  const returnSubscreen = trigger.dataset.returnSubscreen;
  const toastMessage = trigger.dataset.toast;
  const skipHistory = trigger.dataset.skipHistory === "true";
  let historyPopped = false;

  const popHistoryIfNeeded = () => {
    if (skipHistory && !historyPopped && navigationStack.length) {
      navigationStack.pop();
      historyPopped = true;
    }
  };

  // Lógica específica para o fluxo de SUBMISSÃO DE ARQUIVO
  if (trigger.closest("#screen-submit-file") && screenKey === "repo-details") {
    // Tenta processar o upload ANTES de navegar
    const form = trigger.closest("form");
    const success = processPendingUpload(form);
    if (!success) {
      showToast("Selecione um arquivo antes de enviar");
      return;
    }
    popHistoryIfNeeded();
  }

  // Fecha o sheet se a navegação partiu de dentro de um
  if (trigger.closest(".sheet")) {
    closeSheets();
  }

  // Se o gatilho for um card de repositório (que tem data-repo-name)
  if (screenKey === "repo-details" && trigger.dataset.repoName) {
    popHistoryIfNeeded();
    handleRepoCard(trigger, {
      subscreen: returnSubscreen,
      toast: toastMessage,
      skipHistory
    });
    return;
  }

  // Se for o botão "Criar repositório" (que leva a repo-created)
  if (screenKey === "repo-created") {
    handleCreateFlow(trigger);
    return;
  }

  // Se for um botão de "Comentar PR"
  if (screenKey === "submit-comment") {
    handlePullRequestTrigger(trigger);
    return;
  }

  // Se for o botão "Ir para repositório" (da tela de sucesso)
  if (screenKey === "repo-details" && trigger.dataset.repoOwner) {
    const data = {
      owner: trigger.dataset.repoOwner,
      name: trigger.dataset.repoName,
      description: trigger.dataset.repoDescription || currentRepo.description,
      stars: trigger.dataset.repoStars || currentRepo.stars,
      updated: trigger.dataset.repoUpdated || currentRepo.updated
    };
    updateRepoDetails(data);
    popHistoryIfNeeded();
    showScreen("repo-details", { title: data.name, navKey: "repos", skipHistory });
    setActiveSubScreen(returnSubscreen || "overview"); // Define aba
    if (toastMessage) {
      showToast(toastMessage);
    }
    return;
  }

  // Navegação padrão
  const options = {
    title: trigger.dataset.title,
    navKey: trigger.dataset.navKey,
    skipHistory
  };
  popHistoryIfNeeded();
  showScreen(screenKey, options);

  if (screenKey === "repo-details" && returnSubscreen) {
    setActiveSubScreen(returnSubscreen);
  }

  if (toastMessage) {
    showToast(toastMessage);
  }
}

/**
 * Renderiza um novo card de repositório na lista (ou atualiza um existente).
 * @param {object} data - Dados do repositório a ser renderizado.
 */
function renderRepoCard(data) {
  if (!repoList || !data.owner || !data.name) {
    return;
  }

  const selector = `[data-repo-owner="${data.owner}"][data-repo-name="${data.name}"]`;
  const existing = repoList.querySelector(selector);

  // Atualiza se já existir
  if (existing) {
    existing.dataset.repoDescription = data.description;
    existing.dataset.repoStars = data.stars;
    existing.dataset.repoUpdated = data.updated;
    const title = existing.querySelector(".repo-title h2");
    const description = existing.querySelector("p");
    const metaItems = existing.querySelectorAll(".meta-item");
    if (title) title.textContent = `${data.owner}/${data.name}`;
    if (description) description.textContent = data.description;
    if (metaItems[0]) metaItems[0].textContent = `Atualizado ${data.updated}`;
    if (metaItems[1]) metaItems[1].textContent = `★ ${data.stars}`;
    repoList.prepend(existing); // Move para o topo
    return;
  }

  // Cria novo se não existir
  const li = document.createElement("li");
  li.className = "repo-card";
  li.dataset.screen = "repo-details";
  li.dataset.repoOwner = data.owner;
  li.dataset.repoName = data.name;
  li.dataset.repoDescription = data.description;
  li.dataset.repoStars = data.stars;
  li.dataset.repoUpdated = data.updated;
  li.innerHTML = `
        <div class="repo-title">
          <h2>${data.owner}/${data.name}</h2>
          <span class="badge">Novo</span>
        </div>
        <p>${data.description}</p>
        <div class="repo-meta">
          <span class="meta-item">Atualizado ${data.updated}</span>
          <span class="meta-item">★ ${data.stars}</span>
        </div>
      `;
  repoList.prepend(li);
}

/**
 * Manipulador de clique global para o documento.
 */
function handleClick(event) {
  const target = event.target;

  // Fecha modais
  const sheetClose = target.closest("[data-sheet-close]");
  if (sheetClose) {
    event.preventDefault();
    closeSheets();
    return;
  }

  // Abre modais
  const sheetTrigger = target.closest("[data-sheet-target]");
  if (sheetTrigger) {
    event.preventDefault();
    openSheet(sheetTrigger.dataset.sheetTarget);
    return;
  }

  // Filtros segmentados (Repos)
  const segmentedTrigger = target.closest(".segmented");
  if (segmentedTrigger) {
    event.preventDefault();
    setActiveSegment(segmentedTrigger);
    return;
  }

  // Filtros (Notificações)
  const filterTrigger = target.closest(".filter");
  if (filterTrigger) {
    event.preventDefault();
    setActiveFilter(filterTrigger);
    return;
  }

  // Botão "Escolher arquivo"
  const fileTrigger = target.closest("[data-action='choose-file']");
  if (fileTrigger) {
    event.preventDefault();
    const targetId = fileTrigger.dataset.target;
    const input = targetId ? document.getElementById(targetId) : quickUploadInput;
    input?.click(); // Abre o seletor de arquivos
    return;
  }

  // Navegação da barra inferior
  const bottomTrigger = target.closest(".bottom-item");
  if (bottomTrigger) {
    event.preventDefault();
    const screenKey = bottomTrigger.dataset.screen;
    const title = bottomTrigger.dataset.title;
    showScreen(screenKey, { title });
    closeSheets(); // Fecha modais ao navegar
    return;
  }

  // Gatilho genérico de navegação de tela
  const screenTrigger = target.closest("[data-screen]");
  if (screenTrigger) {
    event.preventDefault();
    handleScreenTrigger(screenTrigger);
    return;
  }
}

/**
 * Manipulador de clique para as sub-abas (Visão Geral, PRs, Arquivos).
 */
function handleSubTabClick(event) {
  const button = event.target.closest(".sub-tab");
  if (!button) {
    return;
  }
  setActiveSubScreen(button.dataset.subscreen);
}

/**
 * Manipulador de mudança no input de arquivo (para simulação de upload).
 */
function handleFileChange(event) {
  if (!quickUploadLabel) return;
  const file = event.target.files?.[0];

  if (file) {
    isReadingUpload = true; // Trava a submissão
    quickUploadLabel.textContent = `Carregando ${file.name}...`;

    // Simula a leitura do arquivo como Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      pendingUpload = {
        name: file.name,
        size: file.size,
        type: file.type,
        content: e.target.result // Salva o conteúdo como Base64
      };
      quickUploadLabel.textContent = file.name; // Pronto para enviar
      isReadingUpload = false; // Libera a submissão
    };
    reader.onerror = () => {
      console.error("Falha ao ler o arquivo.");
      quickUploadLabel.textContent = "Erro ao ler arquivo.";
      isReadingUpload = false;
    };
    reader.readAsDataURL(file); // Inicia a leitura

  } else {
    const fallback = quickUploadLabel.dataset.default || "Nenhum arquivo selecionado";
    quickUploadLabel.textContent = fallback;
    pendingUpload = null;
  }
}

// --- Inicialização e Event Listeners ---

// Manipulador de clique principal
document.addEventListener("click", handleClick);

if (backButton) {
  backButton.addEventListener("click", handleBackNavigation);
}

// Manipulador das sub-abas
if (repoDetailSection) {
  const subTabContainer = repoDetailSection.querySelector(".sub-tabs");
  if (subTabContainer) {
    subTabContainer.addEventListener("click", handleSubTabClick);
  }
}

// Fechar modal ao clicar no backdrop
if (sheetBackdrop) {
  sheetBackdrop.addEventListener("click", closeSheets);
}

// Fechar modal com a tecla 'Escape'
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeSheets();
  }
});

// Listener para o input de arquivo
if (quickUploadInput) {
  quickUploadInput.addEventListener("change", handleFileChange);
}

// --- Estado Inicial do App ---

// Define o segmento "Todos" como ativo
if (segmentedButtons[0]) {
  setActiveSegment(segmentedButtons[0]);
}

// Define o filtro "Inbox" como ativo
if (notificationFilters[0]) {
  setActiveFilter(notificationFilters[0]);
}

// Exibe a tela inicial ("Repositórios")
showScreen("repos", { title: "Repositórios", navKey: "repos", skipHistory: true });
// Ativa a sub-aba inicial ("Visão geral")
setActiveSubScreen("overview");
// Carrega os dados do repositório padrão
updateRepoDetails(currentRepo);
>>>>>>> 70953690ccc0f6b8c282449993ee57f77daf9269
