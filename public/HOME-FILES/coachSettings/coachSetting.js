// ==============back btn ============================
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location = "http://localhost:3000/coachHomepage/coachHomepage.html";
});
// ================logout user ===================

const logoutBtn = document.getElementById("user-logout-nav-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await axios.post("/api/v1/auth/logout");
    localStorage.removeItem("ref");
    window.location = "http://localhost:3000/";
  } catch (error) {
    console.log(error);
  }
});
