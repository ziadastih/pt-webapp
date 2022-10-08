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
const addExercicesBtn = document.getElementById("add-exercises");
const chosenExercisesContainer = document.querySelector(
  ".chosen-exercises-container"
);
const toggleCreateNewName = document.getElementById("toggle-new-exercise-name");
const newExerciseNameContainer = document.querySelector(
  ".create-new-exercise-container"
);
const exerciseNameInput = document.getElementById("exercise-input-name");
const exerciseNameAlert = document.querySelector(".exercise-name-alert");
const createExerciseNameBtn = document.querySelector(".create-exercise-name");

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
  displayExercicesArray(exercisesArray);
});

// =================toggle the exercises list  ======================================

toggleExercisesList.addEventListener("click", () => {
  addExercicesContainer.classList.add("display-flex");
  overlay.classList.remove("display-none");
  displayExercicesArray(exercisesArray);
});
searchInput.addEventListener("input", () => {
  liveSearch();
});
addExercicesBtn.addEventListener("click", () => {
  overlay.classList.add("display-none");
  addExercicesContainer.classList.remove("display-flex");
  displayChosenExercises();
});
toggleCreateNewName.addEventListener("click", () => {
  newExerciseNameContainer.classList.add("display-flex");
  addExercicesContainer.classList.remove("display-flex");
});

createExerciseNameBtn.addEventListener("click", () => {
  if (exerciseNameInput.value.length === 0) {
    showAlert(exerciseNameAlert);
  } else {
    selectedExercisesArray.push({
      name: exerciseNameInput.value,
      img: "../images/black-img.jpg",
      video: "none",
      note: "",
      rep: "",
      set: "",
      tempo: "",
      chain: false,
      type: "",
      rest: "",
    });
    newExerciseNameContainer.classList.remove("display-flex");
    addExercicesContainer.classList.add("display-flex");
    console.log(selectedExercisesArray);
  }
});

// ========displaying the exercices we have inside the exercises list container

const displayExercicesArray = (arr) => {
  exercicesListContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].selected === false) {
      exercicesListContainer.innerHTML += `<div class="exercise-content">
    <span class="check-box" data-exercise =${i}
      ><i class="fa-solid fa-check" id="check-icon"></i
    ></span>
    <img
      src=${arr[i].img}
      class="exercise-img"
      alt=""
    />
    <p class="exercise-name">${arr[i].name}</p>
  </div>`;
    } else {
      exercicesListContainer.innerHTML += `<div class="exercise-content">
  <span class="check-box change-check-box-background" data-exercise =${i}
    ><i class="fa-solid fa-check" id="check-icon"></i
  ></span>
  <img
    src=${arr[i].img}
    class="exercise-img"
    alt=""
  />
  <p class="exercise-name">${arr[i].name}</p>
</div>`;
    }
  }
  // ===================managing the checkbox and pushing or removing the exercises to selected exercises array
  const checkbox = document.querySelectorAll(".check-box");
  checkbox.forEach((box) => {
    box.addEventListener("click", (e) => {
      let exerciseIndex = box.dataset.exercise;

      box.classList.toggle("change-check-box-background");
      if (arr[exerciseIndex].selected === false) {
        arr[exerciseIndex].selected = true;
        let selectedExercise = arr[exerciseIndex];
        selectedExercisesArray.push({
          name: selectedExercise.name,
          img: selectedExercise.img,
          video: selectedExercise.video,
          note: "",
          rep: "",
          set: "",
          tempo: "",
          chain: false,
          type: "",
          rest: "",
        });
      } else {
        arr[exerciseIndex].selected = false;
        const index = selectedExercisesArray.findIndex((Element) => {
          return Element.name === arr[exerciseIndex].name;
        });
        if (index !== -1) {
          selectedExercisesArray.splice(index, 1);
        }
      }
    });
  });
};

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

// ==================display chosen exercises set them into container and set the data ===========

