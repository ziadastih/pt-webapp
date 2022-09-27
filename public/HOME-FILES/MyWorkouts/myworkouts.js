const btnContainer = document.querySelector(".btn-container");
const programGridContainer = document.querySelector(
  ".workouts-programs-grid-container"
);

const getWorkouts = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get("/api/v1/workout");
    //  =========if length is === 0 means no clients we want to display the create item =============
    const length = data.workouts.length;

    if (length === 0) {
      btnContainer.classList.add("open-container");
    }
    let workoutPrograms = data.workouts;
    console.log(data);
    console.log(workoutPrograms);
    displayProgram(workoutPrograms);
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
      <i class="fa-solid fa-trash" data-manage="programId"></i>
      <i class="fa-regular fa-pen-to-square" data-delete="programId"></i>
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
          <p class="created-at">created at: ${programPlan[index].createdAt}</p>
          <p class="updated-at">updated at: ${programPlan[index].updatedAt}</p>
        </div>`;
          ``;
          item.classList.toggle("open-container");

          let workout = programPlan[index].workouts;
          for (let i = 0; i < workout.length; i++) {
            overviewContainer.innerHTML += `<div class="workout-container">
            <div class="workout">
              <img src="../images/Arrow up.svg" id="show-exercise" alt="" data-exercise = '${i}'  />
              <p class="workout-name">${workout[i].name}</p>
              <div class="tools">
                <i class="fa-solid fa-trash"></i>
                <i class="fa-regular fa-pen-to-square"></i>
              </div>
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
