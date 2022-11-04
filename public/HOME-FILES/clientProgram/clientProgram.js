const clientId = localStorage.getItem("cref");
const preLoader = document.querySelector(".gif");
const overlay = document.querySelector(".overlay");
const programGridContainer = document.querySelector(
  ".workouts-programs-grid-container"
);
const historyBtn = document.getElementById("history-btn");
const currentBtn = document.getElementById("current-btn");
const iframeContainer = document.querySelector(".iframe-container");
const iframe = document.querySelector(".iframe");
const closeBtn = document.querySelectorAll("#close-btn");
// ==================get current programs ======================

const getCurrentPrograms = async () => {
  const { data } = await axios.get(
    `/api/v1/workoutProgram?createdFor=${clientId}`
  );
  preLoader.classList.add("display-none");
  let programs = data.workoutprograms;
  let currentProgram = programs.filter((element) => {
    return element.current === true;
  });
  displayProgramInfo(currentProgram);
  currentBtn.addEventListener("click", () => {
    displayProgramInfo(currentProgram);
    historyBtn.classList.remove("selected-btn");
    currentBtn.classList.add("selected-btn");
  });
  historyBtn.addEventListener("click", () => {
    displayProgramInfo(programs);
    currentBtn.classList.remove("selected-btn");
    historyBtn.classList.add("selected-btn");
  });
};

getCurrentPrograms();

closeBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let id = e.target.dataset.close;
    let container = document.querySelector(`.${id}`);
    container.classList.remove("open-container");
    overlay.classList.remove("open-container");
    iframe.src = "";
  });
});

// =============display program info ==============
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
        if (subProgam === program) {
          const daysArr = programPlan[index].weeks[0].days;
          displayOverview(program, daysArr);

          subProgam.classList.toggle("open-container");
        } else {
          subProgam.classList.remove("open-container");
        }
      });
    });
  });
};
// ==============display all programs/ if name > 13 add ...
const displayAllPrograms = (programPlan) => {
  programGridContainer.innerHTML = "";
  for (let i = 0; i < programPlan.length; i++) {
    if (programPlan[i].name.length > 13) {
      programPlan[i].name = `${programPlan[i].name.slice(0, 13)}..`;
    }
    programGridContainer.innerHTML += `<div class="program-container">
 
  <div class="program">
  <i class="fa-solid fa-angle-up" id="show-program" data-overview=${i}></i>
 <p>${programPlan[i].name}</p>
 <i class="fa-solid fa-dumbbell" id="dumbbell-icon"></i>
  </div>
  
  <div class="overview-container">


</div>
<div class="created-workouts"></div>
</div>`;
  }
};

// =======================display time stamps =========================
const displayOverview = (program, daysArr) => {
  const overviewContainer = program.querySelector(".overview-container");
  const createdWorkoutsContainer = program.querySelector(".created-workouts");
  overviewContainer.innerHTML = `
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
        <i class="fa-solid fa-angle-up" id="show-exercises" data-exercises="0"></i>
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

  let displayExercices = selectedExercisesArray.map((element) => {
    return `<div class="one-exercise-container">
    <span class ='left-span' id='chain' data-chain=${
      element.chain
    }><i class="fa-solid fa-square-check"></i></span>
    
    <div class="container-top-section">
      <div class="exercise-general-info">
        <img
          src=${element.img}
          alt=""
        />
        <p class="chosen-exercise-name">${element.name}</p>
      </div>
      <div class="exercise-tools">
      
      <p class="note-info">${element.note}</p>
      <i class="fa-regular fa-eye" id="toggle-video" data-video = ${
        element.video
      }></i>
      </div>
    </div>
    <div class="exercise-stats-container">
      <div class="input-container">
        <p>set:</p>
        <div id="sets-input">${element.set || "-"} </div>
        
      </div>
      <div class="input-container">
        <p>rep:</p>
        <div id="reps-input">${element.rep || "-"}</div>
      </div>
      <div class="input-container">
        <p>rest:</p>
        <div id="rest-input">${element.rest || "-"} </div>
      </div>
      <div class="input-container">
        <p>tempo:</p>
        <div id="tempo-input">${element.tempo || "-"}</div>
      </div>
      <div class="button-type-container">
      <button class="outline-btn" id="dropset" data-type=${
        element.type
      }>dropset</button>
      <button class="outline-btn" id="chain" data-chain = ${
        element.chain
      }>groupset</button>
      <button class="outline-btn" id="rest-pause" data-type=${
        element.type
      }>rest-pause</button>
      </div>
    </div>
  </div>`;
  });
  exContainer.innerHTML = displayExercices.join("");

  btnLoop("dropset");
  btnLoop("rest-pause");
  groupsetLoop("chain");

  const noteInfo = document.querySelectorAll(".note-info");
  noteInfo.forEach((note) => {
    if (note.textContent.length === 0) {
      note.classList.add("display-none");
    }
  });

  const toggleVideoBtns = document.querySelectorAll("#toggle-video");

  toggleVideoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let Url = btn.dataset.video;

      if (Url === "none") {
        console.log("no video");
      } else {
        overlay.classList.add("open-container");
        iframeContainer.classList.add("open-container");
        iframe.src = Url;
      }
    });
  });
};

// ================end of chosen exercises ===============

const btnLoop = (elementType) => {
  const element = document.querySelectorAll(`#${elementType}`);
  element.forEach((btn) => {
    let type = btn.dataset.type;

    if (type !== elementType) {
      btn.classList.add("display-none");
    }
  });
};

const groupsetLoop = (elementChain) => {
  const groupset = document.querySelectorAll(`#${elementChain}`);
  groupset.forEach((btn) => {
    let chain = btn.dataset.chain;

    if (chain !== "true") {
      btn.classList.add("display-none");
    }
  });
};

// ===================logout ===========================
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

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/clientHomepage/clientHomepage.html";
});
