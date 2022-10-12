const exercisesArray = [
  {
    name: "Seated Alternating Hammer Curls",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "https://www.youtube.com/embed/AFWRIzDA5zI",
    selected: false,
  },
  {
    name: "Rotating Alternate Incline Bicep Curls",
    img: "../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg",
    video: "https://www.youtube.com/embed/KM5Y9GBTcyU",
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
let selectedExercisesArray = [];
// =====program schema array , it has name, weeks,by default we will set one week , with 7 days
const program = {
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
};

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
const createdWorkoutsContainer = document.querySelector(".created-workouts");
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
const submitProgram = document.querySelector("#submit-program");
const setAsRestDayBtn = document.getElementById("set-as-rest-day");
const editWorkout = document.querySelector(".edit-workout-btn");
// ===============note container ==============
const noteContainer = document.querySelector(".note-box");
const noteInput = document.querySelector(".note-input");
const noteSubmit = document.querySelector(".note-submit");

// ============================iframe  ==============================
const iframeContainer = document.querySelector(".iframe-container");
const iframe = document.querySelector(".iframe");

// ============================= days ==========================
const daysBtn = document.querySelectorAll(".day");

// ============================refreshing page alert =====================

window.onbeforeunload = () => {
  return "are you sure you want to leave page";
};

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

submitProgram.addEventListener("click", async () => {
  console.log(program);
  const Program = await axios.post("/api/v1/workoutProgram", {
    name: program.name,
    weeks: program.weeks,
  });
  window.onbeforeunload = null;
  window.location = "http://localhost:3000/MyWorkoutsPrograms/myWorkouts.html";
});

daysBtn.forEach((day) => {
  day.addEventListener("click", () => {
    let dayIndex = day.dataset.day;
    createdWorkoutsContainer.innerHTML = "";

    if (selectedExercisesArray.length > 0) {
      alert("Please submit your workout before moving to a new day");
    } else {
      displayWorkouts(dayIndex);
      daysBtn.forEach((subDay) => {
        if (subDay === day) {
          subDay.classList.add("chosen-day");
        } else {
          subDay.classList.remove("chosen-day");
        }
      });
    }
  });
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
    iframe.src = "";
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
  workoutCreateBtn.classList.remove("display-none");
  workoutEditBtn.classList.remove("display-flex");
  workoutNameInput.value = "";
});
// ============ add name and display different setup in main container , show exercises list and workout name with edit btn for it ==

workoutCreateBtn.addEventListener("click", () => {
  setupWorkoutName();
  workoutNameInput.value = "";
});

// ===========================submit workout  ================

submitWorkout.addEventListener("click", () => {
  submitWorkoutFunction();
});
editWorkout.addEventListener("click", () => {
  editWorkoutFunction();
});

setAsRestDayBtn.addEventListener("click", () => {
  setAsRestDayFunction();
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
    submitProgram.classList.add("display-none");
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
    displayExercicesArray(exercisesArray);
    createdWorkoutsContainer.classList.add("display-none");
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

      if (exerciseIndex == selectedExercisesArray.length - 1) {
        alert("This is your last exercise you can't chain it");
      } else {
        if (btn.classList.contains("selected-type")) {
          btn.classList.remove("selected-type");
          selectedExercisesArray[exerciseIndex].chain = false;
          displayChosenExercises();
        } else {
          selectedExercisesArray[exerciseIndex].chain = true;
          displayChosenExercises();
        }
      }
    });
  });
  // =============rest pause btn ====================================
  const restPauseBtn = document.querySelectorAll("#rest-pause");
  restPauseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let exerciseIndex = e.target.dataset.type;
      if (!btn.classList.contains("selected-type")) {
        btn.classList.add("selected-type");
        selectedExercisesArray[exerciseIndex].type = btn.textContent;

        let dropset = e.target.nextElementSibling;
        dropset.classList.remove("selected-type");
      } else {
        btn.classList.remove("selected-type");
        selectedExercisesArray[exerciseIndex].type = "";
      }
    });
  });
  // ===================dropsetBtn =====================
  const dropsetBtn = document.querySelectorAll("#dropset");
  dropsetBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let exerciseIndex = e.target.dataset.type;
      if (!btn.classList.contains("selected-type")) {
        btn.classList.add("selected-type");
        selectedExercisesArray[exerciseIndex].type = btn.textContent;

        let dropset = e.target.previousElementSibling;
        dropset.classList.remove("selected-type");
      } else {
        btn.classList.remove("selected-type");
        selectedExercisesArray[exerciseIndex].type = "";
      }
    });
  });
  // ===================delete chosen exercise  ===============
  const deleteExerciseBtns = document.querySelectorAll("#delete-exercise");

  deleteExerciseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let name = btn.dataset.delete;

      const indexInSelectedArray = selectedExercisesArray.findIndex(
        (Element) => {
          return Element.name === name;
        }
      );

      if (indexInSelectedArray !== -1) {
        selectedExercisesArray.splice(indexInSelectedArray, 1);
        displayChosenExercises();
        const indexInExercisesArray = exercisesArray.findIndex((Element) => {
          return Element.name === name;
        });

        if (indexInExercisesArray !== -1) {
          exercisesArray[indexInExercisesArray].selected = false;
        }
      }
    });
  });

  // ==================================== noteIcons  for each ============================
  const noteIcons = document.querySelectorAll("#note");

  noteIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      // =============get note index and the set a new btn to give it the index we want to get the right note

      const noteIndex = e.target.dataset.note;
      overlay.classList.remove("display-none");
      noteContainer.classList.add("display-flex");
      noteInput.value = "";
      noteInput.value = selectedExercisesArray[noteIndex].note;
      noteSubmit.innerHTML = "";
      noteSubmit.innerHTML = `<button class="submit-note btn" data-submit=${noteIndex}>submit</button>`;

      // ==============submit btn note get the submit note on click ==========================
      const submitNoteBtn = document.querySelector(".submit-note");
      submitNoteBtn.addEventListener("click", (e) => {
        let submitIndex = e.target.dataset.submit;
        selectedExercisesArray[submitIndex].note = noteInput.value;
        overlay.classList.add("display-none");
        noteContainer.classList.remove("display-flex");
        noteInput.value = "";
      });
    });
  });

  // =============================eye icons =========================================

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

