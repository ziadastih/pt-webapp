const Diet = {
  name: "",
  meals: [],
};

const ingredientsArray = [
  {
    name: "almonds",
    type: "pcs",
    calories: 100,
    protein: 40,
    carbs: 40,
    fat: 10,
    portion: 1,
    selected: false,
  },
  {
    name: "apple",
    type: "pcs",
    calories: 100,
    protein: 0,
    carbs: 50,
    fat: 0,
    portion: 1,
    selected: false,
  },
  {
    name: "banana",
    type: "pcs",
    calories: 100,
    protein: 0,
    carbs: 25,
    fat: 0,
    portion: 1,
    selected: false,
  },
  {
    name: "rice",
    type: "g",
    calories: 200,
    protein: 0,
    carbs: 50,
    fat: 1.2,
    portion: 100,
    selected: false,
  },
  {
    name: "pasta",
    type: "g",
    calories: 100,
    protein: 0,
    carbs: 50,
    fat: 0,
    portion: 100,
    selected: false,
  },
  {
    name: "chicken breast",
    type: "g",
    calories: 200,
    protein: 33,
    carbs: 50,
    fat: 0,
    portion: 100,
    selected: false,
  },
  {
    name: "chicken wings",
    type: "g",
    calories: 420,
    protein: 0,
    carbs: 50,
    fat: 30,
    portion: 100,
    selected: false,
  },
  {
    name: "fish",
    type: "g",
    calories: 300,
    protein: 30,
    carbs: 50,
    fat: 22,
    portion: 100,
    selected: false,
  },
  {
    name: "meat",
    type: "g",
    calories: 100,
    protein: 0,
    carbs: 50,
    fat: 20,
    portion: 100,
    selected: false,
  },
  {
    name: "low fat yoghurt",
    type: "cup",
    calories: 180,
    protein: 5.2,
    carbs: 50,
    fat: 23,
    portion: 1,
    selected: false,
  },
  {
    name: "rice cake",
    type: "pcs",
    calories: 50,
    protein: 0,
    carbs: 50,
    fat: 0,
    portion: 1,
    selected: false,
  },
  {
    name: "peanut butter",
    type: "g",
    calories: 130,
    protein: 0,
    carbs: 50,
    fat: 0,
    portion: 100,
    selected: false,
  },
];
let selectedIngredientsArray = [];
let localId = localStorage.getItem("di");
// ============== program selectors and the overlay ================================================
const preLoader = document.querySelector(".gif");
const overlay = document.querySelector(".overlay");
const createDietNameContainer = document.querySelector(".create-diet-name");
const dietNameInput = document.querySelector("#diet-input-name");
const editDietNameBtn = document.querySelector(".edit-diet-name");

const dietName = document.querySelector(".diet-name-header");
const editDietNameIcon = document.querySelector(".edit-diet-name-icon");
const nameInputAlert = document.querySelector(".create-diet-name-alert");
const editDietBtn = document.querySelector("#edit-diet");
const closeBtn = document.querySelectorAll("#close-btn");

// ===================ingredients container that hold our data names and images and checkbox ===========
const toggleIngredientsList = document.querySelector(
  "#toggle-ingredients-container"
);
const ingredientsContainer = document.querySelector(
  ".add-ingredients-container"
);
const ingredientsList = document.querySelector(".ingredients-list-container");
const addIngredientsBtn = document.querySelector("#add-ingredients");

const searchInput = document.querySelector(".search-input");
const chosenIngredientsContainer = document.querySelector(
  ".chosen-ingredients-container"
);
const submitMealBtn = document.querySelector(".submit-meal-btn");
const editMealBtn = document.querySelector(".edit-meal-btn");

