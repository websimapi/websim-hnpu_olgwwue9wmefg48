// render.js - Handles UI rendering of components, discoveries, recipe store, and interactive discovery details.

import {
  availableElements,
  availableBiologicals,
  availableEnergy,
  availableSpecials,
  availableEssence,
  availablePeople,
  availablePlaces,
  availableNexus,
  availableMythical,
  selectedComponents,
  playerCurrency,
  globalRecipes,
  ownedRecipes,
  saveGameData,
  resortComponents,
  calculateTax
} from "./data.js";
import { generateOutputImage } from "./combine.js";
import { getRoom } from "./data.js";

// Returns an inline SVG string for a component based on its type and id.
export function getComponentSVG(component) {
  if (component.svg) return component.svg;
  // Element components
  if (component.componentType === "element") {
    switch (component.id) {
      case "hydrogen":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="${component.color}" />
          <circle cx="50" cy="50" r="10" fill="#fff" />
        </svg>`;
      case "oxygen":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="${component.color}" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#fff" stroke-width="4" />
        </svg>`;
      case "carbon":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" fill="${component.color}" />
        </svg>`;
      case "nitrogen":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <polygon points="50,10 90,50 50,90 10,50" fill="${component.color}" />
        </svg>`;
      case "silicon":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <rect x="15" y="15" width="70" height="70" fill="${component.color}" rx="10" ry="10" />
        </svg>`;
      case "iron":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <rect x="30" y="20" width="40" height="60" fill="${component.color}" />
        </svg>`;
      case "magnesium":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <polygon points="50,15 85,85 15,85" fill="${component.color}" />
        </svg>`;
      case "calcium":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <polygon points="50,10 90,40 75,85 25,85 10,40" fill="${component.color}" />
        </svg>`;
      case "copper":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="25" fill="${component.color}" />
        </svg>`;
      case "aluminum":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="25" fill="${component.color}" stroke="#ccc" stroke-width="5"/>
        </svg>`;
      case "organic_matter":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <path d="M50 10 Q70 30, 50 90 Q30 30, 50 10" fill="${component.color}" />
        </svg>`;
      case "carbon_dioxide":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="30" cy="50" r="10" fill="${component.color}" />
          <circle cx="50" cy="50" r="10" fill="${component.color}" />
          <circle cx="70" cy="50" r="10" fill="${component.color}" />
          <line x1="40" y1="50" x2="45" y2="50" stroke="#fff" stroke-width="2"/>
          <line x1="55" y1="50" x2="60" y2="50" stroke="#fff" stroke-width="2"/>
        </svg>`;
      default:
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="${component.color}" />
        </svg>`;
    }
  } else if (component.componentType === "biological") {
    // Biological components
    switch (component.id) {
      case "lipids":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <path d="M50 10 Q70 30, 50 90 Q30 30, 50 10" fill="${component.color}" />
        </svg>`;
      case "proteins":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="40" r="20" fill="${component.color}" />
          <circle cx="50" cy="70" r="10" fill="#fff" />
        </svg>`;
      case "carbohydrates":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <polygon points="50,15 85,50 50,85 15,50" fill="${component.color}" />
        </svg>`;
      case "cytoplasm":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="30" ry="20" fill="${component.color}" />
        </svg>`;
      case "dna":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <path d="M40 10 Q50 50, 40 90" stroke="${component.color}" stroke-width="8" fill="none" />
          <path d="M60 10 Q50 50, 60 90" stroke="${component.color}" stroke-width="8" fill="none" />
        </svg>`;
      case "microtubules":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <line x1="30" y1="20" x2="30" y2="80" stroke="${component.color}" stroke-width="8"/>
          <line x1="50" y1="20" x2="50" y2="80" stroke="${component.color}" stroke-width="8"/>
          <line x1="70" y1="20" x2="70" y2="80" stroke="${component.color}" stroke-width="8"/>
        </svg>`;
      case "atp":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <polygon points="50,15 85,50 50,85 15,50" fill="${component.color}" />
          <text x="50%" y="55%" text-anchor="middle" fill="#fff" font-size="20" font-family="Arial">ATP</text>
        </svg>`;
      case "enzymes":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="25" fill="${component.color}" />
          <circle cx="50" cy="50" r="10" fill="#fff" />
        </svg>`;
      case "organelles":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="40" cy="40" r="10" fill="${component.color}" />
          <circle cx="60" cy="60" r="10" fill="${component.color}" />
          <circle cx="70" cy="30" r="10" fill="${component.color}" />
        </svg>`;
      default:
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="${component.color}" />
        </svg>`;
    }
  } else if (component.componentType === "energy") {
    // Energy components
    switch (component.id) {
      case "heat":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <path d="M50 10 C60 30, 70 50, 50 70 C30 50, 40 30, 50 10" fill="${component.color}" />
        </svg>`;
      case "cold":
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="${component.color}" />
        </svg>`;
      default:
        return `<svg class="component-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="${component.color}" />
        </svg>`;
    }
  } else if (component.componentType === "special") {
    // Special components
    return `<svg class="component-svg" viewBox="0 0 100 100">
      <polygon points="50,10 61,40 92,40 67,60 76,91 50,70 24,91 33,60 8,40 39,40" fill="${component.color || '#FF69B4'}" />
    </svg>`;
  } else if (component.componentType === "mythical") {
    // Mythical components – use a distinctive style.
    return `<svg class="component-svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="28" fill="${component.color || '#DA70D6'}" stroke="#fff" stroke-width="4"/>
      <polygon points="50,15 60,40 85,40 65,55 75,80 50,65 25,80 35,55 15,40 40,40" fill="none" stroke="#fff" stroke-width="2"/>
    </svg>`;
  }
  return "";
}

// Render available elemental fundamentals.
export function renderElementsPanel() {
  const elementsList = document.getElementById("elements-list");
  elementsList.innerHTML = "";
  availableElements.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    elementsList.appendChild(item);
  });
}

// Render available biological components.
export function renderBiologicalPanel() {
  const bioList = document.getElementById("biological-list");
  bioList.innerHTML = "";
  availableBiologicals.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    bioList.appendChild(item);
  });
}

// Render Energy panel.
export function renderEnergyPanel() {
  const energyList = document.getElementById("energy-list");
  energyList.innerHTML = "";
  availableEnergy.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    energyList.appendChild(item);
  });
}

// Render Mythical Creatures panel.
export function renderMythicalPanel() {
  const mythicalList = document.getElementById("mythical-list");
  mythicalList.innerHTML = "";
  availableMythical.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    mythicalList.appendChild(item);
  });
}

// Render Special Discoveries panel.
export function renderSpecialsPanel() {
  const specialsList = document.getElementById("specials-list");
  specialsList.innerHTML = "";
  availableSpecials.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML =
      getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    specialsList.appendChild(item);
  });
}

// Render Essence panel.
export function renderEssencePanel() {
  const essenceList = document.getElementById("essence-list");
  essenceList.innerHTML = "";
  availableEssence.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    essenceList.appendChild(item);
  });
}

// Render People panel.
export function renderPeoplePanel() {
  const peopleList = document.getElementById("people-list");
  peopleList.innerHTML = "";
  availablePeople.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    peopleList.appendChild(item);
  });
}

// Render Places panel.
export function renderPlacesPanel() {
  const placesList = document.getElementById("places-list");
  placesList.innerHTML = "";
  availablePlaces.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    placesList.appendChild(item);
  });
}

// Render Nexus panel.
export function renderNexusPanel() {
  const nexusList = document.getElementById("nexus-list");
  nexusList.innerHTML = "";
  availableNexus.forEach((component) => {
    const item = document.createElement("div");
    item.classList.add("component-item");
    item.dataset.componentId = component.id;
    item.innerHTML = getComponentSVG(component) + `<div class="component-name">${component.name}</div>`;
    item.addEventListener("click", () => {
      if (window.addToCombination) window.addToCombination(component);
    });
    nexusList.appendChild(item);
  });
}

// Update the combination area in the UI.
export function updateCombinationUI() {
  const comboContainer = document.getElementById("combination-container");
  comboContainer.innerHTML = "";
  selectedComponents.forEach((component, index) => {
    const comboItem = document.createElement("div");
    comboItem.classList.add("combination-item");
    comboItem.dataset.index = index;
    comboItem.innerHTML = getComponentSVG(component);
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.removeFromCombination) window.removeFromCombination(index);
    });
    comboItem.appendChild(removeBtn);
    comboContainer.appendChild(comboItem);
  });
  updateCombineButtonState();
}

// Enable or disable the combine button based on the combination length.
export function updateCombineButtonState() {
  const combineBtn = document.getElementById("combine-btn");
  combineBtn.disabled = selectedComponents.length < 2;
}

// Update the player's currency display in the UI.
export function updateCurrencyUI(newCurrency) {
  document.getElementById("currency-counter").textContent = newCurrency;
}

// NEW: Display a generated creature on the Global Discovery Log.
export function displayCreature(creature) {
  const catalog = document.getElementById("global-catalog");
  
  // If the element already exists, only update if there are meaningful changes
  const existingCard = catalog.querySelector(`[data-id="${creature.id}"]`);
  if (existingCard) {
    // Only update if there's a new image or it's newly discovered
    if (creature.firstTime || (creature.generatedImage && !existingCard.querySelector('img[src="' + creature.generatedImage + '"]'))) {
      existingCard.innerHTML = getCreatureCardContent(creature);
    }
    return;
  }

  // Create new card for unique discoveries
  const card = document.createElement("div");
  card.classList.add("result-card", `rarity-${creature.rarity}`);
  card.dataset.id = creature.id;
  card.innerHTML = getCreatureCardContent(creature);
  card.addEventListener("click", () => {
    showCreatureDetails(creature);
  });
  catalog.appendChild(card);
}

// Helper function to generate consistent card content
function getCreatureCardContent(creature) {
  const displayImage = creature.generatedImage ? 
    `<img src="${creature.generatedImage}" alt="${creature.name}" style="max-width: 100%; height: auto;" />` :
    creature.svg;

  return `
    <div class="image-container">
      ${displayImage}
      ${creature.firstTime ? '<div class="new-tag">New!</div>' : ''}
    </div>
    <h3>${creature.name}</h3>
    <p>${creature.description}</p>
    <div class="creature-info">
      <span class="creature-rarity">${creature.rarity.toUpperCase()}</span>
      <span class="creature-currency">Value: ${creature.currencyValue || 0}</span>
      <span class="creature-container">${creature.containerType.toUpperCase()}</span>
    </div>
    <div class="recipe-author">
      <img src="https://images.websim.ai/avatar/${(creature.discovered_by && creature.discovered_by.username) || 'unknown'}" 
           alt="${(creature.discovered_by && creature.discovered_by.username) || 'unknown'}" 
           class="avatar" />
      <span>Discovered by: ${(creature.discovered_by && creature.discovered_by.username) || 'Unknown'}</span>
    </div>
  `;
}

// Function to show creature details in a modal.
export function showCreatureDetails(creature) {
  const modal = document.getElementById("creature-modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <div style="text-align:center;">
      ${creature.svg}
      ${creature.firstTime ? '<div class="new-tag" style="position: static; display: inline-block; margin-top: 5px;">New Discovery!</div>' : ''}
    </div>
    <h2>${creature.name}</h2>
    <p>${creature.description}</p>
    <p>Category: ${creature.category}</p>
    <p>Rarity: ${creature.rarity}</p>
    <p>Container: ${creature.containerType}</p>
    <p>Discovered by: ${(creature.discovered_by && creature.discovered_by.username) || 'Unknown'}</p>
    <p>Currency Value: ${creature.currencyValue || 0}</p>
  `;
  modal.style.display = "block";
}

// NEW: Show an overlay for the newly created output with an option for generated image.
export async function showNewOutputOverlay(creature) {
  const overlay = document.getElementById("new-output-overlay");
  const overlayContent = document.getElementById("new-output-content");
  
  overlayContent.innerHTML = `
    <div id="new-output-inner" style="text-align: center;">
      <div id="output-image-container">
        ${creature.svg}
      </div>
      <button id="use-generated-btn" style="margin: 0.5rem auto; padding: 0.5rem 1rem; background: #f39c12; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        USE GENERATED IMAGE INSTEAD
      </button>
      <h2>${creature.name}</h2>
      <p>${creature.description}</p>
      <p>Rarity: ${creature.rarity.toUpperCase()}</p>
      <p>Category: ${creature.category}</p>
      <p>Price: ${creature.price} coins</p>
    </div>
  `;
  
  const generatedBtn = document.getElementById("use-generated-btn");
  if (generatedBtn) {
    generatedBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      await handleUseGeneratedImage(creature);
    });
  }
  
  const innerContent = document.getElementById("new-output-inner");
  innerContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  
  overlay.style.display = "flex";
  overlay.onclick = () => {
    overlay.style.display = "none";
  };
}

