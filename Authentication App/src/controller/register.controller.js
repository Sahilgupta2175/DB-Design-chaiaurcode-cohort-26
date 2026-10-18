import {
  setLoading,
  showMessage,
  showTab,
} from "../utils/ui.helper.js";
import { apiRequest } from "../utils/api.helper.js";

const registerForm = document.getElementById("register-form");
const registerUsernameInput = document.getElementById("register-username");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerRoleSelect = document.getElementById("register-role");
const registerBtn = document.getElementById("register-btn");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = registerUsernameInput.value.trim();
  const email = registerEmailInput.value.trim();
  const password = registerPasswordInput.value;
  const role = registerRoleSelect.value;

  if (!username || !email || !password || !role) {
    showMessage("Please fill in all fields", "error");

    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters long", "error");

    return;
  }

  setLoading(registerBtn, true, "Registering...");

  try {
    const response = await apiRequest("/register", {
      method: "POST",
      body: { username, email, password, role },
    });

    if (response.success) {
      registerForm.reset();

      showTab("login");
      showMessage("Registration successful! Please log in.", "success");
    } else {
      showMessage(response.message || "Registration failed", "error");
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    
    showMessage(error.message || "An error occurred during registration", "error");
  } finally {
    setLoading(registerBtn, false);
  }
});
