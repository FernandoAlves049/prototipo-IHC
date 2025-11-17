const device = document.querySelector(".device");
const topbar = document.querySelector(".topbar");
const topbarTitle = document.querySelector(".topbar-title");
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
const authScreen = document.getElementById("auth-screen");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authMessage = document.getElementById("auth-message");
const authToggleButtons = Array.from(document.querySelectorAll("[data-auth-toggle]"));
const quickUploadInput = document.querySelector("#quick-upload");
const quickUploadLabel = document.querySelector("#screen-submit-file .filename");
const uploadList = document.querySelector("#sub-files [data-upload-list]");
const USER_STORAGE_KEY = "gh-mobile-user";
const SESSION_STORAGE_KEY = "gh-mobile-session";
const UPLOAD_STORAGE_KEY = "gh-mobile-uploads";
const UPLOAD_LIMIT = 20;
let pendingUpload = null;
let isReadingUpload = false;

const repoDetailSection = document.querySelector("#screen-repo-details");
const detailOwner = repoDetailSection?.querySelector(".repo-heading .owner");
const detailName = repoDetailSection?.querySelector(".repo-heading h1");
const detailAvatar = repoDetailSection?.querySelector(".owner-avatar");
const detailSummaryTitle = repoDetailSection?.querySelector(".summary-card h3");
const detailDescription = repoDetailSection?.querySelector(".repo-description");
const detailStatStars = repoDetailSection?.querySelector("[data-stat='stars']");
const detailStatUpdated = repoDetailSection?.querySelector("[data-stat='updated']");
const repoList = document.querySelector(".repo-list");

const submitCommentHeading = document.querySelector("#screen-submit-comment h2");
const submitFileHeading = document.querySelector("#screen-submit-file h2");
const submitFileButton = document.querySelector("#screen-submit-file .primary");
const successScreen = document.querySelector("#screen-repo-created");
const successRepoName = successScreen?.querySelector("strong");
const successButton = successScreen?.querySelector(".primary");

let currentScreen = "repos";
let currentRepo = {
  owner: "newgit",
  name: "mobile-app",
  description: "App mobile para revisão rápida de pull requests.",
  stars: "128",
  updated: "há 2 dias"
};
let currentPullRequest = "hotfix/login";

function showScreen(screenKey, options = {}) {
  const targetId = `screen-${screenKey}`;
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  screens.forEach(section => {
    section.classList.toggle("active", section === target);
  });

  const navKey = options.navKey ?? screenKey;
  bottomItems.forEach(item => {
    item.classList.toggle("active", item.dataset.screen === navKey);
  });

  const title = options.title || target.dataset.title || topbar.dataset.defaultTitle || "GitHub";
  if (topbarTitle) {
    topbarTitle.textContent = title;
  }

  currentScreen = screenKey;
}

function setActiveSubScreen(subId) {
  subScreens.forEach(sub => {
    sub.classList.toggle("active", sub.id === `sub-${subId}`);
  });

  subTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.subscreen === subId);
  });
}

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

function closeSheets() {
  sheets.forEach(item => item.classList.remove("open"));
  if (sheetBackdrop) {
    sheetBackdrop.hidden = true;
  }
}

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

