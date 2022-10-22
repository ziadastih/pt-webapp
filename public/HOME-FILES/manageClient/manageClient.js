// ==================get id from local storage ================
const coachId = localStorage.getItem("ref");
const clientId = localStorage.getItem("cref");

// ===============coach name and displaying the general coach info ========
const clientName = document.querySelector(".client-name");
const clientProfile = document.querySelector(".profile-pic");
const createdAt = document.querySelector(".created-at");
const disableBtn = document.querySelector(".disable-btn");
const clientEmailBtn = document.querySelector("#email-icon");
const clientWhatsappBtn = document.querySelector("#whatsapp-icon");
const getClient = async () => {
  try {
    const {
      data: { client },
    } = await axios.get(`/api/v1/client/${clientId}`);
    console.log(client);
    const firstName = client.clientFirstName;
    const lastName = client.clientLastName;
    const created = client.createdAt.slice(0, 10);
    const enabled = client.enabled;
    const clientNumber = client.number;
    const email = client.email;

    clientProfile.textContent = `${firstName.slice(0, 1).toUpperCase()}`;
    clientName.innerHTML = `${firstName} ${lastName}`;
    createdAt.innerHTML = `created at: ${created}`;
    clientName.classList.add("opacity-one");
    clientWhatsappBtn.href = "https://wa.me/96170608758";
    if (enabled === true) {
      disableBtn.textContent = "disable";
    } else {
      disableBtn.textContent = "enable";
    }
  } catch (error) {
    console.log(error);
  }
};

getClient();

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
const myWorkoutsBtn = document.querySelector(".access-workouts");

myWorkoutsBtn.addEventListener("click", () => {
  localStorage.setItem("wL", workoutProgramNumberStat.textContent);
  window.location =
    "http://192.168.1.195:3000/MyWorkoutsPrograms/myWorkouts.html";
});

// =======================nutrition event listener =======
const myNutritionBtn = document.querySelector(".access-diet");

myNutritionBtn.addEventListener("click", () => {
  localStorage.setItem("dL", dietNumberStat.textContent);
  window.location = "http://192.168.1.195:3000/MyNutrition/myNutrition.html";
});

// ================logout user ===================

const logoutBtn = document.getElementById("user-logout-nav-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await axios.post("/api/v1/auth/logout");
    localStorage.clear();
    window.location = "http://192.168.1.195:3000/";
  } catch (error) {
    console.log(error);
  }
});
