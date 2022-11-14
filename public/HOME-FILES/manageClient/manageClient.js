// ==================get id from local storage ================
const coachId = localStorage.getItem("ref");
const clientId = localStorage.getItem("cref");
// ===============coach name and displaying the general coach info ========
const clientName = document.querySelector(".client-name");

const disableBtn = document.querySelector(".disable-btn");
const clientEmailBtn = document.querySelector("#email-icon");
const clientWhatsappBtn = document.querySelector("#whatsapp-icon");

// =========================fetch client  ====================
const getClient = async () => {
  try {
    const {
      data: { client },
    } = await axios.get(`/api/v1/client/${clientId}`);

    const firstName = client.clientFirstName;
    const lastName = client.clientLastName;
    const enabled = client.enabled;
    const clientNumber = client.number;
    const email = client.email;

    clientName.innerHTML = `${firstName} ${lastName}`;

    clientName.classList.add("opacity-one");

    if (enabled === true) {
      disableBtn.textContent = "disable";
    } else {
      disableBtn.textContent = "enable";
    }

    clientEmailBtn.href = `mailto:${email}`;

    if (clientNumber) {
      clientWhatsappBtn.href = `https://wa.me/${clientNumber}`;
    } else {
      console.log("no number");
    }
  } catch (error) {
    console.log(error);
  }
};

getClient();

// =========================selecting the daashboard  =======

const progressCircle = document.querySelector(".circular-progress");
const totalCalories = document.querySelector(".total-calories");
const currentCalories = document.querySelector(".current-calories");
const carbsValue = document.querySelector(".carbs-value");
const carbsProgressBar = document.querySelector("#carbs-bar");
const proteinValue = document.querySelector(".protein-value");
const proteinBar = document.querySelector("#protein-bar");
const fatValue = document.querySelector(".fat-value");
const fatBar = document.querySelector("#fat-bar");

const getDailyMacros = async () => {
  try {
    const dailyMacros = await axios.get(`/api/v1/dailyMacros/${clientId}`);
    console.log(dailyMacros);
    let maxCalories = parseFloat(
      dailyMacros.data.dailyMacros.totalMacros.calories
    );
    let maxProt = parseFloat(dailyMacros.data.dailyMacros.totalMacros.protein);
    let maxCarbs = parseFloat(dailyMacros.data.dailyMacros.totalMacros.carbs);
    let maxFat = parseFloat(dailyMacros.data.dailyMacros.totalMacros.fat);

    let currentCal = dailyMacros.data.dailyMacros.currentMacros.calories;
    let currentCarbs = dailyMacros.data.dailyMacros.currentMacros.carbs;
    let currentProt = dailyMacros.data.dailyMacros.currentMacros.prot;
    let currentFat = dailyMacros.data.dailyMacros.currentMacros.fat;

    totalCalories.textContent = `${maxCalories} kcal`;
    currentCalories.textContent = `${currentCal}`;

    carbsValue.textContent = `${currentCarbs} / ${maxCarbs}g`;
    proteinValue.textContent = `${currentProt} / ${maxProt}g`;
    fatValue.textContent = `${currentFat} / ${maxFat}g`;
    if (maxCalories > 0) {
      let circleDeg = parseFloat((currentCal * 100) / maxCalories) * 3.6;
      progressCircle.style.background = `conic-gradient(var(--blue) ${circleDeg}deg, var(--white) 0deg)`;
    }
    let carbsWidth = ((currentCarbs * 100) / maxCarbs) * 1.5;
    let protWidth = ((currentProt * 100) / maxProt) * 1.5;
    let fatWidth = ((currentFat * 100) / maxFat) * 1.5;

    carbsProgressBar.style.width = `${carbsWidth}px`;
    proteinBar.style.width = `${protWidth}px`;
    fatBar.style.width = `${fatWidth}px`;
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
// ==============back btn ============================
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  window.location = "http://192.168.1.195:3000/MyClients/MyClients.html";
});

// ==========disable btn  =====================
disableBtn.addEventListener("click", async () => {
  if (disableBtn.textContent === "disable") {
    disableBtn.textContent = "enable";
    const { data } = await axios.patch(`/api/v1/client/${clientId}`, {
      enabled: false,
    });
  } else {
    disableBtn.textContent = "disable";
    const { data } = await axios.patch(`/api/v1/client/${clientId}`, {
      enabled: true,
    });
  }
});

// =================== programs event listener ==========
const clientProgramsBtn = document.querySelector(".access-workouts");

clientProgramsBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/manageClientPrograms/manageClientPrograms.html";
});

// =======================nutrition event listener =======
const clientNutritionBtn = document.querySelector(".access-diet");

clientNutritionBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/manageClientNutrition/manageClientNutrition.html";
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
