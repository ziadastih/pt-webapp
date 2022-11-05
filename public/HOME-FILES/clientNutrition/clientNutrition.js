const clientId = localStorage.getItem("cref");
const preLoader = document.querySelector(".gif");
const overlay = document.querySelector(".overlay");
const historyBtn = document.getElementById("history-btn");
const currentBtn = document.getElementById("current-btn");
const dietsGridContainer = document.querySelector(
  ".nutrition-programs-grid-container"
);

const getDiets = async () => {
  const { data } = await axios.get(`/api/v1/diet?createdFor=${clientId}`);
  preLoader.classList.add("display-none");
  let diets = data.diets;

  let currentDiet = diets.filter((element) => {
    return element.current === true;
  });

  displayMeals(currentDiet);

  currentBtn.addEventListener("click", () => {
    displayMeals(currentDiet);
    historyBtn.classList.remove("selected-btn");
    currentBtn.classList.add("selected-btn");
  });
  historyBtn.addEventListener("click", () => {
    displayAllPrograms(diets);
    currentBtn.classList.remove("selected-btn");
    historyBtn.classList.add("selected-btn");
  });
};

getDiets();

// =======================display current program  =================

const displayMeals = (Diet) => {
  dietsGridContainer.innerHTML = ``;
  for (let i = 0; i < Diet[0].meals.length; i++) {
    let meal = Diet[0].meals[i];
    dietsGridContainer.innerHTML += `<div class="one-meal-container">
      <div class="one-meal">
        <div class="meal-info">
        <i class="fa-solid fa-angle-up" id="show-ingredient" data-overview=${i}></i>
          <p class="meal-name">meal ${i + 1}</p>
        <span>${meal.ingredients.length} ing</span>
        </div>
        
      </div>
      <div class="meal-overview"></div>
      <div class="total-meal-macros">
        <div class="macros-info">
          <span>cal.</span>
          <p class="total-meal-cal">${meal.calories}</p>
        </div>
        <div class="macros-info">
          <span>carbs</span>
          <p class="total-meal-carbs">${meal.carbs}</p>
        </div>
        <div class="macros-info">
          <span>prot</span>
          <p class="total-meal-prot">${meal.protein}</p>
        </div>
        <div class="macros-info">
          <span>fat</span>
          <p class="total-meal-fat">${meal.fat}</p>
        </div>
      </div>
    </div>
   `;
  }

  let totalMacros = `<div class="total-diet-macros">
  <div class="macros-info">
    <span>cal.</span>
    <p class="total-diet-cal">${Diet[0].macros.calories}</p>
  </div>
  <div class="macros-info">
    <span>carbs</span>
    <p class="total-diet-carbs">${Diet[0].macros.carbs}</p>
  </div>
  <div class="macros-info">
    <span>prot</span>
    <p class="total-diet-prot">${Diet[0].macros.protein}</p>
  </div>
  <div class="macros-info">
    <span>fat</span>
    <p class="total-diet-fat">${Diet[0].macros.fat}</p>
  </div>
</div>
</div>`;

  dietsGridContainer.innerHTML += totalMacros;
  // =============meal overview ============================
  const oneMeal = document.querySelectorAll(".one-meal-container");
  oneMeal.forEach((meal) => {
    const toggleOverview = meal.querySelector("#show-ingredient");
    const overviewContainer = meal.querySelector(".meal-overview");

    toggleOverview.addEventListener("click", () => {
      const mealIndex = toggleOverview.dataset.overview;
      overviewContainer.innerHTML = ``;
      oneMeal.forEach((subMeal) => {
        if (subMeal === meal) {
          subMeal.classList.toggle("show-ingredients");
          const ingredients = Diet[0].meals[mealIndex].ingredients;

          for (let e = 0; e < ingredients.length; e++) {
            let ingredient = ingredients[e];
            overviewContainer.innerHTML += `<div class="one-ingredient-overview-container"> 
  <div class="ingredient-info">
  <h2 class="name">${ingredient.name}</h2>
  <div class="info-input-container">
  <div class = "portion-overview"
  <p>${ingredient.portion} ${ingredient.type}</p>
  </div>
  </div>
  </div>
  <div class="ingredient-macros">
  <div class="macros-info">
  <span>cal.</span>
  <p class="cal-value">${ingredient.calories}</p>
  </div>
  <div class="macros-info">
  <span>carbs</span>
  <p class="carbs-value">${ingredient.carbs}g</p>
  </div>
  <div class="macros-info">
  <span>prot</span>
  <p class="prot-value">${ingredient.protein}g</p>
  </div>
  <div class="macros-info">
  <span>fat</span>
  <p class="fat-value">${ingredient.fat}g</p>
  </div>
  </div>
  </div>`;
          }
        } else {
          subMeal.classList.remove("show-ingredients");
        }
      });
    });
  });
};

// ================display all programs =======================

const displayAllPrograms = (Diets) => {
  dietsGridContainer.innerHTML = "";
  for (let i = 0; i < Diets.length; i++) {
    let diet = Diets[i];
    if (diet.name.length > 13) {
      diet.name = `${diet.name.slice(0, 13)}..`;
    }
    dietsGridContainer.innerHTML += `<div class="one-diet-container">
      <div class="diet">
        <span>${diet.meals.length} m.</span>
        <p>${diet.name}</p>
       <span></span>
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
};
// ==============================logout and back btn ==================
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

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/clientHomepage/clientHomepage.html";
});
