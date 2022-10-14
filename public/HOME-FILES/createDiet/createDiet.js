const Diet = {
  name: "",
  meal: [],
};

const ingredientsArray = [
  {
    name: "almonds",
    calories: 100,
    proteine: 40,
    carbs: 40,
    fat: 10,
    selected: false,
  },
  {
    name: "apple",
    calories: 100,
    proteine: 0,
    carbs: 50,
    fat: 0,
    selected: false,
  },
  {
    name: "banana",
    calories: 100,
    proteine: 0,
    carbs: 25,
    fat: 0,
    selected: false,
  },
  {
    name: "rice",
    calories: 200,
    proteine: 0,
    carbs: 50,
    fat: 1.2,
    selected: false,
  },
  {
    name: "pasta",
    calories: 100,
    proteine: 0,
    carbs: 50,
    fat: 0,
    selected: false,
  },
  {
    name: "chicken breast",
    calories: 200,
    proteine: 33,
    carbs: 50,
    fat: 0,
    selected: false,
  },
  {
    name: "chicken wings",
    calories: 420,
    proteine: 0,
    carbs: 50,
    fat: 30,
    selected: false,
  },
  {
    name: "fish",
    calories: 300,
    proteine: 30,
    carbs: 50,
    fat: 22,
    selected: false,
  },
  {
    name: "meat",
    calories: 100,
    proteine: 0,
    carbs: 50,
    fat: 20,
    selected: false,
  },
  {
    name: "low fat yoghurt",
    calories: 180,
    proteine: 5.2,
    carbs: 50,
    fat: 23,
    selected: false,
  },
  {
    name: "rice cake",
    calories: 50,
    proteine: 0,
    carbs: 50,
    fat: 0,
    selected: false,
  },
  {
    name: "peanut butter",
    calories: 130,
    proteine: 0,
    carbs: 50,
    fat: 0,
    selected: false,
  },
];
// ============== program selectors and the overlay ================================================
const overlay = document.querySelector(".overlay");
const createDietNameContainer = document.querySelector(".create-diet-name");
const dietNameInput = document.querySelector("#diet-input-name");
const editDietNameBtn = document.querySelector(".edit-diet-name");
const createDietNameBtn = document.querySelector(".add-diet-name");
const dietName = document.querySelector(".diet-name-header");
const editDietNameIcon = document.querySelector(".edit-diet-name-icon");
const nameInputAlert = document.querySelector(".create-diet-name-alert");
const submitDietBtn = document.querySelector("#submit-diet");
const closeBtn = document.querySelectorAll("#close-btn");

// ===================ingredients container that hold our data names and images and checkbox ===========
const toggleIngredientsList = document.querySelector(
  "#toggle-ingredients-container"
);
const ingredientsContainer = document.querySelector(
  ".add-ingredients-container"
);
const ingredientsList = document.querySelector(".ingredients-list-container");
const addIngredients = document.querySelector("#add-ingredients");
const toggleNewIngredientContainer = document.querySelector(
  "#toggle-new-ingredient-name"
);

const searchInput = document.querySelector(".search-input");

// ============================refreshing page alert =====================

window.onbeforeunload = () => {
  return "are you sure you want to leave page";
};
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location = "http://192.168.1.195:3000/MyNutrition/myNutrition.html";
});
// ===============event listener for adding program/ edit icon / and edit program name =============
createDietNameBtn.addEventListener("click", () => {
  addDietName();
});

editDietNameIcon.addEventListener("click", () => {
  createDietNameContainer.classList.remove("display-none");
  overlay.classList.remove("display-none");
  dietNameInput.value = dietName.textContent;
  editDietNameIcon.classList.remove("show-opacity");
  createDietNameBtn.classList.add("display-none");
  editDietNameBtn.classList.add("display-flex");
});

editDietNameBtn.addEventListener("click", () => {
  addDietName();
});

// ======================close btn ====================
closeBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let id = e.target.dataset.close;
    let container = document.querySelector(`.${id}`);
    container.classList.remove("display-flex");
    overlay.classList.add("display-none");
  });
});

searchInput.addEventListener("input", () => {
  liveSearch();
});

// ===============toggle ingredient container =========================
toggleIngredientsList.addEventListener("click", () => {
  ingredientsContainer.classList.add("display-flex");
  overlay.classList.remove("display-none");
  displayIngredientsArray(ingredientsArray);
});

// ========displaying the exercices we have inside the exercises list container

const displayIngredientsArray = (arr) => {
  ingredientsList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].selected === false) {
      ingredientsList.innerHTML += `<div class="ingredient-content">
      <span class="check-box" data-ingredient =${i}
        ><i class="fa-solid fa-check" id="check-icon"></i
      ></span>

      <p class="ingredient-name">${arr[i].name}</p>
      <span class="calories-stats">${arr[i].calories} cal</span>
    </div>`;
    } else {
      ingredientsList.innerHTML += `<div class="ingredient-content">
    <span class="check-box change-check-box-background" data-ingredient =${i}
      ><i class="fa-solid fa-check" id="check-icon"></i
    ></span>
    <p class="ingredient-name">${arr[i].name}</p>
    <span class="calories-stats">${arr[i].calories} cal</span>
  </div>`;
    }
  }
  // ===================managing the checkbox and pushing or removing the exercises to selected exercises array
  const checkbox = document.querySelectorAll(".check-box");
  checkbox.forEach((box) => {
    box.addEventListener("click", (e) => {
      let ingredientIndex = box.dataset.ingredient;

      box.classList.toggle("change-check-box-background");
      if (arr[ingredientIndex].selected === false) {
        arr[ingredientIndex].selected = true;
      } else {
        arr[ingredientIndex].selected = false;
      }
    });
  });
};

// =======================show alert function ===========================
const showAlert = async (alert) => {
  await alert.classList.add("display-flex");
  setTimeout(() => {
    alert.classList.remove("display-flex");
  }, 3000);
};

// ================ adding the program name input value to the top of the page and the showing the edit icon
const addDietName = () => {
  if (dietNameInput.value.length === 0) {
    showAlert(nameInputAlert);
  } else {
    dietName.textContent = dietNameInput.value;
    editDietNameIcon.classList.add("show-opacity");
    overlay.classList.add("display-none");
    createDietNameContainer.classList.add("display-none");
    Diet.name = dietNameInput.value;
    submitDietBtn.classList.add("display-none");
  }
};

// ===================live search for exercises  ====================

const liveSearch = () => {
  const ingredientContent = document.querySelectorAll(".ingredient-content");
  let inputCharacter = searchInput.value.toUpperCase();

  ingredientContent.forEach((ingredient) => {
    // ============show all item when input is empty again
    if (searchInput === "") {
      ingredient.classList.remove("display-none");
    }
    // ==========search by charachter, display the ones that match,remove the ones that doesnt match================
    if (ingredient.textContent.toUpperCase().includes(inputCharacter)) {
      ingredient.classList.remove("display-none");
    } else if (!ingredient.textContent.toUpperCase().includes(inputCharacter)) {
      ingredient.classList.add("display-none");
    }
  });
};
