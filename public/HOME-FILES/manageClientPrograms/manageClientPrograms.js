// ==============select verification container and input container =========================
const btnContainer = document.querySelector(".btn-container");
const programGridContainer = document.querySelector(
  ".workouts-programs-grid-container"
);
const deleteVerificationContainer = document.querySelector(
  ".delete-verification-section"
);

const createNewProgramBtn = document.querySelector(".create-workout-btn");
const preLoader = document.querySelector(".gif");

// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

localStorage.removeItem("wo");
let clientId = localStorage.getItem("cref");
let wLength = JSON.parse(localStorage.getItem("wL"));
let workoutPrograms = [];

createNewProgramBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/createWorkout/createWorkout.html";
});

// ================fetch workouts ===================
const getWorkouts = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get(
      `/api/v1/workoutProgram?createdFor=${clientId}`
    );
    preLoader.classList.add("display-none");
    btnContainer.classList.add("show-opacity");
    //  =========if length is === 0 means no workouts we want to display the create item =============
    const length = data.workoutprograms.length;

    workoutPrograms = data.workoutprograms;

    displayProgramInfo(workoutPrograms);
  } catch (error) {
    console.log(error);
  }
};
getWorkouts();

// =================search click event ==========
searchWorkoutIcon.addEventListener("click", async () => {
  if (searchWorkoutInput.value.length > 0) {
    searchFunction();
  }
  searchWorkoutInput.addEventListener("input", async () => {
    if (searchWorkoutInput.value.length > 0) {
      getWorkouts();
    }
  });
});

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
        // =====opening container and displaying the timestamps and days  on click
        if (subProgam === program) {
          const createdAt = programPlan[index].createdAt.slice(0, 10);
          const updatedAt = programPlan[index].updatedAt.slice(0, 10);
          const daysArr = programPlan[index].weeks[0].days;
          displayOverview(program, createdAt, updatedAt, daysArr);

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
  window.location = "http://192.168.1.195:3000/manageClient/manageClient.html";
});
// ================logout user ===================

const logoutBtn = document.getElementById("user-logout-nav-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await axios.post("/api/v1/auth/logout");
    localStorage.clear();
    window.location = "http://192.168.1.195:3000/";
  } catch (error) {
    console.log(error);
  }
});

