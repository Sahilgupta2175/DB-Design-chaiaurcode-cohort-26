import { apiRequest } from "../utils/api.helper.js";
import { renderUI, setLoading, showMessage, showTab } from "../utils/ui.helper.js";

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    setLoading(logoutBtn, true, "Logging out...");

    const response = await apiRequest("/logout", {
      method: "POST",
    });

    if (response.success) {
      renderUI(null);
      showTab("login");
      showMessage("Logged out successfully.", "success");
    }
  } catch (error) {
    console.error("Error during logout:", error.message);
    showMessage(error.message || "An error occurred during logout", "error");
  } finally {
    setLoading(logoutBtn, false);
  }
});
