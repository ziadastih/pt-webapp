// ==================get id from local storage ================
const coachId = localStorage.getItem("ref");

// ===============coach name and displaying the general coach info ========
const coachName = document.querySelector(".coach-name");

const getCoach = async () => {
  try {
    const {
      data: { coach },
    } = await axios.get(`/api/v1/coach/${coachId}`);
    const firstName = coach.coachFirstName;
    const lastName = coach.coachLastName;

    coachName.innerHTML = `${firstName} ${lastName}`;
    coachName.classList.add("opacity-one");
  } catch (error) {
    console.log(error);
  }
};

getCoach();

// ==============get overall stats to put the numbers ==============================

const clientNumberStat = document.querySelector(".client-number");
const workoutNumberStat = document.querySelector(".workout-number");
const dietNumberStat = document.querySelector(".diet-number");

const getWorkouts = async () => {
  try {
    const { data } = await axios.get("/api/v1/workout");
    console.log(data.workouts);
    workoutNumberStat.textContent = data.workouts.length;
    console.log(data.workouts.length);
  } catch (error) {
    console.log(error);
  }
};
getWorkouts();

const getClients = async () => {
  try {
    const { data } = await axios.get("/api/v1/client");
    console.log(data.clientsInfo.length);
    clientNumberStat.textContent = data.clientsInfo.length;
  } catch (error) {
    console.log(error);
  }
};
getClients();

const getDiets = async () => {
  try {
    const { data } = await axios.get("/api/v1/diet");
    dietNumberStat.textContent = data.diets.length;
    console.log(data.diets.length);
  } catch (error) {
    console.log(error);
  }
};
getDiets();

// ====MY CLIENTS EVENT LISTENER ===============
const myClientsBtn = document.querySelector(".access-clients");

myClientsBtn.addEventListener("click", () => {
  window.location = "http://localhost:3000/MyClients/myClients.html";
});

// =================== my workouts event listener ==========
const myWorkoutsBtn = document.querySelector(".access-workouts");

myWorkoutsBtn.addEventListener("click", () => {
  window.location = "http://localhost:3000/MyWorkouts/myWorkouts.html";
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

// ====================== profile picture demo for later to work on the function ==========

const profilePic = document.getElementById("profile-picture");

const fileInputBtn = document.getElementById("profile-picture-file");
const imgContainer = document.querySelector(".default-profile-container");

// ===========function to upload picture without interfering with dataBase now =============
fileInputBtn.addEventListener("change", async () => {
  const chooseFile = await fileInputBtn.files[0];
  console.log(chooseFile);

  if (chooseFile) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      profilePic.src = reader.result;

      imgContainer.classList.add("remove-border");
    });
    reader.readAsDataURL(chooseFile);
  }
});
