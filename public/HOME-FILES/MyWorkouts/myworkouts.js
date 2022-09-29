// ===============select btn container ======================
// =====================select grid container ===========
// ==============select verification container and input container =========================
const btnContainer = document.querySelector(".btn-container");
const programGridContainer = document.querySelector(
  ".workouts-programs-grid-container"
);
const deleteVerificationContainer = document.querySelector(
  ".delete-verification-section"
);
const searchWorkoutInput = document.getElementById("search-workout-input");

// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

const getWorkouts = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get("/api/v1/workout");
    //  =========if length is === 0 means no workouts we want to display the create item =============
    const length = data.workouts.length;

    if (length === 0) {
      btnContainer.classList.add("open-container");
    }
    let workoutPrograms = data.workouts;

    displayProgram(workoutPrograms);
    // =============delete client ====================
    const deleteWorkout = document.querySelectorAll("#delete-workout");

    deleteWorkout.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        let workoutId = e.target.dataset.delete;
        let workoutName =
          e.target.parentElement.previousElementSibling.textContent;

        deleteVerificationContainer.classList.add("open-container");
        deleteVerificationContainer.innerHTML = ` 
        <div class="delete-verification-box">
        <h3>Are you sure you want to delete <span>${workoutName}</span> ?</h3>
        <div class="yes-no-container">
          <button class="yes-btn" data-delete =${workoutId}>yes</button>
          <button class="no-btn"> no </button>
        </div>
        </div>`;

        const noBtn = document.querySelector(".no-btn");
        noBtn.addEventListener("click", () => {
          deleteVerificationContainer.classList.remove("open-container");
        });
        const yesBtn = document.querySelector(".yes-btn");
        yesBtn.addEventListener("click", async (e) => {
          let id = e.target.dataset.delete;

          await axios.delete(`/api/v1/workout/${id}`);
          deleteVerificationContainer.classList.remove("open-container");

          getWorkouts();
        });
      });
    });
    // ===========================live search =======================
    const programContainers = document.querySelectorAll(".program");
    const liveSearch = () => {
      let inputCharacter = searchWorkoutInput.value.toUpperCase();

      programContainers.forEach((program) => {
        // ============show all item when input is empty again
        if (searchWorkoutInput === "") {
          program.classList.remove("display-none");
        }
        // ==========search by charachter, display the ones that match,remove the ones that doesnt match================
        if (program.textContent.toUpperCase().includes(inputCharacter)) {
          program.classList.remove("display-none");
        } else if (
          !program.textContent.toUpperCase().includes(inputCharacter)
        ) {
          program.classList.add("display-none");
        }
      });
    };
    searchWorkoutInput.addEventListener("input", () => {
      liveSearch();
    });
  } catch (error) {
    console.log(error);
  }
};
getWorkouts();

// ===============display Programs  function =================

const displayProgram = (programPlan) => {
  // =========displayin the program name and the tools and the arrow ,on click we show the program workouts then on other click an overview for the exercises

  programGridContainer.innerHTML = "";
  for (let i = 0; i < programPlan.length; i++) {
    programGridContainer.innerHTML += `<div class="program-container">
 
  <div class="program">
    <img
      src="../images/Arrow up.svg"
      id="show-program"
      alt=""
      data-overview= ${i}
    />
    <p>${programPlan[i].name}</p>
    
    <div class="tools">
      <i class="fa-regular fa-pen-to-square" data-manage=${programPlan[i]._id}></i>
      <i class=" fa-solid fa-trash" id="delete-workout" data-delete=${programPlan[i]._id}></i>
    </div>
  </div>
  
  <div class="overview-container">
  <div class="date-stats">
  <p class="created-at">created at: 22/10/2022</p>
  <p class="updated-at">updated at: 22/11/2022</p>
</div>
</div>
</div>`;
  }
  // ===============toggle the program to get all the workouts =============
  const programContainer = document.querySelectorAll(".program-container");

  programContainer.forEach(function (program) {
    const programArrow = program.querySelector("#show-program");
    const overviewContainer = program.querySelector(".overview-container");

    programArrow.addEventListener("click", function (e) {
      let index = e.target.dataset.overview;

      programContainer.forEach(function (item) {
        // =====opening container and displaying the workouts on click
        if (item === program) {
          overviewContainer.innerHTML = `<div class="date-stats">
          <p class="created-at">created at: ${programPlan[
            index
          ].createdAt.slice(0, 10)}</p>
          <p class="updated-at">updated at: ${programPlan[
            index
          ].updatedAt.slice(0, 10)}</p>
        </div>`;
          ``;
          item.classList.toggle("open-container");

          let workout = programPlan[index].workouts;
          for (let i = 0; i < workout.length; i++) {
            overviewContainer.innerHTML += `<div class="workout-container">
            <div class="workout">
              <img src="../images/Arrow up.svg" id="show-exercise" alt="" data-exercise = '${i}'  />
              <p class="workout-name">${workout[i].name}</p>
             <span></span>
            </div>
            
            <div class="exercise-container">
              </div>
          </div>`;
          }

          // ========displaying th exercise on click ========
          const workoutContainer =
            document.querySelectorAll(".workout-container");

          // =====workouts for each

          workoutContainer.forEach((workout) => {
            const showExerciseBtn = workout.querySelector("#show-exercise");
            const exerciseContainer = workout.querySelector(
              ".exercise-container"
            );

            showExerciseBtn.addEventListener("click", function (e) {
              let workoutIndex = e.target.dataset.exercise;
              console.log(workoutIndex);
              workoutContainer.forEach((subWorkout) => {
                if (subWorkout === workout) {
                  subWorkout.classList.toggle("show-info");
                  exerciseContainer.innerHTML = "";
                  let exercise =
                    programPlan[index].workouts[workoutIndex].exercises;

                  for (let i = 0; i < exercise.length; i++) {
                    exerciseContainer.innerHTML += `<div class="exercise">
  <p class="exercise-name"><span></span> ${exercise[i].name}</p>
  <div class="exercise-info">
    <div class="exercise-stats">
      <p class="sets stat-dot"><span></span> set: ${exercise[i].sets}</p>
      <p class="reps stat-dot"><span></span> reps: ${exercise[i].reps}</p>
    </div>
    <div class="exercise-stats">
      <p class="tempo stat-dot"><span></span> tempo: ${exercise[i].tempo}</p>
      <p class="rest-time stat-dot"><span></span> rest: ${exercise[i].rest}</p>
    </div>
  </div>
</div>`;
                  }
                } else {
                  subWorkout.classList.remove("show-info");
                }
              });
            });
          });
        } else {
          item.classList.remove("open-container");
        }
      });
    });
  });
};

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
