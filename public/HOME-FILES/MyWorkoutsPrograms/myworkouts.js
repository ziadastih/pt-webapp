// ==============select verification container and input container =========================
const btnContainer = document.querySelector(".btn-container");
const programGridContainer = document.querySelector(
  ".workouts-programs-grid-container"
);
const deleteVerificationContainer = document.querySelector(
  ".delete-verification-section"
);
const searchWorkoutInput = document.getElementById("search-workout-input");
const searchWorkoutIcon = document.getElementById("search-icon-btn");

const createNewProgramBtn = document.querySelectorAll(".create-workout-btn");
const preLoader = document.querySelector(".gif");
const fetchMore = document.querySelector(".fetch-more");
const overlay = document.querySelector(".overlay");
const iframeContainer = document.querySelector(".iframe-container");
const iframe = document.querySelector(".iframe");
const closeBtn = document.querySelector("#close-btn");
// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

localStorage.removeItem("wo");
let wLength = JSON.parse(localStorage.getItem("wL"));
let workoutPrograms = [];

createNewProgramBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location =
      "http://192.168.1.195:3000/createWorkout/createWorkout.html";
  });
});
let page = 0;
// ================fetch workouts ===================
const getWorkouts = async () => {
  page = 0;
  try {
    // ============getting the data ===============
    const { data } = await axios.get(`/api/v1/workoutProgram/?page=${page}`);
    preLoader.classList.add("display-none");

    //  =========if length is === 0 means no workouts we want to display the create item =============
    const length = data.workoutprograms.length;

    if (length === 0) {
      btnContainer.classList.add("open-container");
    }

    workoutPrograms = data.workoutprograms;

    displayProgramInfo(workoutPrograms);
  } catch (error) {
    console.log(error);
  }
};
getWorkouts();

searchWorkoutIcon.addEventListener("click", () => {
  searchWorkoutInput.classList.toggle("translate-input");
});

searchWorkoutInput.addEventListener("search", () => {
  searchFunction();
});

closeBtn.addEventListener("click", () => {
  iframeContainer.classList.remove("open-container");
  overlay.classList.remove("open-container");
  iframe.src = "";
});
// ===============display Programs  function with all the show and hide logic ====================

const displayProgramInfo = (programPlan) => {
  let length = programPlan.length;
  fetchMore.classList.add("diplay-flex");

  if (searchWorkoutInput.value.length > 0) {
    fetchMore.classList.remove("display-flex");
  } else {
    if (length === wLength) {
      fetchMore.classList.add("show-opacity");
      observer.unobserve(fetchMore);
    } else {
      fetchMore.classList.add("show-opacity");
      observer.observe(fetchMore);
    }
  }
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
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/coachHomepage/coachHomepage.html";
});
// ================logout user ===================

const logoutBtn = document.getElementById("logout-btn");

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
  <i class="fa-solid fa-angle-up" id="show-program" data-overview=${i}></i>
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
      overlay.classList.add("open-container");
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
        overlay.classList.remove("open-container");
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
        overlay.classList.remove("open-container");
        deleteVerificationContainer.classList.remove("open-container");
        preLoader.classList.add("display-none");
        wLength = wLength - 1;
        localStorage.setItem("wL", JSON.stringify(wLength));
        if (searchWorkoutInput.value.length > 0) {
          displayProgramInfo(programPlan);
        } else {
          getWorkouts();
        }
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
      <button class="full-btn" id="dropset" data-type=${
        element.type
      }>dropset</button>
      <button class="full-btn" id="chain" data-chain = ${
        element.chain
      }>groupset</button>
      <button class="full-btn" id="rest-pause" data-type=${
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

// ==============chosen exercises if conditions  =========

// ================end of chosen exercises ===============

// =======================search function =====================
const searchFunction = async () => {
  let inputCharacter = searchWorkoutInput.value;
  preLoader.classList.remove("display-none");
  const { data } = await axios.get(
    `/api/v1/workoutProgram/?name=${inputCharacter}`
  );
  observer.unobserve(fetchMore);
  preLoader.classList.add("display-none");

  workoutPrograms = data.workoutprograms;
  if (workoutPrograms.length === 0) {
    programGridContainer.innerHTML = `<h2>Sorry! No Programs matches your search</h2>`;
    fetchMore.classList.remove("display-flex");
  } else {
    displayProgramInfo(workoutPrograms);
  }

  searchWorkoutInput.addEventListener("input", () => {
    if (searchWorkoutInput.value.length === 0) {
      getWorkouts();
    }
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      preLoader.classList.remove("display-none");

      page = page + 1;
      const { data } = await axios.get(`/api/v1/workoutProgram/?page=${page}`);

      let fetchedPrograms = data.workoutprograms;
      await fetchedPrograms.forEach((program) => {
        workoutPrograms.push(program);
      });

      preLoader.classList.add("display-none");

      displayProgramInfo(workoutPrograms);
    }
  });
});