const displayChosenExercises = () => {
  chosenExercisesContainer.innerHTML = "";
  // =================conditions for displaying items  ==================
  for (let i = 0; i < selectedExercisesArray.length; i++) {
    let exercise = selectedExercisesArray[i];
    if (exercise.type === "" && exercise.chain === false) {
      standardChosen(exercise, i);
    } else if (exercise.type === "rest-pause" && exercise.chain === true) {
      chosenRpSuperset(exercise, i);
    } else if (exercise.type === "dropset" && exercise.chain === true) {
      chosenDsSuperset(exercise, i);
    } else if (exercise.chain === true) {
      chosenSuperset(exercise, i);
    } else if (exercise.type === "rest-pause") {
      chosenTypeRestPause(exercise, i);
    } else if (exercise.type === "dropset") {
      chosenTypeDropset(exercise, i);
    }
  }

  // =============================set inputs  ================
  const setInputs = document.querySelectorAll("#sets-input");
  setInputs.forEach((setInput) => {
    setInput.addEventListener("input", (e) => {
      let exerciseIndex = e.target.dataset.input;
      selectedExercisesArray[exerciseIndex].set = setInput.value;
    });
  });
  // ===================reps inputs live update ========================
  const repInputs = document.querySelectorAll("#reps-input");
  repInputs.forEach((repInput) => {
    repInput.addEventListener("input", (e) => {
      let exerciseIndex = e.target.dataset.input;
      selectedExercisesArray[exerciseIndex].rep = repInput.value;
    });
  });
  // ========================rest inputs  ================
  const restInputs = document.querySelectorAll("#rest-input");
  restInputs.forEach((restInput) => {
    restInput.addEventListener("input", (e) => {
      let exerciseIndex = e.target.dataset.input;
      selectedExercisesArray[exerciseIndex].rest = restInput.value;
    });
  });
  // =================tempo inputs live update ==================
  const tempoInputs = document.querySelectorAll("#tempo-input");
  tempoInputs.forEach((tempoInput) => {
    tempoInput.addEventListener("input", (e) => {
      let exerciseIndex = e.target.dataset.input;
      selectedExercisesArray[exerciseIndex].tempo = tempoInput.value;
    });
  });
  // ===================chain btns =============================================
  const chainBtns = document.querySelectorAll("#chain");
  chainBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let exerciseIndex = e.target.dataset.chain;

      if (btn.classList.contains("selected-type")) {
        btn.classList.remove("selected-type");
        selectedExercisesArray[exerciseIndex].chain = false;
        displayChosenExercises();
      } else {
        selectedExercisesArray[exerciseIndex].chain = true;
        displayChosenExercises();
      }
    });
  });

  const restPauseBtn = document.querySelectorAll("#rest-pause");
  restPauseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let exerciseIndex = e.target.dataset.type;
      if (!btn.classList.contains("selected-type")) {
        btn.classList.add("selected-type");
        selectedExercisesArray[exerciseIndex].type = btn.textContent;
        console.log(selectedExercisesArray[exerciseIndex]);
        let dropset = e.target.nextElementSibling;
        dropset.classList.remove("selected-type");
      } else {
        btn.classList.remove("selected-type");
        selectedExercisesArray[exerciseIndex].type = "";
        console.log(selectedExercisesArray[exerciseIndex]);
      }
    });
  });
  const dropsetBtn = document.querySelectorAll("#dropset");
  dropsetBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let exerciseIndex = e.target.dataset.type;
      if (!btn.classList.contains("selected-type")) {
        btn.classList.add("selected-type");
        selectedExercisesArray[exerciseIndex].type = btn.textContent;
        console.log(selectedExercisesArray[exerciseIndex]);
        let dropset = e.target.previousElementSibling;
        dropset.classList.remove("selected-type");
      } else {
        btn.classList.remove("selected-type");
        selectedExercisesArray[exerciseIndex].type = "";
        console.log(selectedExercisesArray[exerciseIndex]);
      }
    });
  });

  const deleteExerciseBtns = document.querySelectorAll("#delete-exercise");

  deleteExerciseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let name = btn.dataset.delete;
      console.log(name);
      const indexInSelectedArray = selectedExercisesArray.findIndex(
        (Element) => {
          return Element.name === name;
        }
      );
      console.log(indexInSelectedArray);
      if (indexInSelectedArray !== -1) {
        selectedExercisesArray.splice(indexInSelectedArray, 1);
        displayChosenExercises();
        const indexInExercisesArray = exercisesArray.findIndex((Element) => {
          return Element.name === name;
        });
        console.log(indexInExercisesArray);
        if (indexInExercisesArray !== -1) {
          exercisesArray[indexInExercisesArray].selected = false;
        }
      }
    });
  });
};