// NEW: Function to handle "Use Generated Image Instead" with caching and regenerate options.
export async function handleUseGeneratedImage(creature) {
  const outputContainer = document.getElementById("output-image-container");
  if (!outputContainer) return;

  outputContainer.innerHTML = "<p>Generating image...</p>";
  
  try {
    // First check for cached image
    if (creature.generatedImage) {
      showGeneratedImage(outputContainer, creature, creature.generatedImage);
      return;
    }

    // If no cached image, generate new one
    const imageUrl = await generateOutputImage(creature);
    if (!imageUrl) {
      throw new Error("Failed to generate image");
    }

    // Cache the successful image generation
    creature.generatedImage = imageUrl;
    showGeneratedImage(outputContainer, creature, imageUrl);
    
    // Save to persistent storage
    saveGameData();
    
  } catch (error) {
    console.error("Error handling generated image:", error);
    outputContainer.innerHTML = `
      <div style="text-align: center;">
        ${creature.svg}
        <p style="color: red; margin-top: 10px;">Image generation failed. Please try again.</p>
      </div>
    `;
  }
}

// Helper function to show generated image and controls
function showGeneratedImage(container, creature, imageUrl) {
  // Verify the image URL is valid
  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error("Invalid image URL");
  }

  container.innerHTML = `
    <div style="text-align: center;">
      <img src="${imageUrl}" alt="${creature.name}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
      <div style="margin-top: 1rem;">
        <button id="save-preview-btn" class="action-btn success">Save as Preview Image</button>
        <button id="regenerate-btn" class="action-btn warning">Regenerate Image</button>
      </div>
    </div>
  `;

  // Add event listeners
  const saveBtn = container.querySelector("#save-preview-btn");
  const regenBtn = container.querySelector("#regenerate-btn");

  if (saveBtn) {
    saveBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        await handleSavePreviewImage(creature, imageUrl);
        alert("Preview image saved globally!");
        const overlay = document.getElementById("new-output-overlay");
        if (overlay) overlay.style.display = "none";
      } catch (error) {
        console.error("Error saving preview:", error);
        alert("Failed to save preview image. Please try again.");
      }
    });
  }

  if (regenBtn) {
    regenBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      container.innerHTML = "<p>Regenerating image...</p>";
      try {
        const newImageUrl = await generateOutputImage(creature);
        if (!newImageUrl) throw new Error("Failed to regenerate image");
        creature.generatedImage = newImageUrl;
        saveGameData();
        showGeneratedImage(container, creature, newImageUrl);
      } catch (error) {
        console.error("Error regenerating image:", error);
        container.innerHTML = `
          <div style="text-align: center;">
            ${creature.svg}
            <p style="color: red; margin-top: 10px;">Image regeneration failed. Please try again.</p>
          </div>
        `;
      }
    });
  }
}

