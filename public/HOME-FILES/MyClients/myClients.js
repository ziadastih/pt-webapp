const openClientForm = document.querySelector(".open-client-form-btn");

openClientForm.addEventListener("click", () => {
  registerContainer.classList.add("open-container");
});

// ========================== register BTN ==================
const registerBtn = document.querySelector(".sign-up-btn");
const closeBtn = document.querySelector("#close-btn");
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

closeBtn.addEventListener("click", () => {
  registerContainer.classList.remove("open-container");
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
