import { apiRequest } from "../utils/api.helper.js";
import { renderUI } from "../utils/ui.helper.js";

export const loadCurrentUser = async () => {
  try {
    const response = await apiRequest("/current-user", { method: "GET" });
    const user = response.data;

    renderUI(user);

    return user;
  } catch (error) {
    renderUI(null);

    return null;
  }
};