// NEW: Function to save the generated preview image globally.
export async function handleSavePreviewImage(creature, newImageUrl) {
  // Update local copy
  creature.generatedImage = newImageUrl;
  
  // Update global recipes cache
  if (globalRecipes[creature.id]) {
    globalRecipes[creature.id].generatedImage = newImageUrl;
    // Don't replace svg, just store the generated image URL
    globalRecipes[creature.id].lastGeneratedAt = new Date().toISOString();
  }
  
  // Broadcast the update to other users
  const room = getRoom();
  if (room) {
    room.send({
      type: "updatePreviewImage",
      creatureId: creature.id,
      newImageUrl: newImageUrl,
      timestamp: new Date().toISOString()
    });
  }
  
  // Re-render the catalog with the new image
  renderGlobalCatalog();
  
  // Save to persistent storage
  saveGameData();
}

// NEW: Render the Recipe Store with search functionality.
export function renderStore() {
  const storeSection = document.getElementById("store-section");
  storeSection.innerHTML = "";
  
  // Get search term from input.
  const searchInput = document.getElementById("store-search");
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  
  // Filter out any recipes the user already owns and, if a search term is provided, filter by name or description.
  let recipesList = Object.values(globalRecipes).filter((recipe) => {
    const notOwned = !ownedRecipes.some(owned => owned.id === recipe.id);
    if (!notOwned) return false;
    if (typeof recipe.price === "undefined") return false;
    if (searchTerm) {
      const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
      const descMatch = recipe.description.toLowerCase().includes(searchTerm);
      return nameMatch || descMatch;
    }
    return true;
  });
  
  // Sort by price low to high
  recipesList.sort((a, b) => a.price - b.price);
  
  if (recipesList.length === 0) {
    storeSection.innerHTML = "<p class='empty-store-message'>No new recipes available for purchase!</p>";
    return;
  }

  recipesList.forEach((recipe) => {
    const effectivePrice = recipe.price;
    const taxAmount = Math.floor(effectivePrice * 0.1); // 10% tax
    const discovererReward = Math.floor(effectivePrice * 0.4); // 40% reward for original discoverer
    
    const card = document.createElement("div");
    card.classList.add("store-card");
    card.innerHTML = `
      <h3>${recipe.name}</h3>
      ${recipe.svg}
      <p>${recipe.description}</p>
      <p>Base Price: ${effectivePrice} coins</p>
      <p>Tax: ${taxAmount} coins</p>
      <p>Total Cost: ${effectivePrice + taxAmount} coins</p>
      <p class="reward-text">Discoverer Reward: ${discovererReward} coins</p>
      <p class="discoverer-text">Discovered by: ${(recipe.discovered_by && recipe.discovered_by.username) || 'Unknown'}</p>
      <button class="buy-btn">Buy Recipe</button>
    `;
    
    const buyBtn = card.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      if (window.buyRecipe) {
        window.buyRecipe(recipe.id, effectivePrice);
      }
    });
    storeSection.appendChild(card);
  });
}