function loadUploads() {
  try {
    const raw = localStorage.getItem(UPLOAD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Falha ao carregar uploads", error);
    return {};
  }
}

function saveUploads(data) {
  try {
    localStorage.setItem(UPLOAD_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Falha ao salvar uploads", error);
  }
}

function getRepoKey(repo = currentRepo) {
  if (!repo || !repo.owner || !repo.name) {
    return null;
  }
  return `${repo.owner}/${repo.name}`;
}

function formatRelativeTime(timestamp) {
  if (!timestamp) {
    return "agora mesmo";
  }
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  if (diff < minute) {
    return "agora mesmo";
  }
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
  if (weeks < 5) {
    return `há ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  }
  const months = Math.round(diff / (30 * day));
  if (months < 12) {
    return `há ${months} ${months === 1 ? "mês" : "meses"}`;
  }
  const years = Math.round(diff / (365 * day));
  return `há ${years} ${years === 1 ? "ano" : "anos"}`;
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes)) {
    return "-";
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

function renderUploads() {
  if (!uploadList) {
    return;
  }
  const uploads = loadUploads();
  const repoKey = getRepoKey();
  uploadList.innerHTML = "";
  if (!repoKey || !uploads[repoKey] || uploads[repoKey].length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "upload-empty";
    emptyItem.textContent = "Nenhum arquivo enviado ainda.";
    uploadList.append(emptyItem);
    return;
  }

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

    const downloadLink = document.createElement("a");
    downloadLink.className = "secondary";
    downloadLink.textContent = "Baixar";
    downloadLink.href = entry.content;
    downloadLink.download = entry.name;

    li.append(info, downloadLink);
    uploadList.append(li);
  });
}

function processPendingUpload(form) {
  if (isReadingUpload) {
    window.alert("Aguarde o carregamento do arquivo.");
    return false;
  }
  if (!pendingUpload) {
    window.alert("Selecione um arquivo antes de enviar.");
    return false;
  }
  const uploads = loadUploads();
  const repoKey = getRepoKey();
  if (!repoKey) {
    window.alert("Selecione um repositório válido.");
    return false;
  }
  const messageInput = form?.querySelector("input[type='text']");
  const message = messageInput?.value?.trim() || "";
  const entry = {
    ...pendingUpload,
    uploadedAt: Date.now(),
    message
  };
  const repoUploads = uploads[repoKey] || [];
  repoUploads.unshift(entry);
  uploads[repoKey] = repoUploads.slice(0, UPLOAD_LIMIT);
  saveUploads(uploads);
  if (messageInput) {
    messageInput.value = "";
  }
  renderUploads();
  resetQuickUpload();
  return true;
}

function initialsFromOwner(owner) {
  if (!owner) {
    return "--";
  }
  const parts = owner.split(/[\W_]+/).filter(Boolean);
  if (parts.length === 0) {
    return owner.slice(0, 2).toUpperCase();
  }
  const chars = parts.map(part => part.charAt(0)).join("");
  return chars.slice(0, 2).toUpperCase();
}

function updateRepoDetails(data) {
  currentRepo = { ...currentRepo, ...data };
  if (repoDetailSection) {
    repoDetailSection.dataset.title = data.name;
  }
  if (detailOwner) {
    detailOwner.textContent = data.owner;
  }
  if (detailName) {
    detailName.textContent = data.name;
  }
  if (detailAvatar) {
    detailAvatar.textContent = initialsFromOwner(data.owner);
  }
  if (detailSummaryTitle) {
    detailSummaryTitle.textContent = `Atividade recente em ${data.name}`;
  }
  if (detailDescription && data.description) {
    detailDescription.textContent = data.description;
  }
  if (detailStatStars) {
    const starsValue = data.stars !== undefined ? data.stars : currentRepo.stars;
    detailStatStars.textContent = `⭐ ${starsValue} favoritos`;
  }
  if (detailStatUpdated) {
    const updatedValue = data.updated || currentRepo.updated;
    detailStatUpdated.textContent = `Atualizado ${updatedValue}`;
  }
  if (submitFileHeading) {
    submitFileHeading.textContent = `Enviar arquivo — ${data.name}`;
  }
  if (submitFileButton) {
    submitFileButton.textContent = `Submeter para ${data.name}`;
  }
  if (successButton) {
    successButton.dataset.repoOwner = data.owner;
    successButton.dataset.repoName = data.name;
  }

  renderUploads();
}

function handleRepoCard(card) {
  const data = {
    owner: card.dataset.repoOwner,
    name: card.dataset.repoName,
    description: card.dataset.repoDescription,
    stars: card.dataset.repoStars,
    updated: card.dataset.repoUpdated
  };
  updateRepoDetails(data);
  showScreen("repo-details", { title: data.name, navKey: "repos" });
}

function handleCreateFlow(trigger) {
  const form = trigger.closest("form");
  if (!form) {
    return;
  }
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
  if (successRepoName) {
    successRepoName.textContent = `${owner}/${repoName}`;
  }
  if (successButton) {
    successButton.dataset.repoOwner = owner;
    successButton.dataset.repoName = repoName;
    successButton.dataset.repoDescription = repoData.description;
    successButton.dataset.repoStars = repoData.stars;
    successButton.dataset.repoUpdated = repoData.updated;
  }
  renderRepoCard(repoData);
  showScreen("repo-created", { title: "Sucesso", navKey: "repos" });
}

function handlePullRequestTrigger(target) {
  const prTitle = target.dataset.prTitle || target.closest("[data-pr-title]")?.dataset.prTitle || currentPullRequest;
  currentPullRequest = prTitle;
  if (submitCommentHeading) {
    submitCommentHeading.textContent = `Comentar ${prTitle}`;
  }
  showScreen("submit-comment", { title: "Comentar PR", navKey: "repos" });
}

function handleScreenTrigger(trigger) {
  const screenKey = trigger.dataset.screen;
  if (!screenKey) {
    return;
  }

  if (trigger.closest("#screen-submit-file") && screenKey === "repo-details") {
    resetQuickUpload();
  }

  if (trigger.closest(".sheet")) {
    closeSheets();
  }

  if (screenKey === "repo-details" && trigger.dataset.repoName) {
    handleRepoCard(trigger);
    return;
  }

  if (screenKey === "repo-created") {
    handleCreateFlow(trigger);
    return;
  }

  if (screenKey === "submit-comment") {
    handlePullRequestTrigger(trigger);
    return;
  }

  if (screenKey === "repo-details" && trigger.dataset.repoOwner) {
    const data = {
      owner: trigger.dataset.repoOwner,
      name: trigger.dataset.repoName,
      description: currentRepo.description,
      stars: currentRepo.stars,
      updated: currentRepo.updated
    };
    updateRepoDetails(data);
    showScreen("repo-details", { title: data.name, navKey: "repos" });
    return;
  }

  const options = {
    title: trigger.dataset.title,
    navKey: trigger.dataset.navKey
  };
  showScreen(screenKey, options);
}

function renderRepoCard(data) {
  if (!repoList || !data.owner || !data.name) {
    return;
  }

  const selector = `[data-repo-owner="${data.owner}"][data-repo-name="${data.name}"]`;
  const existing = repoList.querySelector(selector);
  if (existing) {
    existing.dataset.repoDescription = data.description;
    existing.dataset.repoStars = data.stars;
    existing.dataset.repoUpdated = data.updated;
    const title = existing.querySelector(".repo-title h2");
    const description = existing.querySelector("p");
    const metaItems = existing.querySelectorAll(".meta-item");
    if (title) {
      title.textContent = `${data.owner}/${data.name}`;
    }
    if (description) {
      description.textContent = data.description;
    }
    if (metaItems[0]) {
      metaItems[0].textContent = `Atualizado ${data.updated}`;
    }
    if (metaItems[1]) {
      metaItems[1].textContent = `★ ${data.stars}`;
    }
    repoList.prepend(existing);
    return;
  }

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

function handleClick(event) {
  const sheetClose = event.target.closest("[data-sheet-close]");
  if (sheetClose) {
    event.preventDefault();
    closeSheets();
    return;
  }

  const sheetTrigger = event.target.closest("[data-sheet-target]");
  if (sheetTrigger) {
    event.preventDefault();
    openSheet(sheetTrigger.dataset.sheetTarget);
    return;
  }

  const segmentedTrigger = event.target.closest(".segmented");
  if (segmentedTrigger) {
    event.preventDefault();
    setActiveSegment(segmentedTrigger);
    return;
  }

  const filterTrigger = event.target.closest(".filter");
  if (filterTrigger) {
    event.preventDefault();
    setActiveFilter(filterTrigger);
    return;
  }

  const fileTrigger = event.target.closest("[data-action='choose-file']");
  if (fileTrigger) {
    event.preventDefault();
    const targetId = fileTrigger.dataset.target;
    const input = targetId ? document.getElementById(targetId) : quickUploadInput;
    input?.click();
    return;
  }

  const bottomTrigger = event.target.closest(".bottom-item");
  if (bottomTrigger) {
    event.preventDefault();
    const screenKey = bottomTrigger.dataset.screen;
    const title = bottomTrigger.dataset.title;
    showScreen(screenKey, { title });
    closeSheets();
    return;
  }

  const screenTrigger = event.target.closest("[data-screen]");
  if (screenTrigger) {
    event.preventDefault();
    handleScreenTrigger(screenTrigger);
    return;
  }
}

function handleSubTabClick(event) {
  const button = event.target.closest(".sub-tab");
  if (!button) {
    return;
  }
  setActiveSubScreen(button.dataset.subscreen);
}

document.addEventListener("click", handleClick);

if (repoDetailSection) {
  const subTabContainer = repoDetailSection.querySelector(".sub-tabs");
  if (subTabContainer) {
    subTabContainer.addEventListener("click", handleSubTabClick);
  }
}

if (sheetBackdrop) {
  sheetBackdrop.addEventListener("click", closeSheets);
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeSheets();
  }
});

if (quickUploadInput) {
  quickUploadInput.addEventListener("change", () => {
    if (!quickUploadLabel) {
      return;
    }
    const file = quickUploadInput.files?.[0];
    if (file) {
      quickUploadLabel.textContent = file.name;
    } else {
      const fallback = quickUploadLabel.dataset.default || "Nenhum arquivo selecionado";
      quickUploadLabel.textContent = fallback;
    }
  });
}

if (segmentedButtons[0]) {
  setActiveSegment(segmentedButtons[0]);
}

if (notificationFilters[0]) {
  setActiveFilter(notificationFilters[0]);
}

showScreen("repos", { title: "Repositórios" });
setActiveSubScreen("overview");
updateRepoDetails(currentRepo);
