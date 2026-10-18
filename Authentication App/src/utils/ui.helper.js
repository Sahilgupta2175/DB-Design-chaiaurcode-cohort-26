const message = document.getElementById("message");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const tabLoginBtn = document.getElementById("tab-login");
const tabRegisterBtn = document.getElementById("tab-register");

const authSection = document.getElementById("auth-section");
const sessionLoading = document.getElementById("session-loading");

const profileSection = document.getElementById("profile-section");
const profileAvatar = document.getElementById("profile-avatar");
const profileUsername = document.getElementById("profile-username");
const profileRole = document.getElementById("profile-role");
const profileEmail = document.getElementById("profile-email");
const profileId = document.getElementById("profile-id");
const profileVerified = document.getElementById("profile-verified");
const profileCreatedAt = document.getElementById("profile-created");

let messageTimer;

export const showMessage = (text, type) => {
  clearTimeout(messageTimer);

  message.textContent = text;
  message.classList.remove(
    "hidden",
    "bg-green-50",
    "text-green-700",
    "border-green-200",
    "bg-red-50",
    "text-red-700",
    "border-red-200",
  );

  if (type === "success") {
    message.classList.add("bg-green-50", "text-green-700", "border-green-200");
  } else if (type === "error") {
    message.classList.add("bg-red-50", "text-red-700", "border-red-200");
  }

  messageTimer = setTimeout(() => {
    message.classList.add("hidden");
  }, 3000);
};

export const hideMessage = () => {
  message.classList.add("hidden");
  clearTimeout(messageTimer);
};

export const setLoading = (btn, isLoading, loadingText) => {
  const btnSpinner = btn.querySelector(".btn-spinner");
  const btnLabel = btn.querySelector(".btn-label");

  if (!btn.dataset.originalText) {
    btn.dataset.originalText = btnLabel.textContent.trim();
  }

  btn.disabled = isLoading;
  btnSpinner.classList.toggle("hidden", !isLoading);
  btnLabel.textContent = isLoading ? loadingText : btn.dataset.originalText;
};

export const showTab = (tab) => {
  if (tab === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    tabLoginBtn.classList.add("bg-white", "shadow-sm");
    tabLoginBtn.classList.remove("text-slate-500");

    tabRegisterBtn.classList.remove("bg-white", "shadow-sm");
    tabRegisterBtn.classList.add("text-slate-500");
  } else if (tab === "register") {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    tabRegisterBtn.classList.add("bg-white", "shadow-sm");
    tabRegisterBtn.classList.remove("text-slate-500");

    tabLoginBtn.classList.remove("bg-white", "shadow-sm");
    tabLoginBtn.classList.add("text-slate-500");
  } else {
    console.error("Invalid tab specified. Use 'login' or 'register'.");

    return;
  }

  hideMessage();
};

export const renderUI = (user) => {
  if (user) {
    authSection.classList.add("hidden");
    profileSection.classList.remove("hidden");

    fillProfile(user);
  } else {
    authSection.classList.remove("hidden");
    profileSection.classList.add("hidden");
  }

  sessionLoading.classList.remove("flex");
  sessionLoading.classList.add("hidden");
};

export const fillProfile = (user) => {
  profileUsername.textContent = user.username;
  profileRole.textContent = user.role;
  profileEmail.textContent = user.email;
  profileId.textContent = user._id ?? user.id ?? "N/A";

  profileAvatar.onerror = () => {
    profileAvatar.onerror = null;
    profileAvatar.removeAttribute("src");
    profileAvatar.alt = "Profile Avatar Unavailable";
  };

  if (user.avatar?.url) {
    profileAvatar.src = user.avatar.url;
  } else {
    profileAvatar.removeAttribute("src");
  }

  const verified = user.isEmailVerified;

  profileVerified.textContent =
    typeof verified === "boolean" ? (verified ? "Yes" : "No") : "N/A";

  profileCreatedAt.textContent = user.createdAt
    ? new Date(user.createdAt).toLocaleString()
    : "N/A";
};
