// ==============select verification container and input container =========================
const btnContainer = document.querySelector(".btn-container");
const dietsGridContainer = document.querySelector(
  ".nutrition-programs-grid-container"
);
const deleteVerificationContainer = document.querySelector(
  ".delete-verification-section"
);

const createNewDietBtns = document.querySelectorAll("#create-diet-btn");
const preLoader = document.querySelector(".gif");
const addExistingDiet = document.querySelector("#add-diet-btn");
const dietListContainer = document.querySelector(".diet-list-container");
const closeBtn = document.querySelector("#close-btn");
const addDietContainer = document.querySelector(".add-diet-container");
const confirmDietBtn = document.querySelector("#confirm-diet");
const overlay = document.querySelector(".overlay");
const searchInput = document.querySelector(".search-input");
// ================GET WORKOUT FUNCTION , INCLUDE DISPLAYING ALL, LIVE SEARCH , DELETE FUNCTION =============================

let clientId = localStorage.getItem("cref");

let dLength = JSON.parse(localStorage.getItem("dL"));
let dietsArr = [];
let selectedDiets = [];
let page = 0;
let existingDietsArr = [];
// ========got to create new diet page ================

createNewDietBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location = "http://192.168.1.195:3000/createDiet/createDiet.html";
  });
});

// =========toggle existing Diets  ============

addExistingDiet.addEventListener("click", async () => {
  getExistingDiets();
});

// =========confirm diet btn ===============

confirmDietBtn.addEventListener("click", async () => {
  preLoader.classList.remove("display-none");
  for (let i = 0; i < selectedDiets.length; i++) {
    selectedDiets[i].createdFor = clientId;
    selectedDiets[i].current = false;

    delete selectedDiets[i]["_id"];
    const program = await axios.post("/api/v1/diet", selectedDiets[i]);
    const { data } = await axios.get("/api/v1/dataLength");

    let dietLength = data.dataLength[0].dietLength + 1;
    await axios.patch("/api/v1/dataLength", {
      dietLength: dietLength,
    });
    localStorage.setItem("dL", JSON.stringify(dietLength));
  }
  selectedDiets = [];
  preLoader.classList.remove("display-none");
  overlay.classList.remove("open-container");
  addDietContainer.classList.remove("open-container");
  getDiets();
});

// ==================search input =================
searchInput.addEventListener("search", () => {
  searchFunction();
});
// ===============close btn =======================

closeBtn.addEventListener("click", () => {
  addDietContainer.classList.remove("open-container");
  overlay.classList.remove("open-container");
  selectedDiets = [];
  existingDietsArr = [];
  dietListContainer.innerHTML = ``;
  searchInput.value = "";
});

// ================back btn =====================
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  window.location = "http://192.168.1.195:3000/manageClient/manageClient.html";
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

// ================fetch workouts ===================
const getDiets = async () => {
  try {
    // ============getting the data ===============
    const { data } = await axios.get(`/api/v1/diet?createdFor=${clientId}`);

    preLoader.classList.add("display-none");
    btnContainer.classList.add("show-opacity");

    dietsArr = data.diets;

    displayAllPrograms(dietsArr);
  } catch (error) {
    console.log(error);
  }
};
getDiets();

