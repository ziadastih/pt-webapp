const clientId = localStorage.getItem("cref");
let number = 0;
const daysArr = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
let program = [];
let logBook = [];

const createdWorkoutsContainer = document.querySelector(".created-workouts");
const dayValue = document.querySelector(".day-value");
const workoutLength = document.querySelector(".workouts-length");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const iframeContainer = document.querySelector(".iframe-container");
const iframe = document.querySelector(".iframe");
const closeBtn = document.querySelector("#close-btn");
const preLoader = document.querySelector(".gif");
const workoutName = document.querySelector(".workout-name");
const overlay = document.querySelector(".overlay");
const exContainer = document.querySelector(".exercises-container");
const startWorkoutContainer = document.querySelector(
  ".start-workout-container"
);
const logSetContainer = document.querySelector(".log-set-container");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const backToMainBtn = document.querySelector("#back-to-main");
const weightInput = document.getElementById("log-weight");
const repsInput = document.getElementById("log-reps");
// ============================get current workout ================
const getWorkout = async () => {
  const { data } = await axios.get(
    `/api/v1/workoutProgram?current=${clientId}`
  );
  overlay.classList.add("display-none");
  preLoader.classList.add("display-none");
  dayValue.textContent = daysArr[number];
  program = data.workoutProgram[0];
  displayWorkouts(number);

  // ==============next btn ================
  nextBtn.addEventListener("click", () => {
    number++;
    dayValue.textContent = daysArr[number];
    displayWorkouts(number);
  });

  // =============prev btn  ====================
  prevBtn.addEventListener("click", () => {
    number--;
    dayValue.textContent = daysArr[number];
    displayWorkouts(number);
  });

  for (let i = 0; i < program.weeks[0].days.length; i++) {
    let day = program.weeks[0].days[i];
    let workouts = day.workouts;

    const filterChecked = workouts.filter(
      (Element) => Element.checked === false
    );
    if (filterChecked.length > 0) {
      number = i;

      dayValue.textContent = daysArr[number];
      displayWorkouts(number);
      return;
    }
  }
};
getWorkout();

// =========================display-workouts  ============

const displayWorkouts = (number) => {
  let workouts = program.weeks[0].days[number].workouts;
  if (number === 0) {
    prevBtn.classList.add("remove-opacity");
  } else if (number === daysArr.length - 1) {
    nextBtn.classList.add("remove-opacity");
  } else {
    nextBtn.classList.remove("remove-opacity");
    prevBtn.classList.remove("remove-opacity");
  }
  workoutLength.textContent = `${workouts.length} wo`;
  createdWorkoutsContainer.innerHTML = "";

  for (let i = 0; i < workouts.length; i++) {
    if (workouts[i].name === "rest day" || workouts.length === 0) {
      createdWorkoutsContainer.innerHTML = ` <div class="one-workout">
        <i class="fa-solid fa-dumbbell"></i>
  <p class="workout-name">rest day</p>
  <i class="fa-solid fa-battery-full" id="battery-icon"></i>
  
  </div>`;
    } else {
      createdWorkoutsContainer.innerHTML += ` <div class="one-workout" data-id=${i}>
        <i class="fa-solid fa-dumbbell"></i>
    <p class="workout-name">${workouts[i].name}</p>
    <span class='select'>${workouts[i].exercises.length} ex</span>
    
  </div>  `;
    }
  }
  const wokroutsContainers = document.querySelectorAll(".one-workout");

  wokroutsContainers.forEach((workout) => {
    workout.addEventListener("click", () => {
      let workoutIndex = workout.dataset.id;

      let selectedWorkout =
        program.weeks[0].days[number].workouts[workoutIndex];

      workoutName.textContent = selectedWorkout.name;
      startWorkoutContainer.classList.add("translate-page");
      displayChosenExercises(selectedWorkout);
    });
  });
};

// ========================display exercises ==================
const displayChosenExercises = (workout) => {
  let selectedExercisesArray = workout.exercises;

  exContainer.innerHTML = "";

  let displayExercices = selectedExercisesArray.map((element, index) => {
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
      <i class="fa-solid fa-book" id="toggle-log-container" data-id =${index}></i>
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

  let logBook = selectedExercisesArray.map((element) => {
    return { name: element.name, logSets: [] };
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

  const toggleLogContainer = document.querySelectorAll("#toggle-log-container");

  toggleLogContainer.forEach((btn) => {
    btn.addEventListener("click", () => {
      let exerciseIndex = btn.dataset.id;
      console.log(exerciseIndex);
      logSetContainer.classList.add("display-flex");
      overlay.classList.remove("display-none");
      submitBtn.removeAttribute("data-id");
      submitBtn.setAttribute("data-id", exerciseIndex);
      console.log(submitBtn);
      cancelBtn.addEventListener("click", () => {
        overlay.classList.add("display-none");
        logSetContainer.classList.remove("display-flex");
      });

      submitBtn.addEventListener("click", () => {
        let weightValue = weightInput.value;
        let repsValue = repsInput.value;
        let logBookIndex = submitBtn.dataset.id;
        logBook[logBookIndex].logSets.push({
          weight: weightValue,
          reps: repsValue,
        });
        weightInput.value = "";
        repsInput.value = "";
        logSetContainer.classList.remove("display-flex");
        overlay.classList.add("display-none");
        console.log(logBook);
      });
    });
  });

  const toggleVideoBtns = document.querySelectorAll("#toggle-video");

  toggleVideoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let Url = btn.dataset.video;

      if (Url === "none") {
        console.log("no video");
      } else {
        overlay.classList.remove("display-none");
        iframeContainer.classList.add("display-flex");
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

// =================secondary  functions  ========================

closeBtn.addEventListener("click", () => {
  iframeContainer.classList.remove("display-flex");
  overlay.classList.add("display-none");
});

backToMainBtn.addEventListener("click", () => {
  startWorkoutContainer.classList.remove("translate-page");
});

// ==============back btn ============================
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/clientHomepage/clientHomepage.html";
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
