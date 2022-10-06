const exercices = [
  {
    name: "Seated Alternating Hammer Curls",
  },
  {
    name: "Rotating Alternate Incline Bicep Curls",
  },
  {
    name: "Alternating Deltoid Raise",
  },
  {
    name: "Standing Alternate Rotating Bicep Curls ",
  },
  {
    name: "Alternating Dumbbell Floor Press ",
  },
  {
    name: "Alternating Dumbbell Floor Press ",
  },
  {
    name: "Alternating Front Raise",
  },
  {
    name: "Alternating Preacher Curl",
  },
  {
    name: "Seated Arnold Press",
  },
  {
    name: "Seated Arnold Press",
  },
  {
    name: "Around The Worlds",
  },
  {
    name: "Bent-Arm Dumbbell Pullover",
  },
  {
    name: "Standing Rear Delt Flyes Head Against Bench",
  },
  {
    name: "Dumbbell Bent Over Rows",
  },
  {
    name: "Dumbbell Bent Over Rows",
  },
  {
    name: "Dumbbell Bent Over Rows Neutral Grip",
  },
  {
    name: "Car Drivers",
  },
];
// =====program schema array , it has name, weeks,by default we will set one week , with 7 days
const program = [
  {
    name: "",
    weeks: [
      {
        days: [
          {
            name: "monday",
            workouts: [],
          },
          {
            name: "tuesday",
            workouts: [],
          },
          {
            name: "wednesday",
            workouts: [],
          },
          {
            name: "thursday",
            workouts: [],
          },
          {
            name: "friday",
            workouts: [],
          },
          {
            name: "saturday",
            workouts: [],
          },
          {
            name: "sunday",
            workouts: [],
          },
        ],
      },
    ],
  },
];

// ============== program selectors and the overlay ================================================
const overlay = document.querySelector(".overlay");
const createProgramNameContainer = document.querySelector(
  ".create-program-name"
);
const programNameInput = document.querySelector("#program-input-name");
const editProgramNameBtn = document.querySelector(".edit-program-name");
const createProgramNameBtn = document.querySelector(".add-program-name");
const programName = document.querySelector(".program-name-header");
const editProgramNameIcon = document.querySelector(".edit-program-name-icon");
const nameInputAlert = document.querySelector(".create-program-name-alert");

// ================workout selectors =========================

const workoutNameInput = document.getElementById("workout-input-name");
const workoutCreateBtn = document.querySelector(".add-workout-name");
const workoutEditBtn = document.querySelector(".edit-workout-name");
const workoutNameAlert = document.querySelector(".workout-name-alert");
const workoutNameHeader = document.querySelector(".workout-name-header");
const workoutHeader = document.querySelector(".workout-header");
const workoutNameContainer = document.querySelector(".create-workout-name");
const closeBtn = document.querySelectorAll("#close-btn");

// ==============create workout / or set as rest day selectors ================
const createWorkoutBtnContainer = document.querySelector(
  ".create-workout-btn-container"
);
const toggleWorkoutNameContainer = document.getElementById(
  "toggle-workout-name-container"
);

// ===================exercices container that hold our data names and images and checkbox ===========
const mainContainer = document.querySelector(".main-container");
const addExercicesContainer = document.querySelector(
  ".add-exercises-container"
);
const exercicesListContainer = document.querySelector(
  ".exercises-list-container"
);

// ===============main container btns  selectors ======================
const mainContainerBtns = document.querySelector(".main-container-btns");
const toggleExercisesList = document.querySelector(".toggle-exercises-list");
const submitWorkout = document.querySelector(".submit-workout");

// ===============event listener for adding program/ edit icon / and edit program name =============
createProgramNameBtn.addEventListener("click", () => {
  addProgramName();
});

editProgramNameIcon.addEventListener("click", () => {
  createProgramNameContainer.classList.remove("display-none");
  overlay.classList.remove("display-none");
  programNameInput.value = programName.textContent;
  editProgramNameIcon.classList.remove("show-opacity");
  createProgramNameBtn.classList.add("display-none");
  editProgramNameBtn.classList.add("display-flex");
});

editProgramNameBtn.addEventListener("click", () => {
  addProgramName();
});

// toggle the create workout name container =========

toggleWorkoutNameContainer.addEventListener("click", () => {
  workoutNameContainer.classList.add("display-flex");
  overlay.classList.remove("display-none");
});

closeBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let id = e.target.dataset.close;
    let container = document.querySelector(`.${id}`);
    container.classList.remove("display-flex");
    overlay.classList.add("display-none");
  });
});
// ============ add name and display different setup in main container , show exercises list and workout name with edit btn for it ==

workoutCreateBtn.addEventListener("click", () => {
  setupWorkoutName();
});

// ========displaying the exercices we have inside the exercises list container

const displayExercicesArray = () => {
  for (let i = 0; i < exercices.length; i++) {
    exercicesListContainer.innerHTML += `<div class="exercise">
    <span class="check-box" data-exercise =${i}
      ><i class="fa-solid fa-check" id="check-icon"></i
    ></span>
    <img
      src="../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg"
      class="exercise-img"
      alt=""
    />
    <p class="exercise-name">${exercices[i].name}</p>
  </div>`;
  }
};

displayExercicesArray();

// =======================show alert function ===========================
const showAlert = async (alert) => {
  await alert.classList.add("display-flex");
  setTimeout(() => {
    alert.classList.remove("display-flex");
  }, 3000);
};

// ================ adding the program name input value to the top of the page and the showing the edit icon
const addProgramName = () => {
  if (programNameInput.value.length === 0) {
    showAlert(nameInputAlert);
  } else {
    programName.textContent = programNameInput.value;
    editProgramNameIcon.classList.add("show-opacity");
    overlay.classList.add("display-none");
    createProgramNameContainer.classList.add("display-none");
    program.name = programNameInput.value;
    console.log(program.name);
  }
};

// ======================= adding the workout name to the main container , opening the exercise multi choices and closing the rest and showing the overlay as well

const setupWorkoutName = () => {
  if (workoutNameInput.value.length === 0) {
    showAlert(workoutNameAlert);
  } else {
    createWorkoutBtnContainer.classList.add("display-none");
    workoutNameHeader.textContent = workoutNameInput.value;
    workoutHeader.classList.add("display-flex");
    addExercicesContainer.classList.add("display-flex");
    overlay.classList.remove("display-none");
    workoutNameContainer.classList.remove("display-flex");
    mainContainerBtns.classList.add("display-flex");
  }
};
