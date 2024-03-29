const btnContainer = document.querySelector(".btn-container");
const clientsGridContainer = document.querySelector(".clients-grid-container");
const deleteVerificationContainer = document.querySelector(
  ".delete-verification-section"
);
const overlay = document.querySelector(".overlay");
const preLoader = document.querySelector(".gif");
const searchCLientInput = document.getElementById("search-client-input");

// ===============getClients when page open and display them =======
localStorage.removeItem("cref");
const getClients = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get("/api/v1/client/?count=30");
    preLoader.classList.add("display-none");

    //  =========if length is === 0 means no clients we want to display the create item =============
    const length = data.clientsInfo.length;
    if (length === 0) {
      btnContainer.classList.add("open-container");
    }
    //getting the array which is client =================
    let client = data.clientsInfo;

    displayClients(client);

    // =========================live search =======================

    const liveSearch = async () => {
      let inputCharacter = searchCLientInput.value;
      preLoader.classList.remove("display-none");
      const { data } = await axios.get(
        `/api/v1/client/?name=${inputCharacter}`
      );
      preLoader.classList.add("display-none");
      let client = data.clientsInfo;

      displayClients(client);
    };
    searchCLientInput.addEventListener("input", async () => {
      if (searchCLientInput.value.length === 0) {
        getClients();
      } else {
        await liveSearch();
      }
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
    overlay.classList.add("open-container");
    registerContainer.classList.add("open-container");
  });
});

// =============close btns for each container so we save lines of code
const closeBtns = document.querySelectorAll("#close-btn");
const closeContainer = () => {
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      let id = e.target.dataset.close;
      let container = document.querySelector(`.${id}`);
      overlay.classList.remove("open-container");
      container.classList.remove("open-container");
    });
  });
};
closeContainer();

// ==============back btn ============================
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/coachHomepage/coachHomepage.html";
});

// ========================== register BTN ==================
const registerBtn = document.querySelector(".sign-up-btn");

// ===========-register info selections ========
const registerContainer = document.querySelector(".register-container");
const registerFirstName = document.getElementById("register-first-name");
const registerLastName = document.getElementById("register-last-name");
const registerEmail = document.getElementById("register-email");
const registerNumber = document.getElementById("register-number");

// ============== REGISTER alert handling classes ===============================
const registerFirstNameAlert = document.querySelector(".register-first-alert");
const registerLastNameAlert = document.querySelector(".register-last-alert");
const registerNumberAlert = document.querySelector(".register-number-alert");
const registeremailAlert = document.querySelector(".register-email-alert");

// =========== connecting register btn and info to backend ======

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const firstName = registerFirstName.value;
  const lastName = registerLastName.value;
  const email = registerEmail.value;
  const number = registerNumber.value;

  if (firstName.length < 3) {
    showAlert(registerFirstNameAlert);
  }
  if (lastName.length < 3) {
    showAlert(registerLastNameAlert);
  }
  if (!validateEmail(email)) {
    showAlert(registeremailAlert);
  }
  if (number.length < 1) {
    showAlert(registerPasswordAlert);
  }

  let chars = `qwertyuiopasdfghjklzxcvbnmAQWERTYUIOPSDFGHJKLZXCVBNM1234567890!@#$%^&*()_+`;

  let password = ``;
  let lengthOfPass = 12;
  for (let i = 0; i < lengthOfPass; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  try {
    preLoader.classList.remove("display-none");
    const { client } = await axios.post("/api/v1/client", {
      firstName,
      lastName,
      email,
      number,
      password,
    });

    const { data } = await axios.get("/api/v1/dataLength");

    let clientLength = data.dataLength[0].clientLength + 1;
    await axios.patch("/api/v1/dataLength", { clientLength: clientLength });
    preLoader.classList.add("display-none");
    getClients();
    registerFirstName.value = "";
    registerLastName.value = "";
    registerEmail.value = "";
    registerNumber.value = "";
    overlay.classList.remove("open-container");
    btnContainer.classList.add("display-none");
    registerContainer.classList.remove("open-container");
  } catch (error) {
    console.log(error);
  }
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

const displayClients = (client) => {
  clientsGridContainer.innerHTML = "";
  for (let i = 0; i < client.length; i++) {
    let clientFullName = `${client[i].clientFirstName} ${client[i].clientLastName}`;
    clientsGridContainer.innerHTML += ` <div class="client" data-id = ${
      client[i].clientId
    }>
 <div class='client-info'>
      <p class="client-full-name">${clientFullName}</p>
      <span>${client[i].createdAt.slice(0, 10)}</span>
      </div>
      <div class="tools">
        <i class="fa-solid fa-user-pen" id="manage-client" data-manage= ${
          client[i].clientId
        }></i>
        <i class="fa-solid fa-trash" id="delete-client" data-name='${clientFullName}' data-delete = ${
      client[i].clientId
    }></i>
      </div>
    </div> `;
  }

  // =============delete client ====================
  const deleteClient = document.querySelectorAll("#delete-client");

  deleteClient.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      overlay.classList.add("open-container");
      let clientId = e.target.dataset.delete;
      let clientName = e.target.dataset.name;

      deleteVerificationContainer.classList.add("open-container");
      deleteVerificationContainer.innerHTML = ` 
      <div class="delete-verification-box">
      <h3>Are you sure you want to delete <span>${clientName}</span> ?</h3>
      <div class="yes-no-container">
        <button class="yes-btn" data-delete =${clientId}>yes</button>
        <button class="no-btn"> no </button>
      </div>
      </div>`;

      const noBtn = document.querySelector(".no-btn");
      noBtn.addEventListener("click", () => {
        overlay.classList.remove("open-container");
        deleteVerificationContainer.classList.remove("open-container");
      });
      const yesBtn = document.querySelector(".yes-btn");
      yesBtn.addEventListener("click", async (e) => {
        let id = e.target.dataset.delete;

        preLoader.classList.remove("display-none");
        await axios.delete(`/api/v1/client/${id}`);
        const { data } = await axios.get("/api/v1/dataLength");

        let clientLength = data.dataLength[0].clientLength - 1;
        await axios.patch("/api/v1/dataLength", { clientLength: clientLength });
        preLoader.classList.add("display-none");
        overlay.classList.remove("open-container");
        deleteVerificationContainer.classList.remove("open-container");
        searchCLientInput.value = "";
        getClients();
      });
    });
  });

  const manageClientBtns = document.querySelectorAll("#manage-client");
  manageClientBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let clientId = btn.dataset.manage;

      localStorage.setItem("cref", clientId);
      window.location =
        "http://192.168.1.195:3000/manageClient/manageClient.html";
    });
  });
};
