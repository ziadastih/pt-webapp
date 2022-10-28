// ==============back btn ============================
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/coachHomepage/coachHomepage.html";
});

// =====================toggle btns ================
const toggleProfileInfo = document.querySelector(".toggle-profile-info");
const toggleChangePassword = document.querySelector(".toggle-change-password");

// ==========containers ==========================

const accountInfoContainer = document.querySelector(".account-info-container");
const changePasswordContainer = document.querySelector(
  ".change-password-container"
);
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelectorAll("#close-btn");
const coachId = localStorage.getItem("ref");
const preloader = document.querySelector(".gif");
// ====================inputs  ==================
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const currentPasswordInput = document.getElementById("current-password");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");

// ===============alerts  ====================
const firstNameAlert = document.querySelector(".first-name-alert");
const lastNameAlert = document.querySelector(".last-name-alert");

const emailAlert = document.querySelector(".email-alert");
const currentPasswordAlert = document.querySelector(".current-password-alert");
const newPasswordAlert = document.querySelector(".new-password-alert");
const confirmPasswordAlert = document.querySelector(".confirm-password-alert");
// ================change btn ===========================
const changeAccountInfoBtn = document.querySelector(".change-account-info");
const changePasswordBtn = document.querySelector(".change-password");
// ================event listeners ==================
toggleProfileInfo.addEventListener("click", async () => {
  preloader.classList.add("display-flex");
  const {
    data: { coach },
  } = await axios.get(`/api/v1/coach/${coachId}`);
  preloader.classList.remove("display-flex");
  firstNameInput.value = coach.coachFirstName;
  lastNameInput.value = coach.coachLastName;
  emailInput.value = coach.email;
  accountInfoContainer.classList.add("display-flex");
  overlay.classList.add("display-flex");
});

toggleChangePassword.addEventListener("click", () => {
  changePasswordContainer.classList.add("display-flex");
  overlay.classList.add("display-flex");
});

closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let id = btn.dataset.close;

    let container = document.querySelector(`.${id}`);

    container.classList.remove("display-flex");
    overlay.classList.remove("display-flex");
  });
});

changeAccountInfoBtn.addEventListener("click", async () => {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;

  if (firstName.length < 3) {
    showAlert(firstNameAlert);
  }
  if (lastName.length < 3) {
    showAlert(lastNameAlert);
  }
  if (!validateEmail(email)) {
    showAlert(emailAlert);
  }
  try {
    const { coach } = await axios.patch(`/api/v1/coach/${coachId}`, {
      firstName,
      lastName,
      email,
    });
    overlay.classList.remove("display-flex");
    accountInfoContainer.classList.remove("display-flex");
  } catch (error) {
    console.log(error);
  }
});

confirmPasswordInput.addEventListener("input", () => {
  if (confirmPasswordInput.value !== newPasswordInput.value) {
    confirmPasswordInput.classList.add("red-border");
  } else {
    confirmPasswordInput.classList.remove("red-border");
  }
});

changePasswordBtn.addEventListener("click", async () => {
  let currentPassword = currentPasswordInput.value;
  let password = newPasswordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  if (currentPassword.length < 6) {
    showAlert(currentPasswordAlert);
  }
  if (confirmPassword.length < 6) {
    showAlert(confirmPasswordAlert);
  }
  if (password.length < 6) {
    showAlert(newPasswordAlert);
  }
  if (password !== confirmPassword) {
    showAlert(confirmPasswordAlert);
  }

  try {
    const { coach } = await axios.patch(`/api/v1/coach/${coachId}`, {
      currentPassword,
      password,
    });
    const logout = await axios.post("/api/v1/auth/logout");
    localStorage.clear();
    window.location = "http://192.168.1.195:3000/";
  } catch (error) {
    console.log(error);
  }
});
// ================logout user ===================

const logoutBtn = document.querySelectorAll("#user-logout-nav-btn");

logoutBtn.forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.clear();
      window.location = "http://192.168.1.195:3000/";
    } catch (error) {
      console.log(error);
    }
  });
});

const showAlert = async (alert) => {
  await alert.classList.add("show-alert");
  setTimeout(() => {
    alert.classList.remove("show-alert");
  }, 3000);
};

function validateEmail(emailValue) {
  let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return res.test(emailValue);
}