// ==============chosen exercises if conditions  =========
const standardChosen = (exercise, i) => {
  chosenExercisesContainer.innerHTML += `<div class="one-exercise-container">
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
      <i class="fa-solid fa-note-sticky" id="note" data-note=${i}></i>
      <i class="fa-regular fa-eye" id="toggle-video" data-video = ${exercise.video}></i>
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
      <i class="fa-solid fa-note-sticky" id="note" data-note=${i}></i>
      <i class="fa-regular fa-eye" id="toggle-video" data-video = ${exercise.video}></i>
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
      <i class="fa-solid fa-note-sticky" id="note" data-note=${i}></i>
      <i class="fa-regular fa-eye" id="toggle-video" data-video = ${exercise.video}></i>
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
      <i class="fa-solid fa-note-sticky" id="note" data-note=${i}></i>
      <i class="fa-regular fa-eye" id="toggle-video" data-video = ${exercise.video}></i>
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
      <i class="fa-solid fa-note-sticky" id="note" data-note=${i}></i>
      <i class="fa-regular fa-eye" id="toggle-video" data-video = ${exercise.video}></i>
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
      <i class="fa-solid fa-note-sticky" id="note" data-note=${i}></i>
      <i class="fa-regular fa-eye" id="toggle-video" data-video = ${exercise.video}></i>
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
// ================end of chosen exercises ===============

// ==================display workout  ==================
const displayWorkouts = (index) => {
  let workouts = program.weeks[0].days[index].workouts;
  submitProgram.classList.remove("display-none");
  createdWorkoutsContainer.innerHTML = "";
  if (workouts.length === 0) {
    setAsRestDayBtn.classList.remove("display-none");
    submitProgram.classList.add("display-none");
  } else {
    setAsRestDayBtn.classList.add("display-none");
    workoutHeader.classList.remove("display-flex");
    mainContainerBtns.classList.remove("display-flex");
    createWorkoutBtnContainer.classList.remove("display-none");
    createdWorkoutsContainer.classList.remove("display-none");

    for (let i = 0; i < workouts.length; i++) {
      createdWorkoutsContainer.innerHTML += ` <div class="one-workout">
    <i class="fa-solid fa-list" id="show-exercises" data-execises=${i}></i>
    <p class="workout-name">${workouts[i].name}</p>
    <div class="tools">
      <i
        class="fa-solid fa-trash"
        id="delete-workout"
        data-delete=${i}
      ></i>
      <i
        class="fa-solid fa-user-pen"
        id="edit-workout"
        data-edit=${i}
      ></i>
    </div>
  </div>  `;
    }
    // ==============================delete workouts  =================
    const deleteWorkoutBtns = document.querySelectorAll("#delete-workout");
    deleteWorkoutBtns.forEach((btn) => {
      let workoutIndex = btn.dataset.delete;
      btn.addEventListener("click", () => {
        daysBtn.forEach((day) => {
          if (day.classList.contains("chosen-day")) {
            let dayIndex = day.dataset.day;

            let workout = program.weeks[0].days[dayIndex].workouts;
            workout.splice(workoutIndex, 1);
            displayWorkouts(dayIndex);
          }
        });
      });
    });
    // =============================== edit workouts  ===============================
    const editWorkoutBtns = document.querySelectorAll("#edit-workout");
    editWorkoutBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", () => {
        let workoutIndex = editBtn.dataset.edit;
        localStorage.setItem("workoutIndex", JSON.stringify(workoutIndex));
        daysBtn.forEach((day) => {
          if (day.classList.contains("chosen-day")) {
            let dayIndex = day.dataset.day;
            selectedExercisesArray =
              program.weeks[0].days[dayIndex].workouts[workoutIndex].exercises;
            workoutNameHeader.textContent =
              program.weeks[0].days[dayIndex].workouts[workoutIndex].name;
            console.log(selectedExercisesArray);

            displayChosenExercises();
            changeSelectedToTrue();
            console.log(exercisesArray);
            workoutHeader.classList.add("display-flex");
            createWorkoutBtnContainer.classList.add("display-none");
            createdWorkoutsContainer.classList.add("display-none");
            mainContainerBtns.classList.add("display-flex");
            submitWorkout.classList.add("display-none");
            editWorkout.classList.remove("display-none");
          }
        });
      });
    });
  }
};

const submitWorkoutFunction = () => {
  daysBtn.forEach((day) => {
    if (day.classList.contains("chosen-day")) {
      let dayIndex = day.dataset.day;
      let workouts = program.weeks[0].days[dayIndex].workouts;

      let workoutName = workoutNameHeader.textContent;

      workouts.push({
        name: workoutName,
        exercises: selectedExercisesArray,
      });

      selectedExercisesArray = [];

      for (let i = 0; i < exercisesArray.length; i++) {
        if (exercisesArray[i].selected === true) {
          exercisesArray[i].selected = false;
        }
      }
      displayChosenExercises();
      displayExercicesArray(exercisesArray);
      displayWorkouts(dayIndex);
    }
  });
};

// ====================set conditions for displaying workouts if rest day is true then manage stuff======

const changeSelectedToTrue = () => {
  for (let i = 0; i < selectedExercisesArray.length; i++) {
    const index = exercisesArray.findIndex((Element) => {
      return Element.name === selectedExercisesArray[i].name;
    });

    if (index !== -1) {
      exercisesArray[index].selected = true;
    } else {
      console.log("false");
    }
  }
};

const editWorkoutFunction = () => {
  const workoutIndex = JSON.parse(localStorage.getItem("workoutIndex"));
  editWorkout.classList.add("display-none");
  submitWorkout.classList.remove("display-none");
  daysBtn.forEach((day) => {
    if (day.classList.contains("chosen-day")) {
      let dayIndex = day.dataset.day;
      let workout = program.weeks[0].days[dayIndex].workouts[workoutIndex];

      let workoutName = workoutNameHeader.textContent;

      workout.name = workoutName;
      [workout.exercises] = [selectedExercisesArray];
      console.log(workout);
      localStorage.removeItem("workoutIndex");
      selectedExercisesArray = [];

      for (let i = 0; i < exercisesArray.length; i++) {
        if (exercisesArray[i].selected === true) {
          exercisesArray[i].selected = false;
        }
      }
      displayChosenExercises();
      displayExercicesArray(exercisesArray);
      displayWorkouts(dayIndex);
    }
  });
};
