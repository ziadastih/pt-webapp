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
const workoutProgramNumberStat = document.querySelector(".workout-number");
const dietNumberStat = document.querySelector(".diet-number");

const getDataLength = async () => {
  try {
    const { data } = await axios.get("/api/v1/dataLength");

    if (data.dataLength.length === 0) {
      const data = axios.post("/api/v1/dataLength", {});

      workoutProgramNumberStat.textContent = 0;
      clientNumberStat.textContent = 0;
      dietNumberStat.textContent = 0;
    } else {
      let workoutLength = data.dataLength[0].workoutLength;
      let dietLength = data.dataLength[0].dietLength;
      let clientLength = data.dataLength[0].clientLength;

      workoutProgramNumberStat.textContent = workoutLength;
      clientNumberStat.textContent = clientLength;
      dietNumberStat.textContent = dietLength;
    }
  } catch (error) {
    console.log(error);
  }
};
getDataLength();

// ====MY CLIENTS EVENT LISTENER ===============
const myClientsBtn = document.querySelector(".access-clients");

myClientsBtn.addEventListener("click", () => {
  localStorage.setItem("wL", workoutProgramNumberStat.textContent);
  localStorage.setItem("dL", dietNumberStat.textContent);
  window.location = "http://192.168.1.195:3000/MyClients/myClients.html";
});

// =================== my workouts event listener ==========
const myWorkoutsBtn = document.querySelector(".access-programs");

myWorkoutsBtn.addEventListener("click", () => {
  localStorage.setItem("wL", workoutProgramNumberStat.textContent);
  window.location =
    "http://192.168.1.195:3000/MyWorkoutsPrograms/myWorkouts.html";
});

// =======================nutrition event listener =======
const myNutritionBtn = document.querySelector(".access-diets");

myNutritionBtn.addEventListener("click", () => {
  localStorage.setItem("dL", dietNumberStat.textContent);
  window.location = "http://192.168.1.195:3000/MyNutrition/myNutrition.html";
});
// =======================Wallet event listener =======
const myWalletBtn = document.querySelector(".access-activities");

myWalletBtn.addEventListener("click", () => {
  window.location = "http://192.168.1.195:3000/MyWallet/wallet.html";
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
