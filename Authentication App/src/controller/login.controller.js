import { apiRequest } from "../utils/api.helper.js";
import { setLoading, showMessage } from "../utils/ui.helper.js";
import { loadCurrentUser } from "./user.controller.js";

const loginForm = document.getElementById("login-form");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value;

  if (!username || !password) {
    showMessage("Please fill in all fields", "error");

    return;
  }

  setLoading(loginBtn, true, "Logging in...");

  try {
    const response = await apiRequest("/login", {
      method: "POST",
      body: { username, password },
    });

    if (response.success) {
      const user = await loadCurrentUser();

      if(!user) {
        showMessage("Failed to load user profile after login", "error");
        
        return;
      }

      loginForm.reset();
      showMessage(`Welcome, ${user.username}!`, "success");
    }
  } catch (error) {
    showMessage(error.message || "An error occurred during login", "error");
  } finally {
    setLoading(loginBtn, false, "Login");
  }
});
