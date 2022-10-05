const exercices = [
  {
    name: "Seated Alternating Hammer Curls",
  },
  {
    name: "Rotating Alternate Incline Bicep Curls",
  },
  {
    name: "Alternating Deltoid Raise",
  },
  {
    name: "Standing Alternate Rotating Bicep Curls ",
  },
  {
    name: "Alternating Dumbbell Floor Press ",
  },
  {
    name: "Alternating Dumbbell Floor Press ",
  },
  {
    name: "Alternating Front Raise",
  },
  {
    name: "Alternating Preacher Curl",
  },
  {
    name: "Seated Arnold Press",
  },
  {
    name: "Seated Arnold Press",
  },
  {
    name: "Around The Worlds",
  },
  {
    name: "Bent-Arm Dumbbell Pullover",
  },
  {
    name: "Standing Rear Delt Flyes Head Against Bench",
  },
  {
    name: "Dumbbell Bent Over Rows",
  },
  {
    name: "Dumbbell Bent Over Rows",
  },
  {
    name: "Dumbbell Bent Over Rows Neutral Grip",
  },
  {
    name: "Car Drivers",
  },
];

const exercicesListContainer = document.querySelector(
  ".exercises-list-container"
);
const displayExercicesArray = () => {
  for (let i = 0; i < exercices.length; i++) {
    exercicesListContainer.innerHTML += `<div class="exercise">
    <span class="check-box" data-exercise =${i}
      ><i class="fa-solid fa-check" id="check-icon"></i
    ></span>
    <img
      src="../images/anastase-maragos-HyvE5SiKMUs-unsplash.jpg"
      class="exercise-img"
      alt=""
    />
    <p class="exercise-name">${exercices[i].name}</p>
  </div>`;
  }
};

displayExercicesArray();