// UPDATED: New function to render Global Catalog with sorting dropdown.
export function renderGlobalCatalog() {
  const catalog = document.getElementById("global-catalog");
  
  // Show loading state
  catalog.innerHTML = '<div class="loading-indicator">Loading discoveries...</div>';
  
  // Get sort option
  const sortSelect = document.getElementById("catalog-sort");
  let sortOption = sortSelect ? sortSelect.value.toLowerCase() : "newest";
  
  // Create a Map to store unique recipes by ID
  const uniqueRecipes = new Map();
  
  // Get recipes and keep only the latest version of each
  Object.values(globalRecipes).forEach(recipe => {
    if (!uniqueRecipes.has(recipe.id) || 
        (recipe.lastGeneratedAt && 
         (!uniqueRecipes.get(recipe.id).lastGeneratedAt || 
          new Date(recipe.lastGeneratedAt) > new Date(uniqueRecipes.get(recipe.id).lastGeneratedAt)))) {
      uniqueRecipes.set(recipe.id, recipe);
    }
  });
  
  // Convert to array for sorting
  let recipesArray = Array.from(uniqueRecipes.values());
  
  // Sort based on selected option
  switch(sortOption) {
    case "alphabetical":
      recipesArray.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "rarity":
      const rarityOrder = { common: 1, rare: 2, legendary: 3, mythical: 4 };
      recipesArray.sort((a, b) => (rarityOrder[b.rarity.toLowerCase()] || 0) - (rarityOrder[a.rarity.toLowerCase()] || 0));
      break;
    case "category":
      recipesArray.sort((a, b) => a.category.localeCompare(b.category));
      break;
    default: // newest
      recipesArray.sort((a, b) => new Date(b.discovered_at) - new Date(a.discovered_at));
  }
  
  // Clear loading state
  catalog.innerHTML = '';
  
  // Display unique creatures
  recipesArray.forEach(creature => {
    displayCreature(creature);
  });
  
  // Show empty state if needed
  if (recipesArray.length === 0) {
    catalog.innerHTML = '<div class="loading-indicator">No discoveries yet! Start combining elements to discover new creations.</div>';
  }
}

