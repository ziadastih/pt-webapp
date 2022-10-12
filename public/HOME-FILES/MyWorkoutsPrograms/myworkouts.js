// ==============select verification container and input container =========================
const btnContainer = document.querySelector(".btn-container");
const programGridContainer = document.querySelector(
  ".workouts-programs-grid-container"
);
const deleteVerificationContainer = document.querySelector(
  ".delete-verification-section"
);
const searchWorkoutInput = document.getElementById("search-workout-input");
const goToCreateProgram = document.getElementById("go-to-create-program");
const createNewProgramBtn = document.querySelector(".create-workout-btn");
// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

goToCreateProgram.addEventListener("click", () => {
  window.location = "http://localhost:3000/createWorkout/createWorkout.html";
});
createNewProgramBtn.addEventListener("click", () => {
  window.location = "http://localhost:3000/createWorkout/createWorkout.html";
});

// ================fetch workouts ===================
const getWorkouts = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get("/api/v1/workoutProgram");
    //  =========if length is === 0 means no workouts we want to display the create item =============
    const length = data.workoutprograms.length;

    if (length === 0) {
      btnContainer.classList.add("open-container");
    }
    let workoutPrograms = data.workoutprograms;

    displayProgramInfo(workoutPrograms);
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

          await axios.delete(`/api/v1/workoutProgram/${id}`);
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

// ===============display Programs  function with all the show and hide logic ====================

const displayProgramInfo = (programPlan) => {
  programGridContainer.innerHTML = "";
  displayAllPrograms(programPlan);

  const programContainer = document.querySelectorAll(".program-container");

  programContainer.forEach(function (program) {
    const showProgramOverview = program.querySelector("#show-program");
    const overviewContainer = program.querySelector(".overview-container");
    const createdWorkoutsContainer = program.querySelector(".created-workouts");
    showProgramOverview.addEventListener("click", function (e) {
      let index = e.target.dataset.overview;

      programContainer.forEach(function (subProgam) {
        // =====opening container and displaying the timestamps and week  on click
        if (subProgam === program) {
          const createdAt = programPlan[index].createdAt.slice(0, 10);
          const updatedAt = programPlan[index].updatedAt.slice(0, 10);

          displayTimeStamps(program, createdAt, updatedAt);

          subProgam.classList.toggle("open-container");
        }
        // ====================the initial else that close all the overview container =============
        else {
          subProgam.classList.remove("open-container");
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

// ==============display all programs
const displayAllPrograms = (programPlan) => {
  for (let i = 0; i < programPlan.length; i++) {
    programGridContainer.innerHTML += `<div class="program-container">
 
  <div class="program">
  <i class="fa-solid fa-list" id="show-program" data-overview=${i}></i>
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
<div class="created-workouts"></div>
</div>`;
  }
};

// =======================display time stamps =========================
const displayTimeStamps = (program, createdAt, updatedAt) => {
  const overviewContainer = program.querySelector(".overview-container");

  overviewContainer.innerHTML = `<div class="date-stats">
  <p class="created-at">created at: <span> ${createdAt}</span></p>
  <p class="updated-at">updated at: <span> ${updatedAt}</span></p>
  
</div>
<div class="days-container">
<p class="day chosen-day" data-day="0">mon</p>

<p class="day" data-day="1">tue</p>
<p class="day" data-day="2">wed</p>
<p class="day" data-day="3">thu</p>
<p class="day" data-day="4">fri</p>
<p class="day" data-day="5">sat</p>
<p class="day" data-day="6">sun</p>
</div>

`;
  const daysBtn = document.querySelectorAll(".day");
  const createdWorkoutsContainer = program.querySelector(".created-workouts");

  daysBtn.forEach((day) => {
    day.addEventListener("click", () => {
      let dayIndex = day.dataset.day;

      daysBtn.forEach((subDay) => {
        if (subDay === day) {
          subDay.classList.add("chosen-day");
        } else {
          subDay.classList.remove("chosen-day");
        }
      });
    });
  });
};
