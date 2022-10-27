// ==============back btn ============================
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/coachHomepage/coachHomepage.html";
});
// ================logout user ===================

const logoutBtn = document.querySelectorAll("#user-logout-nav-btn");

logoutBtn.forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.clear();
      window.location = "http://192.168.1.195:3000/";
    } catch (error) {
      console.log(error);
    }
  });
});
