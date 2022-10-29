// ==================get id from local storage ================

const clientId = localStorage.getItem("cref");
// ===============coach name and displaying the general coach info ========
const clientName = document.querySelector(".client-name");
const clientProfile = document.querySelector(".profile-pic");

const coachEmailBtn = document.querySelector("#email-icon");
const coachWhatsappBtn = document.querySelector("#whatsapp-icon");
const getClient = async () => {
  try {
    const {
      data: { client },
    } = await axios.get(`/api/v1/client/${clientId}`);
    console.log(client);
    const firstName = client.clientFirstName;
    const lastName = client.clientLastName;
    const coachId = client.createdBy;

    const coachNumber = client.number;
    const email = client.email;

    clientProfile.textContent = `${firstName.slice(0, 1).toUpperCase()}`;
    clientName.innerHTML = `${firstName} ${lastName}`;

    clientName.classList.add("opacity-one");

    coachEmailBtn.href = `mailto:${email}`;

    if (coachNumber) {
      coachWhatsappBtn.href = `https://wa.me/${coachNumber}`;
    } else {
      console.log("not existing");
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
