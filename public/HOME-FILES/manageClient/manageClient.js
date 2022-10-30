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

// =========================fetch client  ====================
const getClient = async () => {
  try {
    const {
      data: { client },
    } = await axios.get(`/api/v1/client/${clientId}`);

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

// ==============back btn ============================
const backBtn = document.querySelector(".back-btn");

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
