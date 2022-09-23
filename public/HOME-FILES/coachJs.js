const coachName = document.querySelector(".coach-name");

const coachId = localStorage.getItem("ref");

const getCoach = async () => {
  try {
    const {
      data: { coach },
    } = await axios.get(`/api/v1/coach/${coachId}`);
    const firstName = coach.coachFirstName;
    const lastName = coach.coachLastName;
    coachName.innerHTML = `${firstName} ${lastName}`;
  } catch (error) {
    console.log(error);
  }
};

getCoach();
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
// ==============get clients test ===========================

const getClients = async () => {
  try {
    const { data } = await axios.get("/api/v1/client");
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
};
getClients();

const getWorkouts = async () => {
  try {
    const { data } = await axios.get("/api/v1/workout");
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
};
getWorkouts();