// ==============display all programs/ if name > 13 add ...
const displayAllPrograms = (programPlan) => {
  programGridContainer.innerHTML = "";
  for (let i = 0; i < programPlan.length; i++) {
    if (programPlan[i].name.length > 13) {
      programPlan[i].name = `${programPlan[i].name.slice(0, 13)}..`;
    }
    programGridContainer.innerHTML += `<div class="program-container">
 
  <div class="program">
  <i class="fa-solid fa-list" id="show-program" data-overview=${i}></i>
 <p>${programPlan[i].name}</p>
    <div class="tools">
      <i class="fa-regular fa-pen-to-square" id="edit-workout" data-edit=${programPlan[i]._id}></i>
      <i class=" fa-solid fa-trash" id="delete-workout" data-index=${i} data-delete=${programPlan[i]._id}></i>
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
  // ===========delete program ==============
  const deleteWorkout = document.querySelectorAll("#delete-workout");

  deleteWorkout.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      let workoutId = e.target.dataset.delete;
      let workoutIndex = e.target.dataset.index;
      let workoutName =
        e.target.parentElement.previousElementSibling.textContent;

      deleteVerificationContainer.classList.add("open-container");
      deleteVerificationContainer.innerHTML = ` 
      <div class="delete-verification-box">
      <h3>Are you sure you want to delete <span>${workoutName}</span> ?</h3>
      <div class="yes-no-container">
        <button class="yes-btn" data-delete =${workoutId} data-index=${workoutIndex}>yes</button>
        <button class="no-btn"> no </button>
      </div>
      </div>`;

      const noBtn = document.querySelector(".no-btn");
      noBtn.addEventListener("click", () => {
        deleteVerificationContainer.classList.remove("open-container");
      });

      // ===confirmation for delete program ====================
      const yesBtn = document.querySelector(".yes-btn");
      yesBtn.addEventListener("click", async (e) => {
        let id = e.target.dataset.delete;
        let index = e.target.dataset.index;

        preLoader.classList.remove("display-none");
        await axios.delete(`/api/v1/workoutProgram/${id}`);

        const { data } = await axios.get("/api/v1/dataLength");

        let workoutLength = data.dataLength[0].workoutLength - 1;
        await axios.patch("/api/v1/dataLength", {
          workoutLength: workoutLength,
        });
        programPlan.splice(index, 1);

        deleteVerificationContainer.classList.remove("open-container");
        preLoader.classList.add("display-none");
        wLength = wLength - 1;
        localStorage.setItem("wL", JSON.stringify(wLength));

        displayProgramInfo(programPlan);
      });
    });
  });

  // ====got to edit page and set the wo id in the localstorage ===
  const editWorkoutBtns = document.querySelectorAll("#edit-workout");
  editWorkoutBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      let workoutId = editBtn.dataset.edit;
      localStorage.setItem("wo", workoutId);
      window.location =
        "http://192.168.1.195:3000/editWorkout/editWorkout.html";
    });
  });
};

// =======================display time stamps =========================
const displayOverview = (program, createdAt, updatedAt, daysArr) => {
  const overviewContainer = program.querySelector(".overview-container");
  const createdWorkoutsContainer = program.querySelector(".created-workouts");
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
  chosenDay(program, daysArr);

  daysBtn.forEach((day) => {
    day.addEventListener("click", () => {
      let dayIndex = day.dataset.day;
      displayWorkouts(program, daysArr, dayIndex);
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

// ===============display workouts  ===========================

const displayWorkouts = (program, daysArr, index) => {
  const createdWorkoutsContainer = program.querySelector(".created-workouts");
  const daysBtn = document.querySelectorAll(".day");

  let workouts = daysArr[index].workouts;

  createdWorkoutsContainer.innerHTML = "";
  if (workouts.length === 0) {
    createdWorkoutsContainer.innerHTML = `<h2>No workouts available</h2>`;
  } else {
    for (let i = 0; i < workouts.length; i++) {
      if (workouts[i].name === "rest day") {
        createdWorkoutsContainer.innerHTML = `<h2>Rest Day</h2>`;
      } else {
        createdWorkoutsContainer.innerHTML += `<div class='workout-info-container'> 
        <div class="one-workout">
        <i class="fa-solid fa-list" id="show-exercises" data-exercises="0"></i>
        <p class="workout-name">${workouts[i].name}</p>
    <span class="workout-length">${workouts[i].exercises.length} ex</span>
        
        </div>
        <div class='exercises-container'></div>
        </div>
        `;
      }
    }
  }
  // =================toggle function for every workout container
  const oneWorkoutContainer = document.querySelectorAll(
    ".workout-info-container"
  );

  oneWorkoutContainer.forEach((oneWorkout) => {
    const exContainer = oneWorkout.querySelector(".exercises-container");
    const toggleExercises = oneWorkout.querySelector("#show-exercises");

    toggleExercises.addEventListener("click", () => {
      // =========workout index ===========
      let workoutIndex = toggleExercises.dataset.exercises;

      oneWorkoutContainer.forEach((subWorkout) => {
        if (subWorkout === oneWorkout) {
          subWorkout.classList.toggle("show-info");
          daysBtn.forEach((day) => {
            if (day.classList.contains("chosen-day")) {
              let dayIndex = day.dataset.day;

              let exercisesArr =
                daysArr[dayIndex].workouts[workoutIndex].exercises;

              displayChosenExercises(oneWorkout, exercisesArr);
            }
          });
        } else {
          subWorkout.classList.remove("show-info");
        }
      });
    });
  });
};

const chosenDay = (program, daysArr) => {
  const daysBtn = document.querySelectorAll(".day");
  daysBtn.forEach((day) => {
    if (day.classList.contains("chosen-day")) {
      let dayIndex = day.dataset.day;
      displayWorkouts(program, daysArr, dayIndex);
    }
  });
};

// ==================display chosen exercises set them into container and set the data ===========

const displayChosenExercises = (oneWorkout, selectedExercisesArray) => {
  const exContainer = oneWorkout.querySelector(".exercises-container");
  exContainer.innerHTML = "";
  // =================conditions for displaying items  ==================
  for (let i = 0; i < selectedExercisesArray.length; i++) {
    let exercise = selectedExercisesArray[i];
    if (exercise.type === "" && exercise.chain === false) {
      standardChosen(exercise, i, oneWorkout);
    } else if (exercise.type === "rest-pause" && exercise.chain === true) {
      chosenRpSuperset(exercise, i, oneWorkout);
    } else if (exercise.type === "dropset" && exercise.chain === true) {
      chosenDsSuperset(exercise, i, oneWorkout);
    } else if (exercise.chain === true) {
      chosenSuperset(exercise, i, oneWorkout);
    } else if (exercise.type === "rest-pause") {
      chosenTypeRestPause(exercise, i, oneWorkout);
    } else if (exercise.type === "dropset") {
      chosenTypeDropset(exercise, i, oneWorkout);
    }
  }
};

// ==============chosen exercises if conditions  =========
const standardChosen = (exercise, i, oneWorkout) => {
  const exContainer = oneWorkout.querySelector(".exercises-container");
  exContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='left-span'></span>
  <span class ='right-span'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <div id="sets-input">${exercise.set || "-"} </div>
      
    </div>
    <div class="input-container">
      <p>rep:</p>
      <div id="reps-input">${exercise.rep || "-"}</div>
    </div>
    <div class="input-container">
      <p>rest:</p>
      <div id="rest-input">${exercise.rest || "-"} </div>
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <div id="tempo-input">${exercise.tempo || "-"}</div>
    </div>
    <div class="button-type-container">
     
    </div>
  </div>
</div>`;
};

const chosenSuperset = (exercise, i, oneWorkout) => {
  const exContainer = oneWorkout.querySelector(".exercises-container");
  exContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='left-span show-opacity'></span>
  <span class ='right-span show-opacity'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
     
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <div id="sets-input">${exercise.set || "-"} </div>
    </div>
    <div class="input-container">
      <p>rep:</p>
      <div id="reps-input">${exercise.rep || "-"}</div>
    </div>
    <div class="input-container">
      <p>rest:</p>
      <div id="rest-input">${exercise.rest || "-"} </div>
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <div id="tempo-input">${exercise.tempo || "-"}</div>
    </div>
    <div class="button-type-container">
      <button class="full-btn" id="chain" data-chain = ${i}>chain</button>
     
    </div>
  </div>
</div>`;
};

const chosenTypeRestPause = (exercise, i, oneWorkout) => {
  const exContainer = oneWorkout.querySelector(".exercises-container");
  exContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='left-span'></span>
  <span class ='right-span'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
     
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <div id="sets-input">${exercise.set || "-"} </div>
    </div>
    <div class="input-container">
      <p>rep:</p>
      <div id="reps-input">${exercise.rep || "-"}</div>
    </div>
    <div class="input-container">
      <p>rest:</p>
      <div id="rest-input">${exercise.rest || "-"} </div>
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <div id="tempo-input">${exercise.tempo || "-"}</div>
    </div>
    <div class="button-type-container">
      
      <button class="full-btn" id="rest-pause" data-type=${i}>rest-pause</button>
    
    </div>
  </div>
</div>`;
};

const chosenTypeDropset = (exercise, i, oneWorkout) => {
  const exContainer = oneWorkout.querySelector(".exercises-container");
  exContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='left-span'></span>
  <span class ='right-span'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
   
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <div id="sets-input">${exercise.set || "-"} </div>
    </div>
    <div class="input-container">
      <p>rep:</p>
      <div id="reps-input">${exercise.rep || "-"}</div>
    </div>
    <div class="input-container">
      <p>rest:</p>
      <div id="rest-input">${exercise.rest || "-"} </div>
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <div id="tempo-input">${exercise.tempo || "-"}</div>
    </div>
    <div class="button-type-container">
      
      
      <button class="full-btn" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};

const chosenRpSuperset = (exercise, i, oneWorkout) => {
  const exContainer = oneWorkout.querySelector(".exercises-container");
  exContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='left-span show-opacity'></span>
  <span class ='right-span show-opacity'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
     
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <div id="sets-input">${exercise.set || "-"} </div>
    </div>
    <div class="input-container">
      <p>rep:</p>
      <div id="reps-input">${exercise.rep || "-"}</div>
    </div>
    <div class="input-container">
      <p>rest:</p>
      <div id="rest-input">${exercise.rest || "-"} </div>
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <div id="tempo-input">${exercise.tempo || "-"}</div>
    </div>
    <div class="button-type-container">
      <button class="full-btn" id="chain" data-chain = ${i}>chain</button>
      <button class="full-btn" id="rest-pause" data-type=${i}>rest-pause</button>
    
    </div>
  </div>
</div>`;
};

const chosenDsSuperset = (exercise, i, oneWorkout) => {
  const exContainer = oneWorkout.querySelector(".exercises-container");
  exContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='left-span show-opacity'></span>
  <span class ='right-span show-opacity'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <div id="sets-input">${exercise.set || "-"} </div>
    </div>
    <div class="input-container">
      <p>rep:</p>
      <div id="reps-input">${exercise.rep || "-"}</div>
    </div>
    <div class="input-container">
      <p>rest:</p>
      <div id="rest-input">${exercise.rest || "-"} </div>
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <div id="tempo-input">${exercise.tempo || "-"}</div>
    </div>
    <div class="button-type-container">
      <button class="full-btn" id="chain" data-chain = ${i}>chain</button>
    
      <button class="full-btn" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};
// ================end of chosen exercises ===============