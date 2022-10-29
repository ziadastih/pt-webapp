// ============== Global navigation btns selection =================
const getStartedBtn = document.querySelector(".get-started-btn");
const loginNavBtn = document.getElementById("login-nav-btn");
const closeBtns = document.querySelectorAll("#close-btn");
const globalHomeBtn = document.getElementById("home-nav-btn");
// ========== Global sections selection ==============
const registerContainer = document.querySelector(".register-container");
const loginContainer = document.querySelector(".login-container");
const homePageSection = document.querySelector(".homepage-section");
const navBar = document.querySelector(".nav-bar");
const boxOverlay = document.querySelector(".box-overlay");
// ============user sections coach/client ========================
const coachHomepage = document.querySelector(".coach-section");
const coachNavBar = document.querySelector(".coach-nav-bar");

// ===========navigation event listener ==========
// ===============global home navigation =============
globalHomeBtn.addEventListener("click", () => {
  loginContainer.classList.remove("open-container");
  registerContainer.classList.remove("open-container");
});
// ===============get started btn  ==================
getStartedBtn.addEventListener("click", () => {
  registerContainer.classList.add("open-container");
  boxOverlay.classList.add("open-container");
});
// ===============login-nav-btn  ==================
loginNavBtn.addEventListener("click", () => {
  registerContainer.classList.remove("open-container");
  loginContainer.classList.add("open-container");
  boxOverlay.classList.add("open-container");
});

// ==============END OF GLOBAL NAVIGATION ====================

//===========REGISTER / LOGIN LOGIC =======================

// =============close btns for each container so we save lines of code
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", (e) => {
    let id = e.target.dataset.close;
    let container = document.querySelector(`.${id}`);
    container.classList.remove("open-container");
    boxOverlay.classList.remove("open-container");
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
// ========================== register BTN ==================
const registerBtn = document.querySelector(".sign-up-btn");

// ===========-register info selections ========
const registerFirstName = document.getElementById("register-first-name");
const registerLastName = document.getElementById("register-last-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerNumber = document.getElementById("register-number");
// ============== REGISTER alert handling classes ===============================
const registerFirstNameAlert = document.querySelector(".register-first-alert");
const registerLastNameAlert = document.querySelector(".register-last-alert");
const registerPasswordAlert = document.querySelector(
  ".register-password-alert"
);
const registeremailAlert = document.querySelector(".register-email-alert");
const registerNumberAlert = document.querySelector(".register-number-alert");
// =========== connecting register btn and info to backend ======

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const firstName = registerFirstName.value;
  const lastName = registerLastName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;
  const number = registerNumber.value;
  if (firstName.length < 3) {
    return showAlert(registerFirstNameAlert);
  }
  if (lastName.length < 3) {
    return showAlert(registerLastNameAlert);
  }
  if (!validateEmail(email)) {
    return showAlert(registeremailAlert);
  }
  if (password.length < 6) {
    return showAlert(registerPasswordAlert);
  }
  if (!number) {
    return showAlert(registerNumberAlert);
  }
  try {
    const { coach } = await axios.post("/api/v1/auth/register", {
      firstName,
      lastName,
      email,
      number,
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

// ===========LOGIN CLASSES  BTNS/INPUTS/CONTAINERS ================

const loginBtn = document.querySelector(".login-btn");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginPasswordAlert = document.querySelector(".login-password-alert");
const loginEmailAlert = document.querySelector(".login-email-alert");

// ==============login ================
loginBtn.addEventListener("click", async (e) => {
  const email = loginEmail.value;
  const password = loginPassword.value;
  const role = await e.target.dataset.login;
  console.log(role);
  if (role === "coach") {
    try {
      const data = await axios.post("/api/v1/auth/login", {
        email,
        password,
        role,
      });
      const ref = data.data.coach.coachId;

      window.location =
        "http://192.168.1.195:3000/coachHomepage/coachHomepage.html";

      // ============removing homesection and getting the coach homapage =================
    } catch (error) {
      console.log(error);
      showAlert(loginEmailAlert);
      showAlert(loginPasswordAlert);
      roleBtn.forEach((btn) => {
        btn.classList.add("role-alert");
      });
    }
  } else if (role === "client") {
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
        role,
      });
      console.log(data.client.clientId);
      let cref = data.client.clientId;
      localStorage.setItem("cref", cref);
      window.location =
        "http://192.168.1.195:3000/clientHomepage/clientHomepage.html";

      // ============removing homesection and getting the coach homapage =================
    } catch (error) {
      console.log(error);
      showAlert(loginEmailAlert);
      showAlert(loginPasswordAlert);
      roleBtn.forEach((btn) => {
        btn.classList.add("role-alert");
      });
    }
  }
});

// =================ROLE BTNS EVENTLISTENER ========================
const roleBtn = document.querySelectorAll(".role-btn");

roleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    roleBtn.forEach((subbtn) => {
      subbtn.classList.remove("selected-role");
      btn.classList.remove("role-alert");
      loginBtn.removeAttribute("data-login");
    });
    const role = btn.textContent.toLocaleLowerCase();
    loginBtn.setAttribute("data-login", role);

    btn.classList.add("selected-role");
  });
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