// Update addDiscovery function to prevent duplicate entries in available pools
export async function addDiscovery(creature) {
  if (!creature.id) {
    creature.id = creature.name.toLowerCase().replace(/ /g, "-");
  }
  
  const room = getRoom();
  const currentUser = room.party.client.username;
  
  // Check if this is the first global discovery
  const isFirstTime = !globalRecipes[creature.id];
  
  if (isFirstTime) {
    creature.firstTime = true;
    globalRecipes[creature.id] = creature;
    
    try {
      const existing = await room.collection("recipe").filter({ id: creature.id }).getList();
      if (!(existing && existing.length > 0)) {
        await room.collection("recipe").create(creature);
      }
    } catch (error) {
      console.error("Error saving global discovery:", error);
    }
  }
  
  // Only add to local pools if discovered by current user and not already present
  if (creature.discovered_by && creature.discovered_by.username === currentUser) {
    // Helper function to check if component exists in array
    const componentExists = (array, id) => array.some(item => item.id === id);
    
    // Add to appropriate category pool if not already present
    const componentData = {
      ...creature,
      componentType: creature.category,
      cost: creature.price || 15
    };
    
    switch (creature.category.toLowerCase()) {
      case "element":
        if (!componentExists(availableElements, creature.id)) {
          availableElements.push(componentData);
          resortComponents();
          renderElementsPanel();
        }
        break;
      // ... similar cases for other categories ...
    }
    
    // Add to owned recipes if not already present
    if (!ownedRecipes.some(recipe => recipe.id === creature.id)) {
      ownedRecipes.push(creature);
    }
  }
  
  saveGameData();
}

// Initialize modal close functionality once DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("creature-modal");
  const closeModal = modal.querySelector(".close-btn");
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});