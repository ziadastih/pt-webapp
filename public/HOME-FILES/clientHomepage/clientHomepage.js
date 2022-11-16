// ==================get id from local storage ================

const clientId = localStorage.getItem("cref");

// ===============client name and displaying the general coach info ========
const clientName = document.querySelector(".client-name");
const coachEmailBtn = document.querySelector("#email-icon");
const coachWhatsappBtn = document.querySelector("#whatsapp-icon");

// ==============get client and get coached by function ==============

const getClient = async () => {
  try {
    const {
      data: { client },
    } = await axios.get(`/api/v1/client/${clientId}`);

    const clientFirstName = client.clientFirstName;
    const clientLastName = client.clientLastName;
    const coachId = client.createdBy;

    const {
      data: { coach },
    } = await axios.get(`/api/v1/coach/${coachId}`);

    const coachEmail = coach.email;
    const coachNumber = coach.number;

    clientName.innerHTML = `${clientFirstName} ${clientLastName}`;

    coachEmailBtn.href = `mailto:${coachEmail}`;
    clientName.classList.add("show-opacity");

    if (coachNumber) {
      coachWhatsappBtn.href = `https://wa.me/${coachNumber}`;
    }
  } catch (error) {
    console.log(error);
  }
};

getClient();

// =============dashboard update  =========================
const progressCircle = document.querySelector(".circular-progress");
const totalCalories = document.querySelector(".total-calories");
const currentCalories = document.querySelector(".current-calories");
const carbsValue = document.querySelector(".carbs-value");
const carbsProgressBar = document.querySelector("#carbs-bar");
const proteinValue = document.querySelector(".protein-value");
const proteinBar = document.querySelector("#protein-bar");
const fatValue = document.querySelector(".fat-value");
const fatBar = document.querySelector("#fat-bar");
const workoutValue = document.querySelector(".workout-value");
const workoutsBr = document.querySelector("#workout-bar");
const getDailyMacros = async () => {
  try {
    const dailyMacros = await axios.get(`/api/v1/dailyMacros/${clientId}`);

    let maxCalories = parseFloat(
      dailyMacros.data.dailyMacros.totalMacros.calories
    );
    let maxProt = parseFloat(dailyMacros.data.dailyMacros.totalMacros.protein);
    let maxCarbs = parseFloat(dailyMacros.data.dailyMacros.totalMacros.carbs);
    let maxFat = parseFloat(dailyMacros.data.dailyMacros.totalMacros.fat);
    let maxWorkouts = dailyMacros.data.dailyMacros.totalWorkouts;

    let currentCal = dailyMacros.data.dailyMacros.currentMacros.calories;
    let currentCarbs = dailyMacros.data.dailyMacros.currentMacros.carbs;
    let currentProt = dailyMacros.data.dailyMacros.currentMacros.prot;
    let currentFat = dailyMacros.data.dailyMacros.currentMacros.fat;
    let currentWorkouts = dailyMacros.data.dailyMacros.currentWorkouts;
    totalCalories.textContent = `${maxCalories} kcal`;
    currentCalories.textContent = `${currentCal}`;

    carbsValue.textContent = `${currentCarbs} / ${maxCarbs}g`;
    proteinValue.textContent = `${currentProt} / ${maxProt}g`;
    fatValue.textContent = `${currentFat} / ${maxFat}g`;
    workoutValue.textContent = `${currentWorkouts} / ${maxWorkouts}`;
    if (maxCalories > 0) {
      let circleDeg = parseFloat((currentCal * 100) / maxCalories) * 3.6;
      progressCircle.style.background = `conic-gradient(var(--blue) ${circleDeg}deg, var(--white) 0deg)`;
    }
    let carbsWidth = ((currentCarbs * 100) / maxCarbs) * 1.5;
    let protWidth = ((currentProt * 100) / maxProt) * 1.5;
    let fatWidth = ((currentFat * 100) / maxFat) * 1.5;
    let workoutWidth = ((currentWorkouts * 100) / maxWorkouts) * 1.5;
    carbsProgressBar.style.width = `${carbsWidth}px`;
    proteinBar.style.width = `${protWidth}px`;
    fatBar.style.width = `${fatWidth}px`;
    workoutsBr.style.width = `${workoutWidth}px`;
  } catch (error) {
    let msg = `no dailyMacros with id ${clientId}`;
    if (msg === error.response.data.msg) {
      const dailyMacros = await axios.post(`/api/v1/dailyMacros`, {
        createdFor: clientId,
      });
    } else {
      return;
    }
  }
};
getDailyMacros();

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

// ===================client access boxes  ============
const accessProgramsBtn = document.querySelector(".access-workouts");
const accessNutritionBtn = document.querySelector(".access-diet");

accessProgramsBtn.addEventListener("click", () => {
  window.location = `http://192.168.1.195:3000/clientProgram/clientProgram.html`;
});

accessNutritionBtn.addEventListener("click", () => {
  window.location = `http://192.168.1.195:3000/clientNutrition/clientNutrition.html`;
});
