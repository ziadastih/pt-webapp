// ==================get id from local storage ================

const clientId = localStorage.getItem("cref");

// ===============coach name and displaying the general coach info ========
const clientName = document.querySelector(".client-name");
const clientProfile = document.querySelector(".profile-pic");
const clientNameContainer = document.querySelector(".client-name-container");
const coachName = document.querySelector(".coach-name");
const coachEmailBtn = document.querySelector("#email-icon");
const coachWhatsappBtn = document.querySelector("#whatsapp-icon");
const getClient = async () => {
  try {
    const {
      data: { client },
    } = await axios.get(`/api/v1/client/${clientId}`);
    console.log(client);
    const clientFirstName = client.clientFirstName;
    const clientLastName = client.clientLastName;
    const coachId = client.createdBy;

    const {
      data: { coach },
    } = await axios.get(`/api/v1/coach/${coachId}`);
    const coachfirstName = coach.coachFirstName;
    const coachlastName = coach.coachLastName;
    const coachEmail = coach.email;
    const coachNumber = coach.number;

    clientProfile.textContent = `${clientFirstName.slice(0, 1).toUpperCase()}`;
    clientName.innerHTML = `${clientFirstName} ${clientLastName}`;
    coachName.innerHTML = `${coachfirstName} ${coachlastName}`;
    coachEmailBtn.href = `mailto:${coachEmail}`;
    clientName.classList.add("show-opacity");
    coachName.classList.add("show-opacity");
    if (coachNumber) {
      coachWhatsappBtn.href = `https://wa.me/${coachNumber}`;
    } else {
      console.log("no number");
    }
  } catch (error) {
    console.log(error);
  }
};

getClient();

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
