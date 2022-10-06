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

// ==============creating the program name and editing it =====
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

const mainContainer = document.querySelector(".main-container");

const toggleWorkoutNameContainer = document.getElementById(
  "toggle-workout-name-container"
);
const workoutNameContainer = document.querySelector(".create-workout-name");

toggleWorkoutNameContainer.addEventListener("click", () => {
  workoutNameContainer.classList.add("display-flex");
  overlay.classList.remove("display-none");
});

// ============ add name and display different setup in main container , show exercises list and workout name with edit btn for it ==
const days = document.querySelectorAll(".day");

const workoutNameInput = document.getElementById("workout-input-name");
const workoutCreateBtn = document.querySelector(".add-workout-name");
const workoutEditBtn = document.querySelector(".edit-workout-name");
const workoutNameAlert = document.querySelector(".workout-name-alert");

workoutCreateBtn.addEventListener("click", () => {
  if (workoutNameInput.value.length === 0) {
    showAlert(workoutNameAlert);
  } else {
    console.log("hello");
  }
});

// ========displaying the exercices we have inside the exercises list container

const exercicesListContainer = document.querySelector(
  ".exercises-list-container"
);
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

// ========== display workouts =====================

{
  /* <div class="one-workout">
      <i class="fa-solid fa-list" id="show-program" data-execises="s"></i>
      <p class="workout-name">split bros</p>
      <div class="tools">
        <i
          class="fa-solid fa-trash"
          id="delete-workout"
          data-delete="workout-index"
        ></i>
        <i
          class="fa-solid fa-user-pen"
          id="manage-workout"
          data-manage="workout-index"
        ></i>
      </div>
    </div>  */
}