const standardChosen = (exercise, i) => {
  chosenExercisesContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='light-span'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      <i class="fa-solid fa-note-sticky" id="note"></i>
      <i class="fa-regular fa-eye" data-video = ${exercise.video}></i>
      <i class="fa-solid fa-trash" id="delete-exercise" data-delete = "${exercise.name}"></i>
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <input type="text" id="sets-input" data-input =${i} placeholder="0" value="${exercise.set}" />
    </div>
    <div class="input-container">
      <p>rep:</p>
      <input type="text" id="reps-input" data-input =${i} placeholder="0 - 0" value="${exercise.rep}" />
    </div>
    <div class="input-container">
      <p>rest:</p>
      <input type="text" id="rest-input" data-input =${i} placeholder="0" value="${exercise.rest}" />
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <input type="text" id="tempo-input" data-input =${i} placeholder="0-0-0-0" value="${exercise.tempo}" />
    </div>
    <div class="button-type-container">
      <button class="full-btn" id="chain" data-chain = ${i}>chain</button>
      <button class="full-btn" id="rest-pause" data-type=${i}>rest-pause</button>
      <button class="full-btn" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};

const chosenSuperset = (exercise, i) => {
  chosenExercisesContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='light-span show-opacity'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      <i class="fa-solid fa-note-sticky" id="note"></i>
      <i class="fa-regular fa-eye" data-video = ${exercise.video}></i>
      <i class="fa-solid fa-trash" id="delete-exercise" data-delete = "${exercise.name}"></i>
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <input type="text" id="sets-input" data-input =${i} placeholder="0" value="${exercise.set}" />
    </div>
    <div class="input-container">
      <p>rep:</p>
      <input type="text" id="reps-input" data-input =${i} placeholder="0 - 0" value="${exercise.rep}" />
    </div>
    <div class="input-container">
      <p>rest:</p>
      <input type="text" id="rest-input" data-input =${i} placeholder="0" value="${exercise.rest}" />
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <input type="text" id="tempo-input" data-input =${i} placeholder="0-0-0-0" value="${exercise.tempo}" />
    </div>
    <div class="button-type-container">
      <button class="full-btn selected-type" id="chain" data-chain = ${i}>chain</button>
      <button class="full-btn" id="rest-pause" data-type=${i}>rest-pause</button>
      <button class="full-btn" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};

const chosenTypeRestPause = (exercise, i) => {
  chosenExercisesContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='light-span'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      <i class="fa-solid fa-note-sticky" id="note"></i>
      <i class="fa-regular fa-eye" data-video = ${exercise.video}></i>
      <i class="fa-solid fa-trash" id="delete-exercise" data-delete = "${exercise.name}"></i>
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <input type="text" id="sets-input" data-input =${i} placeholder="0" value="${exercise.set}" />
    </div>
    <div class="input-container">
      <p>rep:</p>
      <input type="text" id="reps-input" data-input =${i} placeholder="0 - 0" value="${exercise.rep}" />
    </div>
    <div class="input-container">
      <p>rest:</p>
      <input type="text" id="rest-input" data-input =${i} placeholder="0" value="${exercise.rest}" />
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <input type="text" id="tempo-input" data-input =${i} placeholder="0-0-0-0" value="${exercise.tempo}" />
    </div>
    <div class="button-type-container">
      <button class="full-btn" id="chain" data-chain = ${i}>chain</button>
      <button class="full-btn selected-type" id="rest-pause" data-type=${i}>rest-pause</button>
      <button class="full-btn" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};

