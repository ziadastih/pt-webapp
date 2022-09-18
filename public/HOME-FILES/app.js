// ==============navigation btns selection =================
const getStartedBtn = document.querySelector(".get-started-btn");
const loginNavBtn = document.getElementById("login-nav-btn");

// ==========sections selection ==============
const registerSection = document.querySelector(".register-section");
const loginSection = document.querySelector(".login-section");
const navBar = document.querySelector(".nav-bar");

// ===========navigation event listener ==========

// ===============get started btn  ==================
getStartedBtn.addEventListener("click", () => {
  navBar.classList.add("js-nav-bar");
  registerSection.classList.add("register-translate");
  loginSection.classList.remove("login-translate");
});
// ===============login-nav-btn  ==================
loginNavBtn.addEventListener("click", () => {
  navBar.classList.add("js-nav-bar");
  registerSection.classList.remove("register-translate");
  loginSection.classList.add("login-translate");
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

// =========== connecting register btn and info to backend ======

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const firstName = registerFirstName.value;
  const lastName = registerLastName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;

  try {
    const { coach } = await axios.post("/api/v1/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    loginSection.classList.add("login-translate");
    registerSection.classList.remove("register-translate");
  } catch (error) {
    console.log(error);
  }
});