// ============create new ingredient ==================
const toggleNewIngredientContainer = document.querySelector(
  "#toggle-new-ingredient-name"
);
const newIngredientContainer = document.querySelector(
  ".new-ingredient-name-container"
);
const newIngredientCal = document.querySelector("#new-cal");
const newIngredientCarbs = document.querySelector("#new-carbs");
const newIngredientProt = document.querySelector("#new-prot");
const newIngredientFat = document.querySelector("#new-fat");
const ingredientNameAlert = document.querySelector(
  ".create-ingredient-name-alert"
);
const ingredientTypeBtns = document.querySelectorAll(".type-btn");
const ingredientNameInput = document.querySelector("#new-ingredient-name");
const submitNewIngredient = document.querySelector("#submit-new-ingredient");
// ===============total ingredients Container and macros selectors==============
const totalIngredientsMacros = document.querySelector(
  ".total-ingredients-macros"
);
const totalIngredientsCal = document.querySelector(".total-ingredients-cal");
const totalIngredientsCarbs = document.querySelector(
  ".total-ingredients-carbs"
);
const totalIngredientsProt = document.querySelector(".total-ingredients-prot");
const totalIngredientsFat = document.querySelector(".total-ingredients-fat");

// ======================displaying created meals  -===================================
const createdMealsContainer = document.querySelector(
  ".created-meals-container"
);
const totalDietMacros = document.querySelector(".total-diet-macros");
const totalDietCal = document.querySelector(".total-diet-cal");
const totalDietCarbs = document.querySelector(".total-diet-carbs");
const totalDietProt = document.querySelector(".total-diet-prot");
const totalDietFat = document.querySelector(".total-diet-fat");

// ============================refreshing page alert =====================

const getDiet = async () => {
  const { data } = await axios.get(`/api/v1/diet/${localId}`);
  Diet.name = data.diet.name;
  Diet.meals = data.diet.meals;
  dietName.textContent = Diet.name;
  overlay.classList.add("display-none");
  CheckForCreatedIngredient();
  displayMeals();
};
getDiet();

window.onbeforeunload = () => {
  return "are you sure you want to leave page";
};
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  let clientId = localStorage.getItem("cref");
  if (clientId) {
    window.location =
      "http://192.168.1.195:3000/manageClientNutrition/manageClientNutrition.html";
  } else {
    window.location = "http://192.168.1.195:3000/MyNutrition/myNutrition.html";
  }
});
editDietBtn.addEventListener("click", async () => {
  let clientId = localStorage.getItem("cref");

  preLoader.classList.add("display-flex");
  const diet = await axios.patch(`/api/v1/diet/${localId}`, {
    name: Diet.name,
    meals: Diet.meals,
    macros: {
      calories: totalDietCal.textContent,
      protein: totalDietProt.textContent,
      carbs: totalDietCarbs.textContent,
      fat: totalDietFat.textContent,
    },
  });

  preLoader.classList.remove("display-flex");
  if (clientId) {
    window.onbeforeunload = null;
    window.location =
      "http://192.168.1.195:3000/manageClientNutrition/manageClientNutrition.html";
  } else {
    window.onbeforeunload = null;
    window.location = "http://192.168.1.195:3000/MyNutrition/myNutrition.html";
  }
});
// ===============event listener for adding program/ edit icon / and edit program name =============

