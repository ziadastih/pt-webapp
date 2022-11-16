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
let number = 0;
let mealsArr = [];
const getCurrentDiet = async () => {
  const { data } = await axios.get(`/api/v1/diet?current=${clientId}`);
  let dietId = data.diets[0]._id;

  preLoader.classList.add("display-none");
  currentDietCalories.textContent = data.diets[0].macros.calories;
  currentDietCarbs.textContent = data.diets[0].macros.carbs;
  currentDietProt.textContent = data.diets[0].macros.protein;
  currentDietFat.textContent = data.diets[0].macros.fat;
  const meals = data.diets[0].meals;
  mealsArr = meals;
  circle.addEventListener("click", () => {
    preLoader.classList.remove("display-none");
    if (!circle.classList.contains("checked-circle")) {
      mealsArr[number].checked = true;
      let mealProt = parseFloat(mealsArr[number].protein);
      let mealCarbs = parseFloat(mealsArr[number].carbs);
      let mealCalories = parseFloat(mealsArr[number].calories);
      let mealFat = parseFloat(mealsArr[number].fat);

      circle.classList.add("checked-circle");
      preLoader.classList.add("display-none");
    } else {
      mealsArr[number].checked = false;
      let mealProt = parseFloat(mealsArr[number].protein);
      let mealCarbs = parseFloat(mealsArr[number].carbs);
      let mealCalories = parseFloat(mealsArr[number].calories);
      let mealFat = parseFloat(mealsArr[number].fat);
      circle.classList.remove("checked-circle");
      preLoader.classList.add("display-none");
    }
  });

  nextBtn.addEventListener("click", () => {
    number++;

    const meal = meals[number];
    displayCurrentMeal(meal);
    mealNumber.textContent = `${number + 1}`;
    prevBtn.classList.remove("remove-opacity");
    if (number === meals.length - 1) {
      nextBtn.classList.add("remove-opacity");
    }
  });

  prevBtn.addEventListener("click", () => {
    number--;

    const meal = meals[number];
    displayCurrentMeal(meal);
    mealNumber.textContent = `${number + 1}`;
    nextBtn.classList.remove("remove-opacity");
    if (number === 0) {
      prevBtn.classList.add("remove-opacity");
    }
  });
  mealsArr = meals;
  for (let i = 0; i < meals.length; i++) {
    if (meals[i].checked === false) {
      let meal = meals[i];
      number = i;
      displayCurrentMeal(meal);
      mealNumber.textContent = `${i + 1}`;
      return;
    }
  }

  // displayCurrentMeal(meal);
};

getCurrentDiet();

const displayCurrentMeal = (meal) => {
  mealContainer.innerHTML = ``;
  if (meal.checked === true) {
    circle.classList.add("check-circle");
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
