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
// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

goToCreateProgram.addEventListener("click", () => {
  window.location = "http://localhost:3000/createWorkout/createWorkout.html";
});

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

    showProgramOverview.addEventListener("click", function (e) {
      let index = e.target.dataset.overview;

      programContainer.forEach(function (subProgam) {
        // =====opening container and displaying the timestamps and week  on click
        if (subProgam === program) {
          const createdAt = programPlan[index].createdAt.slice(0, 10);
          const updatedAt = programPlan[index].updatedAt.slice(0, 10);

          displayTimeStamps(program, createdAt, updatedAt);

          subProgam.classList.toggle("open-container");

          let weeksArray = programPlan[index].weeks;
          displayWeek(weeksArray, program);

          // =======all weeks container and function to display the days  ===================
          const allWeeksContainer =
            document.querySelectorAll(".week-container");

          allWeeksContainer.forEach((week) => {
            const showDaysBtn = week.querySelector("#show-days");
            const allDaysContainer = week.querySelector(".all-days-container");

            showDaysBtn.addEventListener("click", (v) => {
              let weekIndex = v.target.dataset.week;

              allWeeksContainer.forEach((subweek) => {
                if (subweek === week) {
                  subweek.classList.toggle("show-days");
                  let daysArray = weeksArray[weekIndex].days;
                  displayDays(daysArray, week);

                  // ==================display workouts for every day we have ==================
                  const oneDayContainer =
                    document.querySelectorAll(".one-day-container");
                  oneDayContainer.forEach((day) => {
                    const showWorkoutsBtn = day.querySelector("#show-workouts");
                    const allWorkoutsContainer = day.querySelector(
                      ".all-workouts-container"
                    );
                    showWorkoutsBtn.addEventListener("click", (k) => {
                      let dayIndex = k.target.dataset.days;
                      let workoutsArray = daysArray[dayIndex].workouts;
                      console.log(workoutsArray);
                      oneDayContainer.forEach((subDay) => {
                        if (subDay === day) {
                          subDay.classList.toggle("show-workouts");
                          displayWorkouts(workoutsArray, day);
                          // ========================display the exercises =======================================

                          const oneWorkoutContainer = document.querySelectorAll(
                            ".one-workout-container"
                          );
                          oneWorkoutContainer.forEach((workout) => {
                            const showExercisesBtn =
                              workout.querySelector("#show-exercises");
                            const allExercicesContainer = workout.querySelector(
                              ".all-exercises-container"
                            );

                            showExercisesBtn.addEventListener("click", (m) => {
                              let workoutIndex = m.target.dataset.exercise;

                              let exercisesArray =
                                workoutsArray[workoutIndex].exercises;

                              oneWorkoutContainer.forEach((subworkout) => {
                                if (subworkout === workout) {
                                  subworkout.classList.toggle("show-info");
                                  displayExercises(exercisesArray, workout);
                                } else {
                                  subworkout.classList.remove("show-info");
                                }
                              });
                            });
                          });
                        }

                        // ===============else to show or hide the workouts =============
                        else {
                          subDay.classList.remove("show-workouts");
                        }
                      });
                    });
                  });
                }
                // =============else to show and hide the days ==================
                else {
                  subweek.classList.remove("show-days");
                }
              });
            });
          });
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
</div>`;
  }
};

// =======================display time stamps =========================
const displayTimeStamps = (program, createdAt, updatedAt) => {
  const overviewContainer = program.querySelector(".overview-container");
  overviewContainer.innerHTML = `<div class="date-stats">
  <p class="created-at">created at: <span> ${createdAt}</span></p>
  <p class="updated-at">updated at: <span> ${updatedAt}</span></p>
</div>`;
};

const displayWeek = (weeks, program) => {
  const overviewContainer = program.querySelector(".overview-container");
  for (let i = 0; i < weeks.length; i++) {
    overviewContainer.innerHTML += `<div class="week-container">
<div class="week">
<i class="fa-solid fa-list" id="show-days" data-week=${i}></i>
<p class="week-number">week ${i + 1}</p>
<p class= "number-of-days">${weeks[i].days.length} days</p>

</div>
<div class="all-days-container"></div>
</div>
`;
    // =========================week container function ===================================================
  }
};

const displayDays = (days, week) => {
  const allDaysContainer = week.querySelector(".all-days-container");
  allDaysContainer.innerHTML = "";
  for (let i = 0; i < days.length; i++) {
    allDaysContainer.innerHTML += `<div class="one-day-container">
<div class="day">
<i class="fa-solid fa-list" id="show-workouts" data-days=${i}></i>
<p class="days-name">day ${i + 1}</p>
<p class="number-of-workouts">${days[i].workouts.length}w</p>
</div>
<div class="all-workouts-container"></div>
</div>
`;
  }
};

const displayWorkouts = (workouts, day) => {
  const allWorkoutsContainer = day.querySelector(".all-workouts-container");
  allWorkoutsContainer.innerHTML = "";
  for (let n = 0; n < workouts.length; n++) {
    allWorkoutsContainer.innerHTML += `<div class ='one-workout-container'>
    <div class="workout">
    <i class="fa-solid fa-list" id="show-exercises" data-exercise=${n}></i>
        <p class="workout-name">${workouts[n].name}</p>
       <span>${workouts[n].type}</span>
      </div>
    
      <div class="all-exercises-container"></div>
      </div>`;
  }
};

const displayExercises = (exercises, workout) => {
  const allExercisesContainer = workout.querySelector(
    ".all-exercises-container"
  );
  allExercisesContainer.innerHTML = "";
  for (let i = 0; i < exercises.length; i++) {
    allExercisesContainer.innerHTML += `<div class="exercise">
<p class="exercise-name"><span></span> ${exercises[i].name}</p>
<div class="exercise-info">
<div class="exercise-stats">
<p class="sets stat-dot"><span></span> set: ${exercises[i].sets}</p>
<p class="reps stat-dot"><span></span> reps: ${exercises[i].reps}</p>
</div>
<div class="exercise-stats">
<p class="tempo stat-dot"><span></span> tempo: ${exercises[i].tempo}</p>
<p class="rest-time stat-dot"><span></span> rest: ${exercises[i].rest}</p>
</div>
</div>
</div>`;
  }
};
