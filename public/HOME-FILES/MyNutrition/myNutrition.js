const btnContainer = document.querySelector(".btn-container");
const dietsGridContainer = document.querySelector(
  ".nutrition-programs-grid-container"
);
const preLoader = document.querySelector(".gif");
const fetchMore = document.querySelector(".fetch-more");
const deleteVerificationContainer = document.querySelector(
  ".delete-verification-section"
);
const overlay = document.querySelector(".overlay");
const searchDietInput = document.getElementById("search-nutrition-input");
const searchDietIcon = document.getElementById("search-icon-btn");
// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

let page = 0;
localStorage.removeItem("di");
let dLength = JSON.parse(localStorage.getItem("dL"));
let dietsArr = [];
console.log(performance.now());
const getDiet = async () => {
  page = 0;
  try {
    // ============getting the data ===============
    const { data } = await axios.get(`/api/v1/diet?page=${page}`);
    preLoader.classList.add("display-none");

    //  =========if length is === 0 means no workouts we want to display the create item =============
    const length = data.diets.length;

    if (length === 0) {
      btnContainer.classList.add("open-container");
    }
    dietsArr = data.diets;
    displayAllPrograms(dietsArr);
  } catch (error) {
    console.log(error);
  }
};
getDiet();

searchDietIcon.addEventListener("click", async () => {
  if (searchDietInput.value.length > 0) {
    searchFunction();
  }
  searchDietInput.addEventListener("input", async () => {
    if (searchDietInput.value.length > 0) {
      getDiet();
    }
  });
});

searchDietIcon.addEventListener("click", () => {
  searchDietInput.classList.toggle("translate-input");
});

searchDietInput.addEventListener("search", () => {
  searchFunction();
});

// ================naigate to create diet page ========

const goToCreateDietBtns = document.querySelectorAll(".create-nutrition-btn");

goToCreateDietBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location = "http://192.168.1.195:3000/createDiet/createDiet.html";
  });
});

// ==============back btn ============================
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/coachHomepage/coachHomepage.html";
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

// ==============display all programs
const displayAllPrograms = (Diets) => {
  let length = Diets.length;
  fetchMore.classList.add("open-container");
  if (searchDietInput.value.length > 0) {
    fetchMore.classList.remove("show-opacity");
  } else {
    if (length === dLength) {
      fetchMore.classList.remove("show-opacity");
      observer.unobserve(fetchMore);
    } else {
      fetchMore.classList.add("show-opacity");
      observer.observe(fetchMore);
    }
  }
  dietsGridContainer.innerHTML = "";
  for (let i = 0; i < Diets.length; i++) {
    let diet = Diets[i];
    if (diet.name.length > 20) {
      diet.name = `${diet.name.slice(0, 20)}..`;
    }
    dietsGridContainer.innerHTML += `<div class="one-diet-container">
    <div class="diet">
     
      <p>${diet.name}</p>
      <div class="tools">
        <i
          class="fa-regular fa-pen-to-square"
          id="edit-diet"
          data-edit="${diet._id}"
        ></i>
        <i
          class="fa-solid fa-trash"
          id="delete-diet"
          data-index=${i}
          data-delete="${diet._id}"
        ></i>
      </div>
    </div>
    <div class="total-diet-macros">
      <div class="macros-info">
        <span>cal.</span>
        <p class="total-diet-cal">${diet.macros.calories}</p>
      </div>
      <div class="macros-info">
        <span>carbs</span>
        <p class="total-diet-carbs">${diet.macros.carbs}</p>
      </div>
      <div class="macros-info">
        <span>prot.</span>
        <p class="total-diet-prot">${diet.macros.protein}</p>
      </div>
      <div class="macros-info">
        <span>fat</span>
        <p class="total-diet-fat">${diet.macros.fat}</p>
      </div>
    </div>
  </div>`;
  }

  const deleteDiet = document.querySelectorAll("#delete-diet");

  deleteDiet.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      let dietId = e.target.dataset.delete;
      let dietIndex = e.target.dataset.index;
      let dietName = e.target.parentElement.previousElementSibling.textContent;
      overlay.classList.add("open-container");
      deleteVerificationContainer.classList.add("open-container");
      deleteVerificationContainer.innerHTML = ` 
      <div class="delete-verification-box">
      <h3>Are you sure you want to delete <span>${dietName}</span> ?</h3>
      <div class="yes-no-container">
        <button class="yes-btn" data-delete =${dietId} data-index=${dietIndex}>yes</button>
        <button class="no-btn"> no </button>
      </div>
      </div>`;

      const noBtn = document.querySelector(".no-btn");
      noBtn.addEventListener("click", () => {
        overlay.classList.remove("open-container");
        deleteVerificationContainer.classList.remove("open-container");
      });

      // ===confirmation for delete program ====================
      const yesBtn = document.querySelector(".yes-btn");
      yesBtn.addEventListener("click", async (e) => {
        let id = e.target.dataset.delete;
        let index = e.target.dataset.index;

        preLoader.classList.remove("display-none");
        await axios.delete(`/api/v1/diet/${id}`);

        const { data } = await axios.get("/api/v1/dataLength");

        let dietLength = data.dataLength[0].dietLength - 1;
        await axios.patch("/api/v1/dataLength", {
          dietLength: dietLength,
        });
        dietsArr.splice(index, 1);
        overlay.classList.remove("open-container");
        deleteVerificationContainer.classList.remove("open-container");
        preLoader.classList.add("display-none");
        dLength = dLength - 1;
        localStorage.setItem("dL", JSON.stringify(dLength));
        if (searchDietInput.value.length > 0) {
          displayAllPrograms(dietsArr);
        } else {
          getDiet();
        }
      });
    });
  });

  // ==================edit diets btn ========================
  const editDietBtns = document.querySelectorAll("#edit-diet");
  editDietBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      let dietId = editBtn.dataset.edit;
      localStorage.setItem("di", dietId);
      window.location = "http://192.168.1.195:3000/editDiet/editDiet.html";
    });
  });
};

// =======================search function =====================
const searchFunction = async () => {
  let inputCharacter = searchDietInput.value;

  preLoader.classList.remove("display-none");
  const { data } = await axios.get(`/api/v1/diet?name=${inputCharacter}`);
  observer.unobserve(fetchMore);
  preLoader.classList.add("display-none");

  dietsArr = data.diet;
  if (dietsArr.length === 0) {
    dietsGridContainer.innerHTML = `<h2>Sorry! No Diet matches your search</h2>`;
    fetchMore.classList.remove("open-container");
  } else {
    displayAllPrograms(dietsArr);
  }
  searchDietInput.addEventListener("input", () => {
    if (searchDietInput.value.length === 0) {
      getDiet();
    }
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      preLoader.classList.remove("display-none");

      page = page + 1;
      const { data } = await axios.get(`/api/v1/diet/?page=${page}`);

      let fetchedPrograms = data.diets;
      await fetchedPrograms.forEach((program) => {
        dietsArr.push(program);
      });

      preLoader.classList.add("display-none");

      displayAllPrograms(dietsArr);
    }
  });
});
