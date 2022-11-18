const clientId = localStorage.getItem("cref");
const mealContainer = document.querySelector(".meal-container");
const currentDietCalories = document.querySelector(".current-diet-cal");
const currentDietProt = document.querySelector(".current-diet-prot");
const currentDietCarbs = document.querySelector(".current-diet-carbs");
const currentDietFat = document.querySelector(".current-diet-fat");
const circle = document.querySelector(".circle");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const mealNumber = document.querySelector(".meal-number");
const preLoader = document.querySelector(".gif");
const overlay = document.querySelector(".overlay");
let number = 0;
let mealsArr = [];

const getCurrentDiet = async () => {
  const { data } = await axios.get(`/api/v1/diet?current=${clientId}`);
  let dietId = data.diets[0]._id;

  currentDietCalories.textContent = data.diets[0].macros.calories;
  currentDietCarbs.textContent = data.diets[0].macros.carbs;
  currentDietProt.textContent = data.diets[0].macros.protein;
  currentDietFat.textContent = data.diets[0].macros.fat;
  mealsArr = data.diets[0].meals;
  console.log(mealsArr);
  mealNumber.textContent = `${number + 1} `;
  displayCurrentMeal(mealsArr[0]);
  const { data: dailyMacros } = await axios.get(
    `/api/v1/dailyMacros/${clientId}`
  );
  preLoader.classList.add("display-none");
  overlay.classList.add("display-none");
  let currentMacros = dailyMacros.dailyMacros.currentMacros;

  // ============circle event ===================

  circle.addEventListener("click", async () => {
    preLoader.classList.remove("display-none");
    overlay.classList.remove("display-none");
    if (!circle.classList.contains("checked-circle")) {
      mealsArr[number].checked = true;
      let mealProt = currentMacros.prot + parseFloat(mealsArr[number].protein);
      let mealCarbs = currentMacros.carbs + parseFloat(mealsArr[number].carbs);
      let mealCal =
        currentMacros.calories + parseFloat(mealsArr[number].calories);
      let mealFat = currentMacros.fat + parseFloat(mealsArr[number].fat);

      currentMacros.prot = Math.round(mealProt * 100) / 100;
      currentMacros.fat = Math.round(mealFat * 100) / 100;
      currentMacros.carbs = Math.round(mealCarbs * 100) / 100;
      currentMacros.calories = Math.round(mealCal * 100) / 100;

      const updateDiet = await axios.patch(`/api/v1/diet/${dietId}/?update=1`, {
        meals: mealsArr,
      });
      const updateDailyMacros = await axios.patch(
        `/api/v1/dailyMacros/${clientId}`,
        {
          currentMacros: currentMacros,
        }
      );
      circle.classList.add("checked-circle");
      overlay.classList.add("display-none");
      preLoader.classList.add("display-none");
    } else {
      mealsArr[number].checked = false;
      let mealProt = currentMacros.prot - parseFloat(mealsArr[number].protein);
      let mealCarbs = currentMacros.carbs - parseFloat(mealsArr[number].carbs);
      let mealCal =
        currentMacros.calories - parseFloat(mealsArr[number].calories);
      let mealFat = currentMacros.fat - parseFloat(mealsArr[number].fat);

      currentMacros.prot = Math.round(mealProt * 100) / 100;
      currentMacros.fat = Math.round(mealFat * 100) / 100;
      currentMacros.carbs = Math.round(mealCarbs * 100) / 100;
      currentMacros.calories = Math.round(mealCal * 100) / 100;
      const updateDiet = await axios.patch(`/api/v1/diet/${dietId}?update=1`, {
        meals: mealsArr,
      });
      const updateDailyMacros = await axios.patch(
        `/api/v1/dailyMacros/${clientId}`,
        {
          currentMacros: currentMacros,
        }
      );
      circle.classList.remove("checked-circle");
      overlay.classList.add("display-none");
      preLoader.classList.add("display-none");
    }
  });
  // ==============next btn ================
  nextBtn.addEventListener("click", () => {
    number++;

    if (mealsArr[number].checked === false) {
      circle.classList.remove("checked-circle");
    } else {
      circle.classList.add("checked-circle");
    }
    displayCurrentMeal(mealsArr[number]);
    mealNumber.textContent = `${number + 1}`;
    prevBtn.classList.remove("remove-opacity");
    if (number === mealsArr.length - 1) {
      nextBtn.classList.add("remove-opacity");
    }
  });

  // =============prev btn  ====================
  prevBtn.addEventListener("click", () => {
    number--;

    if (mealsArr[number].checked === false) {
      circle.classList.remove("checked-circle");
    } else {
      circle.classList.add("checked-circle");
    }
    displayCurrentMeal(mealsArr[number]);
    mealNumber.textContent = `${number + 1}`;
    nextBtn.classList.remove("remove-opacity");
    if (number === 0) {
      prevBtn.classList.add("remove-opacity");
    }
  });

  for (let i = 0; i < mealsArr.length; i++) {
    if (mealsArr[i].checked === false) {
      displayCurrentMeal(mealsArr[i]);
      number = i;
      if (i === 0) {
        prevBtn.classList.add("remove-opacity");
      }
      if (i === mealsArr.length - 1) {
        nextBtn.classList.add("remove-opacity");
      }
      mealNumber.textContent = `${i + 1}`;
      return;
    } else {
      displayCurrentMeal(mealsArr[0]);
      prevBtn.classList.add("remove-opacity");
    }
  }
};

getCurrentDiet();

// ======================display current meal  ==================

const displayCurrentMeal = (meal) => {
  mealContainer.innerHTML = ``;
  if (meal.checked === true) {
    circle.classList.add("checked-circle");
  } else {
    circle.classList.remove("checked-circle");
  }
  const ingredientsArr = meal.ingredients;

  const ingredientsList = ingredientsArr.map((ingredient) => {
    return `<div class="one-ingredient-container"> 
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
<span>prot.</span>
<p class="prot-value">${ingredient.protein}g</p>
</div>
<div class="macros-info">
<span>fat</span>
<p class="fat-value">${ingredient.fat}g</p>
</div>
</div>
</div>`;
  });

  mealContainer.innerHTML = ingredientsList.join(" ");

  mealContainer.innerHTML += `<div class="total-meal-macros">
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
};

// ==============back btn ============================
const backBtn = document.querySelector("#back-btn");

backBtn.addEventListener("click", () => {
  window.location =
    "http://192.168.1.195:3000/clientHomepage/clientHomepage.html";
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
