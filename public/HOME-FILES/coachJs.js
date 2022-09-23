console.log(document.cookie);

// ================logout user ===================

const logoutBtn = document.getElementById("user-logout-nav-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await axios.post("/api/v1/auth/logout");
  } catch (error) {
    console.log(error);
  }
});
// ==============get clients test ===========================
const getClientsBtn = document.getElementById("user-settings-nav-btn");

getClientsBtn.addEventListener("click", async () => {
  try {
    const { data } = await axios.get("/api/v1/client");
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
});