const chosenTypeDropset = (exercise, i) => {
  chosenExercisesContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='light-span'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      <i class="fa-solid fa-note-sticky" id="note"></i>
      <i class="fa-regular fa-eye" data-video = ${exercise.video}></i>
      <i class="fa-solid fa-trash" id="delete-exercise" data-delete = "${exercise.name}"></i>
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <input type="text" id="sets-input" data-input =${i} placeholder="0" value="${exercise.set}" />
    </div>
    <div class="input-container">
      <p>rep:</p>
      <input type="text" id="reps-input" data-input =${i} placeholder="0 - 0" value="${exercise.rep}" />
    </div>
    <div class="input-container">
      <p>rest:</p>
      <input type="text" id="rest-input" data-input =${i} placeholder="0" value="${exercise.rest}" />
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <input type="text" id="tempo-input" data-input =${i} placeholder="0-0-0-0" value="${exercise.tempo}" />
    </div>
    <div class="button-type-container">
      <button class="full-btn" id="chain" data-chain = ${i}>chain</button>
      <button class="full-btn" id="rest-pause" data-type=${i}>rest-pause</button>
      <button class="full-btn selected-type" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};

const chosenRpSuperset = (exercise, i) => {
  chosenExercisesContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='light-span show-opacity'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      <i class="fa-solid fa-note-sticky" id="note"></i>
      <i class="fa-regular fa-eye" data-video = ${exercise.video}></i>
      <i class="fa-solid fa-trash" id="delete-exercise" data-delete = "${exercise.name}"></i>
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <input type="text" id="sets-input" data-input =${i} placeholder="0" value="${exercise.set}" />
    </div>
    <div class="input-container">
      <p>rep:</p>
      <input type="text" id="reps-input" data-input =${i} placeholder="0 - 0" value="${exercise.rep}" />
    </div>
    <div class="input-container">
      <p>rest:</p>
      <input type="text" id="rest-input" data-input =${i} placeholder="0" value="${exercise.rest}" />
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <input type="text" id="tempo-input" data-input =${i} placeholder="0-0-0-0" value="${exercise.tempo}" />
    </div>
    <div class="button-type-container">
      <button class="full-btn selected-type" id="chain" data-chain = ${i}>chain</button>
      <button class="full-btn selected-type" id="rest-pause" data-type=${i}>rest-pause</button>
      <button class="full-btn" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};

const chosenDsSuperset = (exercise, i) => {
  chosenExercisesContainer.innerHTML += `<div class="one-exercise-container">
  <span class ='light-span show-opacity'></span>
  <div class="container-top-section">
    <div class="exercise-general-info">
      <img
        src=${exercise.img}
        alt=""
      />
      <p class="chosen-exercise-name">${exercise.name}</p>
    </div>
    <div class="exercise-tools">
      <i class="fa-solid fa-note-sticky" id="note"></i>
      <i class="fa-regular fa-eye" data-video = ${exercise.video}></i>
      <i class="fa-solid fa-trash" id="delete-exercise" data-delete = "${exercise.name}"></i>
    </div>
  </div>
  <div class="exercise-stats-container">
    <div class="input-container">
      <p>set:</p>
      <input type="text" id="sets-input" data-input =${i} placeholder="0" value="${exercise.set}" />
    </div>
    <div class="input-container">
      <p>rep:</p>
      <input type="text" id="reps-input" data-input =${i} placeholder="0 - 0" value="${exercise.rep}" />
    </div>
    <div class="input-container">
      <p>rest:</p>
      <input type="text" id="rest-input" data-input =${i} placeholder="0" value="${exercise.rest}" />
    </div>
    <div class="input-container">
      <p>tempo:</p>
      <input type="text" id="tempo-input" data-input =${i} placeholder="0-0-0-0" value="${exercise.tempo}" />
    </div>
    <div class="button-type-container">
      <button class="full-btn selected-type" id="chain" data-chain = ${i}>chain</button>
      <button class="full-btn" id="rest-pause" data-type=${i}>rest-pause</button>
      <button class="full-btn selected-type" id="dropset" data-type=${i}>dropset</button>
    </div>
  </div>
</div>`;
};
