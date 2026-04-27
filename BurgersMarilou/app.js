const recipes = {
  viva: {
    title: "Viva Zapata",
    image: "assets/viva-zapata.png",
    accents: ["🥣", "🥬", "🌶️", "🥑", "🔺", "🥣"],
    positions: ["33%", "42%", "50%", "58%", "66%", "72%"],
    steps: [
      "Besmeer de onderste helft van het broodje met 1 à 2 theelepels limoenmayo.",
      "Leg daarop de sla en de burgerschijf.",
      "Schep 1 eetlepel jalapeñosalsa op de burger.",
      "Schik daarop 2 tot 3 plakjes tomaat en plakjes avocado.",
      "Strooi er tortillachips overheen.",
      "Besmeer de bovenste helft van elk broodje met de resterende limoenmayo, leg die erop en serveer direct.",
    ],
  },
  bonanza: {
    title: "Bonanza",
    image: "assets/bonanza.jpg",
    accents: ["🥬", "🥣", "🍖", "🥓", "🍔"],
    positions: ["36%", "45%", "54%", "63%", "72%"],
    steps: [
      "Beleg de onderste helft van het broodje met slablaadjes.",
      "Schep daarop 2 eetlepels coleslaw en leg er de burgerschijf op.",
      "Lepel 1 eetlepel whisky-barbecuesaus op de burgerschijf.",
      "Leg daarop 2 plakjes bacon en 2 tot 3 plakjes tomaat.",
      "Leg de bovenste helft van het broodje erop en serveer direct.",
    ],
  },
};

const choiceView = document.querySelector("#choice-view");
const recipeView = document.querySelector("#recipe-view");
const recipeTitle = document.querySelector("#recipe-title");
const stepsList = document.querySelector("#steps-list");
const progressFill = document.querySelector("#progress-fill");
const backButton = document.querySelector(".back-button");

function openRecipe(key) {
  const recipe = recipes[key];
  if (!recipe) return;

  recipeTitle.textContent = recipe.title;
  progressFill.style.width = "100%";
  stepsList.style.setProperty("--recipe-image", `url("${recipe.image}")`);
  recipeView.dataset.recipe = key;

  stepsList.innerHTML = recipe.steps
    .map((step, index) => {
      const accent = recipe.accents[index] || "♡";
      const imageY = recipe.positions[index] || "58%";
      return `
        <li class="step-card">
          <div class="step-panel">
            <span class="ingredient-art" style="--image-y: ${imageY}" aria-hidden="true">${accent}</span>
            <p class="step-text">${step}</p>
          </div>
        </li>
      `;
    })
    .join("");

  choiceView.classList.add("is-hidden");
  recipeView.classList.remove("is-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeRecipe() {
  recipeView.classList.add("is-hidden");
  choiceView.classList.remove("is-hidden");
  recipeView.removeAttribute("data-recipe");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

closeRecipe();

document.querySelectorAll("[data-recipe]").forEach((button) => {
  button.addEventListener("click", () => openRecipe(button.dataset.recipe));
});

backButton.addEventListener("click", closeRecipe);
