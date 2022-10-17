const btnContainer = document.querySelector(".btn-container");
const dietsGridContainer = document.querySelector(
  ".nutrition-programs-grid-container"
);
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

// ==============display all programs
const displayAllPrograms = (Diets) => {
  for (let i = 0; i < Diets.length; i++) {
    dietsGridContainer.innerHTML += `<div class="one-diet-container">
 
  <div class="diet">
  <i class="fa-solid fa-list" id="show-overview" data-overview=${i}></i>
 <p>${Diets[i].name}</p>
    <div class="tools">
      <i class="fa-regular fa-pen-to-square" id="edit-diet" data-edit=${Diets[i]._id}></i>
      <i class=" fa-solid fa-trash" id="delete-diet" data-delete=${Diets[i]._id}></i>
    </div>
  </div>
  
  <div class="overview-container">
  <div class="date-stats">
  <p class="created-at">created at: 22/10/2022</p>
  <p class="updated-at">updated at: 22/11/2022</p>

</div>

</div>
<div class="created-workouts"></div>
</div>`;
  }
};
console.log(performance.now());
