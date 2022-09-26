const btnContainer = document.querySelector(".btn-container");
const clientsGridContainer = document.querySelector(".clients-grid-container");
const searchCLientInput = document.getElementById("search-client-input");
// ===============getClients when page open and display them =======

const getClients = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get("/api/v1/client");
    //  =========if length is === 0 means no clients we want to display the create item =============
    const length = data.clientsInfo.length;
    if (length === 0) {
      btnContainer.classList.add("open-container");
    }
    //getting the array which is client =================
    let client = data.clientsInfo;
    clientsGridContainer.innerHTML = "";
    for (let i = 0; i < length; i++) {
      clientsGridContainer.innerHTML += ` <div class="client" data-id = ${client[i].clientId}}>
        <p class="client-full-name">${client[i].clientFirstName} ${client[i].clientLastName}</p>
        <div class="tools">
          <i class="fa-solid fa-trash" data-delete = ${client[i].clientId}></i>
          <i class="fa-solid fa-user-pen" data-manage= ${client[i].clientId}></i>
        </div>
      </div> `;
    }
    // =================client full name adjustement========
    const clientFullName = document.querySelectorAll(".client-full-name");
    clientFullName.forEach((fullName) => {
      const OriginalName = fullName.textContent;
      if (OriginalName.length > 12) {
        const restrictedFullName = `${OriginalName.slice(0, 12)}...`;
        fullName.textContent = restrictedFullName;
      }
    });

    // =========================live search =======================
    const clientContainers = document.querySelectorAll(".client");
    const liveSearch = () => {
      let inputCharacter = searchCLientInput.value.toUpperCase();

      clientContainers.forEach((client) => {
        // ============show all item when input is empty again
        if (searchCLientInput === "") {
          client.classList.remove("display-none");
        }
        // ==========search by charachter, display the ones that match,remove the ones that doesnt match================
        if (client.textContent.toUpperCase().includes(inputCharacter)) {
          client.classList.remove("display-none");
        } else if (!client.textContent.toUpperCase().includes(inputCharacter)) {
          client.classList.add("display-none");
        }
      });
    };
    searchCLientInput.addEventListener("input", () => {
      liveSearch();
    });
  } catch (error) {
    console.log(error);
  }
};
getClients();

// ================open form function ======================
const openClientForms = document.querySelectorAll(".open-client-form-btn");
openClientForms.forEach((openClientForm) => {
  openClientForm.addEventListener("click", () => {
    registerContainer.classList.add("open-container");
  });
});

// ===============close  form function ================ ========================
const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
  registerContainer.classList.remove("open-container");
});

// ==============back btn ============================
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location = "http://localhost:3000/coachHomepage/coachHomepage.html";
});

// ========================== register BTN ==================
const registerBtn = document.querySelector(".sign-up-btn");

// ===========-register info selections ========
const registerContainer = document.querySelector(".register-container");
const registerFirstName = document.getElementById("register-first-name");
const registerLastName = document.getElementById("register-last-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");

// ============== REGISTER alert handling classes ===============================
const registerFirstNameAlert = document.querySelector(".register-first-alert");
const registerLastNameAlert = document.querySelector(".register-last-alert");
const registerPasswordAlert = document.querySelector(
  ".register-password-alert"
);
const registeremailAlert = document.querySelector(".register-email-alert");

// =========== connecting register btn and info to backend ======

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const firstName = registerFirstName.value;
  const lastName = registerLastName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;
  if (firstName.length < 3) {
    showAlert(registerFirstNameAlert);
  }
  if (lastName.length < 3) {
    showAlert(registerLastNameAlert);
  }
  if (!validateEmail(email)) {
    showAlert(registeremailAlert);
  }
  if (password.length < 6) {
    showAlert(registerPasswordAlert);
  }
  try {
    const { client } = await axios.post("/api/v1/client", {
      firstName,
      lastName,
      email,
      password,
    });
    getClients();
    registerFirstName.value = "";
    registerLastName.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
    setTimeout(() => {
      registerContainer.classList.remove("open-container");
    }, 500);
  } catch (error) {
    console.log(error);
  }
});

// ==========eye toggle for password hide/show case ====
const togglePassword = document.querySelector("#toggle-password");
const password = document.querySelector("#register-password");

togglePassword.addEventListener("click", () => {
  const type = password.getAttribute("type");
  if (type === "password") {
    password.setAttribute("type", "text");
  } else {
    password.setAttribute("type", "password");
  }
});

// ================logout user ===================

const logoutBtn = document.getElementById("user-logout-nav-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await axios.post("/api/v1/auth/logout");
    localStorage.removeItem("ref");
    window.location = "http://localhost:3000/";
  } catch (error) {
    console.log(error);
  }
});

// ====================GLOBAL FUNCTIONS ==========================

// =======================show alert function ===========================
const showAlert = async (alert) => {
  await alert.classList.add("show-alert");
  setTimeout(() => {
    alert.classList.remove("show-alert");
  }, 3000);
};

// ==========validate email for regex  =================

function validateEmail(emailValue) {
  let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return res.test(emailValue);
}