editDietNameIcon.addEventListener("click", () => {
  createDietNameContainer.classList.add("display-flex");
  overlay.classList.remove("display-none");
  dietNameInput.value = dietName.textContent;
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
addIngredientsBtn.addEventListener("click", () => {
  displayChosenIngredients();
  ingredientsContainer.classList.remove("display-flex");
  overlay.classList.add("display-none");
  createdMealsContainer.classList.remove("display-flex");
  if (!editMealBtn.classList.contains("display-flex")) {
    submitMealBtn.classList.add("display-flex");
  }
  totalDietMacros.classList.remove("display-flex");
  editDietBtn.classList.add("display-none");
});

toggleNewIngredientContainer.addEventListener("click", () => {
  ingredientsContainer.classList.remove("display-flex");
  newIngredientContainer.classList.add("display-flex");
  overlay.classList.remove("display-none");
});

ingredientTypeBtns.forEach((ingredientBtn) => {
  ingredientBtn.addEventListener("click", () => {
    ingredientTypeBtns.forEach((subBtn) => {
      if (subBtn === ingredientBtn) {
        subBtn.classList.add("selected-type");
      } else {
        subBtn.classList.remove("selected-type");
      }
    });
  });
});

submitNewIngredient.addEventListener("click", () => {
  if (ingredientNameInput.value.length === 0) {
    showAlert(ingredientNameAlert);
    console.log(ingredientTypeBtns);
  } else {
    ingredientTypeBtns.forEach((btn) => {
      if (btn.classList.contains("selected-type")) {
        let type = btn.dataset.type;

        let portion = parseInt(btn.dataset.portion);

        ingredientsArray.push({
          name: ingredientNameInput.value,
          type: type,
          calories: parseFloat(newIngredientCal.value) || 0,
          protein: parseFloat(newIngredientProt.value) || 0,
          carbs: parseFloat(newIngredientCarbs.value) || 0,
          fat: parseFloat(newIngredientFat.value) || 0,
          portion: portion,
          new: true,
        });
        selectedIngredientsArray.push({
          name: ingredientNameInput.value,
          type: type,
          calories: parseFloat(newIngredientCal.value) || 0,
          protein: parseFloat(newIngredientProt.value) || 0,
          carbs: parseFloat(newIngredientCarbs.value) || 0,
          fat: parseFloat(newIngredientFat.value) || 0,
          portion: portion,
        });
        ingredientsContainer.classList.add("display-flex");
        newIngredientContainer.classList.remove("display-flex");
        overlay.classList.remove("display-none");
      }
    });
  }
});

submitMealBtn.addEventListener("click", () => {
  submitMealFunction();
});
editMealBtn.addEventListener("click", () => {
  editMealFunction();
});
// ========displaying the ingredients we have inside the ingredient list container

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
        selectedIngredientsArray.push({
          name: arr[ingredientIndex].name,
          type: arr[ingredientIndex].type,
          calories: arr[ingredientIndex].calories,
          protein: arr[ingredientIndex].protein,
          carbs: arr[ingredientIndex].carbs,
          fat: arr[ingredientIndex].fat,
          portion: arr[ingredientIndex].portion,
        });
      } else {
        arr[ingredientIndex].selected = false;

        const index = selectedIngredientsArray.findIndex((Element) => {
          return Element.name === arr[ingredientIndex].name;
        });
        if (index !== -1) {
          selectedIngredientsArray.splice(index, 1);
        }
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

    overlay.classList.add("display-none");
    createDietNameContainer.classList.remove("display-flex");
    Diet.name = dietNameInput.value;
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

// =================display chosen ingredients ============
const displayChosenIngredients = () => {
  chosenIngredientsContainer.innerHTML = "";
  if (selectedIngredientsArray.length === 0) {
    totalIngredientsMacros.classList.remove("display-flex");
    submitMealBtn.classList.remove("display-flex");
    if (!editMealBtn.classList.contains("display-flex")) {
      totalDietMacros.classList.add("display-flex");
      editDietBtn.classList.remove("display-none");
      createdMealsContainer.classList.add("display-flex");
    }
  } else {
    totalIngredientsMacros.classList.add("display-flex");
    for (let i = 0; i < selectedIngredientsArray.length; i++) {
      let ingredient = selectedIngredientsArray[i];

      chosenIngredientsContainer.innerHTML += `<div class="one-ingredient-container"> 
      <div class="ingredient-info">
  <h2 class="name">${ingredient.name}</h2>
  <div class="info-input-container">
    <input type="number" id="ingredient-portion" data-input=${i} placeholder="0" value=${ingredient.portion}  />
    <p>${ingredient.type}</p>
    <i class="fa-solid fa-trash" id="delete-ingredient" data-delete = "${ingredient.name}"></i>
  </div>
  </div>
  <div class="ingredient-macros">
  <div class="macros-info">
    <span>cal.</span>
    <p class="cal-value">${ingredient.calories}</p>
  </div>
  <div class="macros-info">
    <span>carbs</span>
    <p class="carbs-value">${ingredient.carbs} g</p>
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
  }
  sumOfTotalIngredientsCal();
  sumOfTotalIngredientsCarbs();
  sumOfTotalIngredientsFat();
  sumOfTotalIngredientsProt();
  // =======================delete ingredient function ==============
  const deleteIngredientBtns = document.querySelectorAll("#delete-ingredient");

  deleteIngredientBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let name = btn.dataset.delete;

      const indexInIngredientsArray = ingredientsArray.findIndex((Element) => {
        return Element.name === name && Element.new === true;
      });

      if (indexInIngredientsArray !== -1) {
        ingredientsArray.splice(indexInIngredientsArray, 1);
      }

      const indexInSelectedArray = selectedIngredientsArray.findIndex(
        (Element) => {
          return Element.name === name;
        }
      );

      if (indexInSelectedArray !== -1) {
        selectedIngredientsArray.splice(indexInSelectedArray, 1);
        displayChosenIngredients();
        const indexInIngredientsArray = ingredientsArray.findIndex(
          (Element) => {
            return Element.name === name;
          }
        );

        if (indexInIngredientsArray !== -1) {
          ingredientsArray[indexInIngredientsArray].selected = false;
        }
      }
    });
  });

  // ====================== selectors =====================

  const oneIngredientContainer = document.querySelectorAll(
    ".one-ingredient-container"
  );
  // ===============ingredient containers forEach ====================
  oneIngredientContainer.forEach((container) => {
    const portionInput = container.querySelector("#ingredient-portion");
    const calValue = container.querySelector(".cal-value");
    const protValue = container.querySelector(".prot-value");
    const fatValue = container.querySelector(".fat-value");
    const carbsValue = container.querySelector(".carbs-value");
    // ================portion input =========================
    portionInput.addEventListener("input", () => {
      let inputIndex = portionInput.dataset.input;
      const ingredient = selectedIngredientsArray[inputIndex];
      const originalIngredientIndex = ingredientsArray.findIndex((Element) => {
        return Element.name === ingredient.name;
      });
      if (originalIngredientIndex !== -1) {
        const originalIngredient = ingredientsArray[originalIngredientIndex];

        if (portionInput.value.length === 0) {
          calValue.textContent = 0;
          protValue.textContent = "0g";
          fatValue.textContent = "0g";
          carbsValue.textContent = "0g";
          ingredient.calories = 0;
          ingredient.carbs = 0;
          ingredient.fat = 0;
          ingredient.protein = 0;
          ingredient.portion = 0;
          sumOfTotalIngredientsCal();
          sumOfTotalIngredientsCarbs();
          sumOfTotalIngredientsFat();
          sumOfTotalIngredientsProt();
        }

        ingredient.calories =
          (portionInput.value * originalIngredient.calories) /
          originalIngredient.portion;

        ingredient.carbs =
          (portionInput.value * originalIngredient.carbs) /
          originalIngredient.portion;

        ingredient.fat =
          (portionInput.value * originalIngredient.fat) /
          originalIngredient.portion;

        ingredient.protein =
          (portionInput.value * originalIngredient.protein) /
          originalIngredient.portion;
        let roundedFatValue = Math.round(ingredient.fat * 100) / 100;
        let roundedProtValue = Math.round(ingredient.protein * 100) / 100;
        let roundedCalValue = Math.round(ingredient.calories * 100) / 100;
        let roundedCarbsValue = Math.round(ingredient.carbs * 100) / 100;
        ingredient.portion = portionInput.value;
        calValue.textContent = roundedCalValue;
        protValue.textContent = `${roundedProtValue}g`;
        fatValue.textContent = `${roundedFatValue}g`;
        carbsValue.textContent = `${roundedCarbsValue}g`;
        sumOfTotalIngredientsCal();
        sumOfTotalIngredientsCarbs();
        sumOfTotalIngredientsFat();
        sumOfTotalIngredientsProt();
      }
    });
  });
};
// ==========sum of total ingredients =========================

const sumOfTotalIngredientsCal = () => {
  const total = selectedIngredientsArray.reduce((currentSum, ingredient) => {
    return ingredient.calories + currentSum;
  }, 0);

  const TotalNum = Math.round(total * 100) / 100;

  totalIngredientsCal.textContent = TotalNum;
};
// ==============sumOfToTalIngredientsCarbs ===========

const sumOfTotalIngredientsCarbs = () => {
  const total = selectedIngredientsArray.reduce((currentSum, ingredient) => {
    return ingredient.carbs + currentSum;
  }, 0);
  const TotalNum = Math.round(total * 100) / 100;

  totalIngredientsCarbs.textContent = `${TotalNum}g`;
};

// ============sumOfTotalIngredientsProt =============

const sumOfTotalIngredientsProt = () => {
  const total = selectedIngredientsArray.reduce((currentSum, ingredient) => {
    return ingredient.protein + currentSum;
  }, 0);
  const TotalNum = Math.round(total * 100) / 100;

  totalIngredientsProt.textContent = `${TotalNum}g`;
};

// =============sumTotalIngredientfat ==========

const sumOfTotalIngredientsFat = () => {
  const total = selectedIngredientsArray.reduce((currentSum, ingredient) => {
    return ingredient.fat + currentSum;
  }, 0);
  const TotalNum = Math.round(total * 100) / 100;

  totalIngredientsFat.textContent = `${TotalNum}g`;
};

const submitMealFunction = () => {
  Diet.meals.push({
    calories: totalIngredientsCal.textContent,
    carbs: totalIngredientsCarbs.textContent,
    protein: totalIngredientsProt.textContent,
    fat: totalIngredientsFat.textContent,
    ingredients: selectedIngredientsArray,
  });
  console.log(Diet);
  selectedIngredientsArray = [];
  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsArray[i].selected = false;
  }
  createdMealsContainer.classList.add("display-flex");
  submitMealBtn.classList.remove("display-flex");
  displayChosenIngredients();
  displayIngredientsArray(ingredientsArray);
  displayMeals();
};

const displayMeals = () => {
  createdMealsContainer.innerHTML = "";

  if (Diet.meals.length === 0) {
    createdMealsContainer.classList.remove("display-flex");
    totalDietMacros.classList.remove("display-flex");
    editDietBtn.classList.add("display-none");
  } else {
    createdMealsContainer.classList.add("display-flex");
    for (let i = 0; i < Diet.meals.length; i++) {
      let meal = Diet.meals[i];
      createdMealsContainer.innerHTML += `<div class="one-meal-container">
      <div class="one-meal">
        <div class="meal-info">
          <i
            class="fa-solid fa-list"
            id="show-ingredient"
            data-overview=${i}
          ></i>
          <p class="meal-name">meal</p>
          <div class="tools">
            <i class="fa-solid fa-trash" id="delete-meal" data-delete=${i}></i>
            <i
              class="fa-regular fa-pen-to-square"
              id="edit-meal-icon"
              data-edit=${i}
            ></i>
          </div>
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
    </div>`;
    }

    // ===========total macros per meal and total macros per diet ==========
    totalDietMacros.classList.add("display-flex");
    editDietBtn.classList.remove("display-none");
    totalDietCalFunction();
    totalDietCarbsFunction();
    totalDietFatFunction();
    totalDietProtFunction();

    // ==============================delete meals  =================
    const deleteMealBtns = document.querySelectorAll("#delete-meal");
    deleteMealBtns.forEach((btn) => {
      let MealIndex = btn.dataset.delete;
      btn.addEventListener("click", () => {
        Diet.meals.splice(MealIndex, 1);
        displayMeals();
      });
    });

    // ========================edit meals ============================

    const editMealBtns = document.querySelectorAll("#edit-meal-icon");
    editMealBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", () => {
        let mealIndex = editBtn.dataset.edit;
        localStorage.setItem("mealIndex", JSON.stringify(mealIndex));
        selectedIngredientsArray = Diet.meals[mealIndex].ingredients;

        displayChosenIngredients();
        changeSelectedToTrue();
        totalDietMacros.classList.remove("display-flex");
        editDietBtn.classList.add("display-none");
        createdMealsContainer.classList.remove("display-flex");
        submitMealBtn.classList.remove("display-flex");
        editMealBtn.classList.add("display-flex");
      });
    });

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
            const ingredients = Diet.meals[mealIndex].ingredients;

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
  <p class="carbs-value">${ingredient.carbs} g</p>
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
  }
};

const editMealFunction = () => {
  const mealIndex = JSON.parse(localStorage.getItem("mealIndex"));
  editDietBtn.classList.remove("display-none");
  editMealBtn.classList.remove("display-flex");

  let meal = Diet.meals[mealIndex];

  meal.calories = totalIngredientsCal.textContent;
  meal.carbs = totalIngredientsCarbs.textContent;
  meal.protein = totalIngredientsProt.textContent;
  meal.fat = totalIngredientsFat.textContent;
  meal.ingredients = selectedIngredientsArray;

  localStorage.removeItem("mealIndex");
  selectedIngredientsArray = [];

  for (let i = 0; i < ingredientsArray.length; i++) {
    if (ingredientsArray[i].selected === true) {
      ingredientsArray[i].selected = false;
    }
  }
  displayChosenIngredients();
  displayIngredientsArray(ingredientsArray);
  displayMeals();
};

// ========================total Diet calc function =============
const totalDietCarbsFunction = () => {
  const meals = Diet.meals;
  const total = meals.reduce((sum, meal) => {
    let carbs = parseFloat(meal.carbs);

    return carbs + sum;
  }, 0);
  let randomTotal = Math.round(total * 100) / 100;
  totalDietCarbs.textContent = `${randomTotal}g`;
};
const totalDietProtFunction = () => {
  const meals = Diet.meals;
  const total = meals.reduce((sum, meal) => {
    let prot = parseFloat(meal.protein);

    return prot + sum;
  }, 0);
  let randomTotal = Math.round(total * 100) / 100;
  totalDietProt.textContent = `${randomTotal}g`;
};
const totalDietFatFunction = () => {
  const meals = Diet.meals;
  const total = meals.reduce((sum, meal) => {
    let fat = parseFloat(meal.fat);

    return fat + sum;
  }, 0);
  let randomTotal = Math.round(total * 100) / 100;
  totalDietFat.textContent = `${randomTotal}g`;
};
const totalDietCalFunction = () => {
  const meals = Diet.meals;
  const total = meals.reduce((sum, meal) => {
    let currentCalories = parseFloat(meal.calories);
    return currentCalories + sum;
  }, 0);
  let randomTotal = Math.round(total * 100) / 100;
  totalDietCal.textContent = randomTotal;
};

// ====================set conditions for displaying  if rest day is true then manage stuff======

const changeSelectedToTrue = () => {
  for (let i = 0; i < selectedIngredientsArray.length; i++) {
    const index = ingredientsArray.findIndex((Element) => {
      return Element.name === selectedIngredientsArray[i].name;
    });

    if (index !== -1) {
      ingredientsArray[index].selected = true;
    } else {
      console.log("false");
    }
  }
};

const CheckForCreatedIngredient = () => {
  Diet.meals.forEach((meal) => {
    meal.ingredients.forEach((ingredient) => {
      const index = ingredientsArray.findIndex((Element) => {
        return Element.name === ingredient.name;
      });
      if (index == -1) {
        ingredientsArray.push({
          name: ingredient.name,
          type: ingredient.type,
          calories: parseFloat(ingredient.calories),
          protein: parseFloat(ingredient.protein),
          carbs: parseFloat(ingredient.carbs),
          fat: parseFloat(ingredient.fat),
          portion: parseFloat(ingredient.portion),
          new: true,
        });
      }
      console.log(ingredientsArray);
    });
  });
};
