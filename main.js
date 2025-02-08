// main.js - Entry point that ties all modules together

import {
  renderElementsPanel,
  renderBiologicalPanel,
  renderEnergyPanel,
  renderSpecialsPanel,
  renderEssencePanel,
  renderPeoplePanel,
  renderPlacesPanel,
  renderNexusPanel,
  renderMythicalPanel,
  updateCombinationUI,
  renderStore,
  displayCreature,
  renderGlobalCatalog
} from "./render.js";
import { combineElements, handleGlobalDiscovery, handleDiscovererReward } from "./combine.js";
import { globalRecipes, setRoom, loadGameData, resortComponents } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Load persistent game data from localStorage.
  loadGameData();
  // Re-render the global discoveries log from saved data.
  renderGlobalCatalog();

  // Render panels.
  renderElementsPanel();
  renderBiologicalPanel();
  renderEnergyPanel();
  renderMythicalPanel();
  renderSpecialsPanel();
  renderEssencePanel();
  renderPeoplePanel();
  renderPlacesPanel();
  renderNexusPanel();
  updateCombinationUI();
  renderStore();

  // Set up event listeners for buttons.
  document.getElementById("combine-btn").addEventListener("click", combineElements);
  
  document.getElementById("toggle-catalog-btn").addEventListener("click", () => {
    const catalog = document.getElementById("global-catalog");
    if (catalog.style.display === "none" || catalog.style.display === "") {
      catalog.style.display = "block";
    } else {
      catalog.style.display = "none";
    }
  });

  document.getElementById("toggle-store-btn").addEventListener("click", () => {
    const storeSection = document.getElementById("store-section");
    if (storeSection.style.display === "none" || storeSection.style.display === "") {
      storeSection.style.display = "block";
    } else {
      storeSection.style.display = "none";
    }
  });
  
  // New: Set up the RESORT button to sort available component pools.
  document.getElementById("resort-btn").addEventListener("click", () => {
    resortComponents();
    renderElementsPanel();
    renderBiologicalPanel();
    renderEnergyPanel();
    renderMythicalPanel();
    renderSpecialsPanel();
    renderEssencePanel();
    renderPeoplePanel();
    renderPlacesPanel();
    renderNexusPanel();
  });

  // New: Set up toggle button for Notable Similar Projects.
  document.getElementById("toggle-similar-projects-btn").addEventListener("click", (event) => {
    event.stopPropagation();
    const dropdown = document.getElementById("similar-projects-dropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("similar-projects-dropdown");
    if (!event.target.closest("#toggle-similar-projects-btn") && !event.target.closest("#similar-projects-dropdown")) {
      dropdown.style.display = "none";
    }
  });

  // NEW: Set up search in the store – re-render store on input.
  const storeSearch = document.getElementById("store-search");
  if (storeSearch) {
    storeSearch.addEventListener("input", () => {
      renderStore();
    });
  }

  // NEW: Set up catalog sort – re-render global catalog when sort is applied.
  const applySortBtn = document.getElementById("apply-sort-btn");
  if (applySortBtn) {
    applySortBtn.addEventListener("click", () => {
      renderGlobalCatalog();
    });
  }

  // Initialize multiplayer connection.
  // Assume WebsimSocket is globally available.
  const room = new WebsimSocket();
  setRoom(room);
  room.onmessage = (event) => {
    const data = event.data;
    switch (data.type) {
      case "newDiscovery":
        handleGlobalDiscovery(data);
        renderStore();
        break;
      case "discovererReward":
        handleDiscovererReward(data);
        break;
      case "updatePreviewImage": {
        const { creatureId, newImageUrl } = data;
        if (globalRecipes[creatureId]) {
          globalRecipes[creatureId].svg = `<img src="${newImageUrl}" alt="${globalRecipes[creatureId].name}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />`;
          renderGlobalCatalog();
        }
        break;
      }
    }
  };

  // Subscribe to persistent recipes collection for global updates.
  room.collection("recipe").subscribe((recipes) => {
    recipes.forEach((recipe) => {
      if (!globalRecipes[recipe.id]) {
        globalRecipes[recipe.id] = recipe;
        displayCreature(recipe);
      }
    });
    renderStore();
  });
});