const displayAllPrograms = (Diets) => {
  dietsGridContainer.innerHTML = "";

  const filterCurrent = Diets.filter((Element) => {
    return Element.current === true;
  });
  for (i = 0; i < filterCurrent.length; i++) {
    let diet = filterCurrent[i];

    dietsGridContainer.innerHTML += `<div class="one-diet-container">
   
    <div class="current-diet-icon" data-current=${diet._id}> 
     <i class="fa-solid fa-utensils" id="filled-fork"></i> 
   
   </div>
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
        <span>prot</span>
        <p class="total-diet-prot">${diet.macros.protein}</p>
      </div>
      <div class="macros-info">
        <span>fat</span>
        <p class="total-diet-fat">${diet.macros.fat}</p>
      </div>
    </div>
  </div>`;
  }

  // =============none current  ================================
  // ==============filter None current to always display after the current
  const filterNoneCurrent = Diets.filter((Element) => {
    return Element.current === false;
  });
  for (i = 0; i < filterNoneCurrent.length; i++) {
    let diet = filterNoneCurrent[i];
    dietsGridContainer.innerHTML += `<div class="one-diet-container">
    <div class="current-diet-icon not-current" data-current=${diet._id}> 
    <i class="fa-solid fa-utensils" id="filled-fork"></i> 
   
   </div>

  
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
      <span>prot</span>
      <p class="total-diet-prot">${diet.macros.protein}</p>
    </div>
    <div class="macros-info">
      <span>fat</span>
      <p class="total-diet-fat">${diet.macros.fat}</p>
    </div>
  </div>
</div>`;
  }
  // ==================current stars container function =========
  // ==============set as current  =====================
  const currentDietIcon = document.querySelectorAll(".current-diet-icon");

  currentDietIcon.forEach((btn) => {
    btn.addEventListener("click", async () => {
      let dietId = btn.dataset.current;
      if (btn.classList.contains("not-current")) {
        preLoader.classList.remove("display-none");

        const program = await axios.patch(`/api/v1/diet/${dietId}`, {
          current: true,
        });

        let totalProgeamMacros = program.data.diet.macros;
        const dailyMacros = await axios.patch(
          `/api/v1/dailyMacros/${clientId}`,
          { totalMacros: totalProgeamMacros }
        );

        btn.classList.remove("not-current");
        preLoader.classList.add("display-none");
      } else {
        preLoader.classList.remove("display-none");

        const program = await axios.patch(`/api/v1/diet/${dietId}`, {
          current: false,
        });
        btn.classList.add("not-current");
        preLoader.classList.add("display-none");
      }
    });
  });

  // ================delete diet function ==================

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

        localStorage.setItem("dL", JSON.stringify(dietLength));

        getDiets();
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

// ==========display overall diets ============

const displayDietsArray = (arr) => {
  let length = arr.length;
  dLength = JSON.parse(localStorage.getItem("dL"));
  console.log(length);
  dietListContainer.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const createdAt = arr[i].createdAt.slice(0, 10);
    if (arr[i].selected === true) {
      dietListContainer.innerHTML += `<div class="diet-content">
      <span class="check-box change-check-box-background" data-diet =${i}
        ><i class="fa-solid fa-check" id="check-icon"></i
      ></span>
     
      <p class="diet-name">${arr[i].name}</p>
      <p>${createdAt}</p>
    </div>`;
    } else {
      dietListContainer.innerHTML += `<div class="diet-content">
    <span class="check-box" data-diet =${i}
      ><i class="fa-solid fa-check" id="check-icon"></i
    ></span>
   
    <p class="diet-name">${arr[i].name}</p>
    <p>${createdAt}</p>
  </div>`;
    }
  }
  if (length !== dLength && searchInput.value.length === 0) {
    let span = document.createElement("span");
    span.classList.add("fetch-more");

    dietListContainer.append(span);
    observer.observe(span);
  }
  // ===================managing the checkbox and pushing or removing the exercises to selected exercises array
  const checkbox = document.querySelectorAll(".check-box");
  checkbox.forEach((box) => {
    box.addEventListener("click", (e) => {
      let programIndex = box.dataset.diet;
      const index = selectedDiets.findIndex((Element) => {
        return Element._id === arr[programIndex]._id;
      });
      if (index !== -1) {
        selectedDiets.splice(index, 1);
        arr[programIndex].selected = false;
      } else {
        selectedDiets.push(arr[programIndex]);
        arr[programIndex].selected = true;
      }

      box.classList.toggle("change-check-box-background");
    });
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
        existingDietsArr.push(program);
      });

      preLoader.classList.add("display-none");

      displayDietsArray(existingDietsArr);
    }
  });
});

const getExistingDiets = async () => {
  page = 0;

  addDietContainer.classList.add("open-container");

  preLoader.classList.remove("display-none");
  overlay.classList.add("open-container");
  const { data } = await axios.get(`/api/v1/diet?page=${page}`);
  preLoader.classList.add("display-none");

  existingDietsArr = data.diets;
  displayDietsArray(existingDietsArr);
};

const searchFunction = async () => {
  let inputCharacter = searchInput.value;
  preLoader.classList.remove("display-none");
  const { data } = await axios.get(`/api/v1/diet/?name=${inputCharacter}`);

  preLoader.classList.add("display-none");

  existingDietsArr = data.diet;
  if (existingDietsArr.length === 0) {
    dietListContainer.innerHTML = `<h2>Sorry! No Programs matches your search</h2>`;
  } else {
    displayDietsArray(existingDietsArr);
  }

  searchInput.addEventListener("input", () => {
    if (searchInput.value.length === 0) {
      getExistingDiets();
    }
  });
};
