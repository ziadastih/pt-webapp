// ==============navigation btns selection =================
const getStartedBtn = document.querySelector(".get-started-btn");
const loginNavBtn = document.getElementById("login-nav-btn");
const closeBtns = document.querySelectorAll("#close-btn");
// ==========sections selection ==============
const registerContainer = document.querySelector(".register-container");
const loginContainer = document.querySelector(".login-container");

// ===========navigation event listener ==========

// ===============get started btn  ==================
getStartedBtn.addEventListener("click", () => {
  registerContainer.classList.add("open-container");
});
// ===============login-nav-btn  ==================
loginNavBtn.addEventListener("click", () => {
  registerContainer.classList.remove("open-container");
  loginContainer.classList.add("open-container");
});
// =============close btns for each container so we save lines of code
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", (e) => {
    let id = e.target.dataset.close;
    let container = document.querySelector(`.${id}`);
    container.classList.remove("open-container");
    console.log(container);
  });
});

// ==========eye toggle for password hide/show case ====
const togglePassword = document.querySelectorAll("#toggle-password");
const passwords = document.querySelectorAll(".password");

togglePassword.forEach((eyeBtn) => {
  eyeBtn.addEventListener("click", () => {
    passwords.forEach((password) => {
      const type = password.getAttribute("type");
      if (type === "password") {
        password.setAttribute("type", "text");
      } else {
        password.setAttribute("type", "password");
      }
    });
  });
});
// ========================== register/login btn ==================
const registerBtn = document.querySelector(".sign-up-btn");
const loginBtn = document.querySelector(".login-btn");

// ===========-register/login info selections ========
const registerFirstName = document.getElementById("register-first-name");
const registerLastName = document.getElementById("register-last-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

// ==============alert handling classes ===============================
const registerFirstNameAlert = document.querySelector(".register-first-alert");
const registerLastNameAlert = document.querySelector(".register-last-alert");
const registerPasswordAlert = document.querySelector(
  ".register-password-alert"
);
const registeremailAlert = document.querySelector(".register-email-alert");
const loginPasswordAlert = document.querySelector(".login-password-alert");
const loginEmailAlert = document.querySelector(".login-email-alert");

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
    const { coach } = await axios.post("/api/v1/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    registerFirstName.value = "";
    registerLastName.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
    setTimeout(() => {
      loginContainer.classList.add("open-container");
      registerContainer.classList.remove("open-container");
    }, 500);
  } catch (error) {
    console.log(error);
  }
});

// ==============login ================
loginBtn.addEventListener("click", async (e) => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    const data = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });
    const coach = data.data;
    console.log(coach);
  } catch (error) {
    showAlert(loginEmailAlert);
    showAlert(loginPasswordAlert);
  }
});

// =======================show alert function ===========================
const showAlert = (alert) => {
  alert.classList.add("show-alert");
  setTimeout(() => {
    alert.classList.remove("show-alert");
  }, 3000);
};

// ==========validate email for regex  =================

function validateEmail(emailValue) {
  let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return res.test(emailValue);
}

// ================logout test ===================

const logoutBtn = document.getElementById("contact-us-nav-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await axios.post("/api/v1/auth/logout");
  } catch (error) {
    console.log(error);
  }
});

// ==============get clients test ===========================
const getClientsBtn = document.getElementById("features-nav-btn");

getClientsBtn.addEventListener("click", async () => {
  try {
    const { data } = await axios.get("/api/v1/client");
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
});
