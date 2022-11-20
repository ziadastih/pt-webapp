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
const createdWorkoutsContainer = document.querySelector(".created-workouts");
const dayValue = document.querySelector(".day-value");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
// ============================get current workout ================
const getWorkout = async () => {
  const { data } = await axios.get(
    `/api/v1/workoutProgram?current=${clientId}`
  );
  dayValue.textContent = daysArr[number];
  program = data.workoutProgram[0];
  displayWorkouts(number);

  // ==============next btn ================
  nextBtn.addEventListener("click", () => {
    number++;
    dayValue.textContent = daysArr[number];
    displayWorkouts(number);
    prevBtn.classList.remove("remove-opacity");
    if (number === daysArr.length - 1) {
      nextBtn.classList.add("remove-opacity");
    }
  });

  // =============prev btn  ====================
  prevBtn.addEventListener("click", () => {
    number--;
    dayValue.textContent = daysArr[number];
    displayWorkouts(number);
    nextBtn.classList.remove("remove-opacity");
    if (number === 0) {
      prevBtn.classList.add("remove-opacity");
    }
  });
};
getWorkout();

// =========================display-workouts  ============

const displayWorkouts = (number) => {
  let workouts = program.weeks[0].days[number].workouts;

  createdWorkoutsContainer.innerHTML = "";

  for (let i = 0; i < workouts.length; i++) {
    if (workouts[i].name === "rest day" || workouts.length === 0) {
      createdWorkoutsContainer.innerHTML = ` <div class="one-workout">
        <i class="fa-solid fa-dumbbell"></i>
  <p class="workout-name">rest day</p>
  <i class="fa-solid fa-battery-full" id="battery-icon"></i>
  
  </div>`;
    } else {
      createdWorkoutsContainer.innerHTML += ` <div class="one-workout">
        <i class="fa-solid fa-dumbbell"></i>
    <p class="workout-name">${workouts[i].name}</p>
    <span class='select'>${workouts[i].exercises.length} ex</span>
    
  </div>  `;
    }
  }
};

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
