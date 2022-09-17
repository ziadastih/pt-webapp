const firstNameInput = document.getElementById("first-name");
const secondNameInput = document.getElementById("second-name");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const registerBtn = document.querySelector(".register");

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const firstName = firstNameInput.value;
  const lastName = secondNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const { coach } = await axios.post("/api/v1/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
});
