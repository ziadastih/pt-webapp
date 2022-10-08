const exercisesArray = [
  {
    name: "Seated Alternating Hammer Curls",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Rotating Alternate Incline Bicep Curls",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Alternating Deltoid Raise",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Standing Alternate Rotating Bicep Curls ",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Alternating Dumbbell Floor Press ",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Alternating Dumbbell Floor Press ",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Alternating Front Raise",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Alternating Preacher Curl",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Seated Arnold Press",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Seated Arnold Press",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Around The Worlds",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Bent-Arm Dumbbell Pullover",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Standing Rear Delt Flyes Head Against Bench",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Dumbbell Bent Over Rows",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Dumbbell Bent Over Rows",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Dumbbell Bent Over Rows Neutral Grip",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
  {
    name: "Car Drivers",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "video url",
    selected: false,
  },
];
const selectedExercisesArray = [];
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
const workoutEditIcon = document.querySelector(".edit-workout-name-icon");
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

const searchInput = document.querySelector(".search-input");

// ===============main container btns  selectors ======================
const mainContainerBtns = document.querySelector(".main-container-btns");
const toggleExercisesList = document.querySelector(".toggle-exercises-list");
const submitWorkout = document.querySelector(".submit-workout");
const submitProgram = document.querySelector(".submit-Program");
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

workoutEditIcon.addEventListener("click", () => {
  workoutNameContainer.classList.add("display-flex");
  workoutCreateBtn.classList.add("display-none");
  workoutEditBtn.classList.add("display-flex");
  workoutNameInput.value = workoutNameHeader.textContent;
  overlay.classList.remove("display-none");
});

workoutEditBtn.addEventListener("click", () => {
  setupWorkoutName();
});
// ============ add name and display different setup in main container , show exercises list and workout name with edit btn for it ==

workoutCreateBtn.addEventListener("click", () => {
  setupWorkoutName();
});

// =================toggle the exercises list  ======================================

toggleExercisesList.addEventListener("click", () => {
  addExercicesContainer.classList.add("display-flex");
  overlay.classList.remove("display-none");
});
searchInput.addEventListener("input", () => {
  liveSearch();
});

// ========displaying the exercices we have inside the exercises list container

const displayExercicesArray = () => {
  for (let i = 0; i < exercisesArray.length; i++) {
    if (exercisesArray[i].selected === false) {
      exercicesListContainer.innerHTML += `<div class="exercise-content">
    <span class="check-box" data-exercise =${i}
      ><i class="fa-solid fa-check" id="check-icon"></i
    ></span>
    <img
      src=${exercisesArray[i].img}
      class="exercise-img"
      alt=""
    />
    <p class="exercise-name">${exercisesArray[i].name}</p>
  </div>`;
    } else {
      exercicesListContainer.innerHTML += `<div class="exercise-content">
  <span class="check-box change-check-box-background" data-exercise =${i}
    ><i class="fa-solid fa-check show-opacity " id="check-icon"></i
  ></span>
  <img
    src=${exercisesArray[i].img}
    class="exercise-img"
    alt=""
  />
  <p class="exercise-name">${exercisesArray[i].name}</p>
</div>`;
    }
  }
  // ===================managing the checkbox and pushing or removing the exercises to selected exercises array
  const checkbox = document.querySelectorAll(".check-box");
  checkbox.forEach((box) => {
    box.addEventListener("click", (e) => {
      let exerciseIndex = box.dataset.exercise;
      console.log(exerciseIndex);
      box.classList.toggle("change-check-box-background");
      if (exercisesArray[exerciseIndex].selected === false) {
        exercisesArray[exerciseIndex].selected = true;
        selectedExercisesArray.push(exercisesArray[exerciseIndex]);
        console.log(selectedExercisesArray);
      } else {
        exercisesArray[exerciseIndex].selected = false;
        const index = selectedExercisesArray.findIndex((Element) => {
          return Element.name === exercisesArray[exerciseIndex].name;
        });
        if (index !== -1) {
          selectedExercisesArray.splice(index, 1);
          console.log(selectedExercisesArray);
        }
      }
    });
  });
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

// ===================live search for exercises  ====================

const liveSearch = () => {
  const exerciceContent = document.querySelectorAll(".exercise-content");
  let inputCharacter = searchInput.value.toUpperCase();

  exerciceContent.forEach((exercise) => {
    // ============show all item when input is empty again
    if (searchInput === "") {
      exercise.classList.remove("display-none");
    }
    // ==========search by charachter, display the ones that match,remove the ones that doesnt match================
    if (exercise.textContent.toUpperCase().includes(inputCharacter)) {
      exercise.classList.remove("display-none");
    } else if (!exercise.textContent.toUpperCase().includes(inputCharacter)) {
      exercise.classList.add("display-none");
    }
  });
};
