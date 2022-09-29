// ===============select btn container ======================
// =====================select grid container ===========
// ==============select verification container and input container =========================
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

// =============delete client ====================
// const deleteWorkout = document.querySelectorAll("#delete-workout");

// deleteWorkout.forEach((deleteBtn) => {
//   deleteBtn.addEventListener("click", (e) => {
//     let workoutId = e.target.dataset.delete;
//     let workoutName = e.target.parentElement.previousElementSibling.textContent;

//     deleteVerificationContainer.classList.add("open-container");
//     deleteVerificationContainer.innerHTML = `
//     <div class="delete-verification-box">
//     <h3>Are you sure you want to delete <span>${workoutName}</span> ?</h3>
//     <div class="yes-no-container">
//       <button class="yes-btn" data-delete =${workoutId}>yes</button>
//       <button class="no-btn"> no </button>
//     </div>
//     </div>`;

//     const noBtn = document.querySelector(".no-btn");
//     noBtn.addEventListener("click", () => {
//       deleteVerificationContainer.classList.remove("open-container");
//     });
//     const yesBtn = document.querySelector(".yes-btn");
//     yesBtn.addEventListener("click", async (e) => {
//       let id = e.target.dataset.delete;

//       await axios.delete(`/api/v1/workout/${id}`);
//       deleteVerificationContainer.classList.remove("open-container");

//       getDiet();
//     });
//   });
// });

// const programGridContainer = document.querySelector(
//   ".nutrition-programs-grid-container"
// );
// const deleteVerificationContainer = document.querySelector(
//   ".delete-verification-section"
// );
// const searchWorkoutInput = document.getElementById("search-diet-input");

// ===========================live search =======================
// const programContainers = document.querySelectorAll(".program");
// const liveSearch = () => {
//   let inputCharacter = searchWorkoutInput.value.toUpperCase();

//   programContainers.forEach((program) => {
//     // ============show all item when input is empty again
//     if (searchWorkoutInput === "") {
//       program.classList.remove("display-none");
//     }
//     // ==========search by charachter, display the ones that match,remove the ones that doesnt match================
//     if (program.textContent.toUpperCase().includes(inputCharacter)) {
//       program.classList.remove("display-none");
//     } else if (!program.textContent.toUpperCase().includes(inputCharacter)
//     ) {
//       program.classList.add("display-none");
//     }
//   });
// };
// searchWorkoutInput.addEventListener("input", () => {
//   liveSearch();
// });
