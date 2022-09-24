const coachName = document.querySelector(".coach-name");
const profilePic = document.getElementById("profile-picture");

const fileInputBtn = document.getElementById("profile-picture-file");
const imgContainer = document.querySelector(".default-profile-container");
const coachId = localStorage.getItem("ref");

const getCoach = async () => {
  try {
    const {
      data: { coach },
    } = await axios.get(`/api/v1/coach/${coachId}`);
    const firstName = coach.coachFirstName;
    const lastName = coach.coachLastName;

    profilePic.src = "./images/whitemask.svg";

    coachName.innerHTML = `${firstName} ${lastName}`;
  } catch (error) {
    console.log(error);
  }
};

getCoach();

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
