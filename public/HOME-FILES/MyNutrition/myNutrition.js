const btnContainer = document.querySelector(".btn-container");

// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

const getDiet = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get("/api/v1/diet");
    console.log(data);
    //  =========if length is === 0 means no workouts we want to display the create item =============
    const length = data.diets.length;

    if (length === 0) {
      btnContainer.classList.add("open-container");
    }
  } catch (error) {
    console.log(error);
  }
};
getDiet();

const goToCreateDietBtns = document.querySelectorAll(".create-nutrition-btn");

goToCreateDietBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location = "http://192.168.1.195:3000/createDiet/createDiet.html";
  });
});

// ==============back btn ============================
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/coachHomepage/coachHomepage.html";
});
// ================logout user ===================

const logoutBtn = document.getElementById("user-logout-nav-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await axios.post("/api/v1/auth/logout");
    localStorage.removeItem("ref");
    window.location = "http://192.168.1.195:3000/";
  } catch (error) {
    console.log(error);
  }
});
