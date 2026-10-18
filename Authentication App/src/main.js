import { showTab } from "./utils/ui.helper.js";
import { loadCurrentUser } from "./controller/user.controller.js";
import "./controller/login.controller.js";
import "./controller/register.controller.js";
import "./controller/logout.controller.js";

const sessionLoading = document.getElementById("session-loading");
const authSection = document.getElementById("auth-section");
const tabLoginBtn = document.getElementById("tab-login");
const tabRegisterBtn = document.getElementById("tab-register");

tabLoginBtn.addEventListener("click", () => showTab("login"));
tabRegisterBtn.addEventListener("click", () => showTab("register"));

showTab("login");

const initializeApp = async () => {
  sessionLoading.classList.remove("hidden");
  sessionLoading.classList.add("flex");
  authSection.classList.add("hidden");

  await loadCurrentUser();
};

initializeApp();
