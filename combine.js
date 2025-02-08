// combine.js - Handles combination logic, predetermined outputs, mutations, and now sets generated recipes as permanent outputs.

import {
  selectedComponents,
  playerCurrency,
  globalRecipes,
  mutationOverrideChance,
  predeterminedCombos,
  getRoom,
  availableElements,
  availableBiologicals,
  availableEnergy,
  availableSpecials,
  availableEssence,
  availablePeople,
  availablePlaces,
  availableNexus,
  ownedRecipes,
  saveGameData,
  resortComponents,
  awardDiscovererCurrency,
  calculateTax
} from "./data.js";
import {
  updateCombinationUI,
  updateCurrencyUI,
  displayCreature,
  renderElementsPanel,
  renderBiologicalPanel,
  renderEnergyPanel,
  renderSpecialsPanel,
  renderEssencePanel,
  renderPeoplePanel,
  renderPlacesPanel,
  renderNexusPanel,
  updateCombineButtonState,
  showNewOutputOverlay,
  renderStore
} from "./render.js";

// Add a component to the current combination (max 4 allowed)
export function addToCombination(component) {
  if (selectedComponents.length >= 4) {
    alert("You can only combine up to 4 components at a time.");
    return;
  }
  selectedComponents.push(component);
  updateCombinationUI();
}

// Remove a component from the combination by index.
export function removeFromCombination(index) {
  selectedComponents.splice(index, 1);
  updateCombinationUI();
}

// Calculate currency reward based on rarity and mutation status.
export function getCurrencyReward(creature) {
  const baseValues = { common: 10, rare: 20, legendary: 50, mythical: 100 };
  let base = baseValues[creature.rarity.toLowerCase()] || 5;
  let multiplier = Math.random() * 0.4 + 0.8;
  let reward = Math.floor(base * multiplier);
  if (creature.mutation) reward = Math.floor(reward / 2);
  return reward;
}

// Call the AI API to generate a new creature based on the selected components.
export async function getAIResponse(components, hasBiological) {
  try {
    const prompt = `You are a creative AI creature generator for the game BioGenesis: Evolutionary Crafting.
Combine the following components: ${components.join(', ')}.
${hasBiological
  ? 'Since one or more components are biological, prioritize generating a living creature with evolutionary depth.'
  : 'Since none of the components are biological, generate a basic elemental compound representing natural substances.'}
Respond with a JSON object with the following properties:
- name: string
- description: string
- svg: string (inline SVG)
- category: string (either "element", "biological", "energy", "special", "essence", "people", "places", "nexus")
- rarity: string (one of "common", "rare", "legendary", "mythical")
- containerType: string (e.g., "electronic", "biological", "elemental", "primordial", "extraordinary")
- mutation: boolean`;
    const response = await fetch("/api/ai_completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ prompt, data: { components } })
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating creature:", error);
    alert("An error occurred while generating the creature.");
    return null;
  }
}

// Handle the combination process.
export async function combineElements() {
  if (selectedComponents.length < 2) {
    alert("Please select at least 2 components.");
    return;
  }
  const combineBtn = document.getElementById("combine-btn");
  combineBtn.disabled = true;
  combineBtn.textContent = "Generating...";

  const componentNames = selectedComponents.map(el => el.name);
  const sortedNames = [...componentNames].sort();
  const comboKey = sortedNames.join("|");
  const hasBiological = selectedComponents.some(el => el.componentType === "biological");

  let aiResult = null;
  const predetermined = predeterminedCombos[comboKey];

  if (predetermined) {
    const predeterminedId = predetermined.name.toLowerCase().replace(/ /g, "-");
    if (globalRecipes[predeterminedId]) {
      if (Math.random() < mutationOverrideChance) {
        console.log("Already discovered; generating mutated variant via AI.");
        aiResult = await getAIResponse(componentNames, hasBiological);
      } else {
        console.log("Already discovered; using existing recipe.");
        aiResult = { ...globalRecipes[predeterminedId] };
        aiResult.mutation = false;
      }
    } else {
      if (Math.random() >= mutationOverrideChance) {
        console.log("Using predetermined combination:", comboKey);
        aiResult = { ...predetermined };
        aiResult.mutation = false;
        aiResult.id = predeterminedId;
      } else {
        console.log("Using AI generation for variation:", comboKey);
        aiResult = await getAIResponse(componentNames, hasBiological);
      }
    }
  } else {
    console.log("No predetermined combination; using AI generation:", comboKey);
    aiResult = await getAIResponse(componentNames, hasBiological);
    if (aiResult) {
      const newRecipeId = aiResult.name.toLowerCase().replace(/ /g, "-");
      aiResult.id = newRecipeId;
      predeterminedCombos[comboKey] = aiResult;
    }
  }

  if (aiResult) {
    // Add metadata timestamp.
    aiResult.discovered_at = new Date().toISOString();
    
    // Compute reward and update global currency.
    const reward = getCurrencyReward(aiResult);
    playerCurrency.value += reward;
    updateCurrencyUI(playerCurrency.value);

    // Compute price based on the average cost of input components.
    aiResult.price = Math.floor(selectedComponents.reduce((sum, comp) => sum + (comp.cost || 0), 0) / selectedComponents.length);

    // Attach discoverer metadata from the current client.
    const room = getRoom();
    aiResult.discovered_by = {
      username: room.party.client.username,
      avatarUrl: room.party.client.avatarUrl
    };
    aiResult.currencyValue = reward;

    // Display the newly generated creature in the global catalog.
    displayCreature(aiResult);
    // Show the new output overlay that can be clicked away.
    showNewOutputOverlay(aiResult);
    // Add to global discoveries and assign to owner's pool if discovered by current user.
    await addDiscovery(aiResult);
    console.log(`You earned ${reward} coins!`);
  }

  // Reset the combination area.
  selectedComponents.splice(0, selectedComponents.length);
  updateCombinationUI();
  combineBtn.textContent = "Combine!";
  combineBtn.disabled = true;
  saveGameData();
}

// Add the discovery to the global records and, if discovered by the current player, add it to their available pool.
// This function now allows duplicates.
export async function addDiscovery(creature) {
  if (!creature.id) {
    creature.id = creature.name.toLowerCase().replace(/ /g, "-");
  }
  if (!creature.discovered_at) {
    creature.discovered_at = new Date().toISOString();
  }
  const room = getRoom();
  const currentUser = room.party.client.username;
  
  const isFirstTime = !globalRecipes[creature.id];

  if (isFirstTime) {
    creature.firstTime = true;
    globalRecipes[creature.id] = creature;
    room.send({
      type: "newDiscovery",
      creature: creature
    });
    try {
      let existing = room.collection("recipe").filter({ id: creature.id }).getList();
      if (!(existing && existing.length > 0)) {
        await room.collection("recipe").create(creature);
      }
    } catch (error) {
      console.error("Error saving global discovery:", error);
    }
  }
  
  // Allow duplicates: Add to user's ownedRecipes if discovered by this user
  const alreadyOwned = ownedRecipes.find(r => r.id === creature.id && r.discovered_by && r.discovered_by.username === currentUser);
  if (!alreadyOwned && creature.discovered_by && creature.discovered_by.username === currentUser) {
    ownedRecipes.push({ ...creature, duplicate: !isFirstTime });
    
    // Sort into proper category array based on category field
    switch (creature.category.toLowerCase()) {
      case "element":
        if (!availableElements.find(e => e.id === creature.id)) {
          availableElements.push({
            ...creature,
            componentType: "element",
            cost: creature.price || 15
          });
          resortComponents();
          renderElementsPanel();
        }
        break;
      case "biological":
        if (!availableBiologicals.find(b => b.id === creature.id)) {
          availableBiologicals.push({
            ...creature,
            componentType: "biological",
            cost: creature.price || 15
          });
          resortComponents();
          renderBiologicalPanel();
        }
        break;
      case "energy":
        if (!availableEnergy.find(e => e.id === creature.id)) {
          availableEnergy.push({
            ...creature,
            componentType: "energy",
            cost: creature.price || 15
          });
          resortComponents();
          renderEnergyPanel();
        }
        break;
      case "essence":
        if (!availableEssence.find(e => e.id === creature.id)) {
          availableEssence.push({
            ...creature,
            componentType: "essence",
            cost: creature.price || 15
          });
          resortComponents();
          renderEssencePanel();
        }
        break;
      case "people":
        if (!availablePeople.find(p => p.id === creature.id)) {
          availablePeople.push({
            ...creature,
            componentType: "people",
            cost: creature.price || 15
          });
          resortComponents();
          renderPeoplePanel();
        }
        break;
      case "places":
        if (!availablePlaces.find(p => p.id === creature.id)) {
          availablePlaces.push({
            ...creature,
            componentType: "places",
            cost: creature.price || 15
          });
          resortComponents();
          renderPlacesPanel();
        }
        break;
      case "nexus":
        if (!availableNexus.find(n => n.id === creature.id)) {
          availableNexus.push({
            ...creature,
            componentType: "nexus",
            cost: creature.price || 15
          });
          resortComponents();
          renderNexusPanel();
        }
        break;
      case "mythical":
        if (!globalRecipes[creature.id]) {
          availableMythical.push({
            ...creature,
            componentType: "mythical",
            cost: creature.price || 15
          });
          resortComponents();
        }
        break;
      default:
        if (!availableSpecials.find(s => s.id === creature.id)) {
          availableSpecials.push({
            ...creature,
            componentType: "special",
            cost: creature.price || 15
          });
          resortComponents();
          renderSpecialsPanel();
        }
        break;
    }
  }
  
  saveGameData();
}

// Handle incoming discovery events from other players.
export function handleGlobalDiscovery(eventData) {
  if (eventData && eventData.creature) {
    const creature = eventData.creature;
    if (!globalRecipes[creature.id]) {
      globalRecipes[creature.id] = creature;
      displayCreature(creature);
      saveGameData();
    }
  }
}

// Buy a recipe from the store.
export function buyRecipe(recipeId, effectivePrice) {
  const recipe = globalRecipes[recipeId];
  if (recipe) {
    const taxAmount = calculateTax(effectivePrice);
    const totalCost = effectivePrice + taxAmount;
    
    if (playerCurrency.value >= totalCost) {
      // Deduct total cost including tax.
      playerCurrency.value -= totalCost;
      
      // Award reward to original discoverer (handled through room events).
      awardDiscovererCurrency(recipe, effectivePrice);
      
      // Update currency display.
      updateCurrencyUI(playerCurrency.value);
      
      // Add the purchased recipe back to the input pool so it may be used.
      const component = { ...recipe, componentType: recipe.category };
      switch (recipe.category.toLowerCase()) {
        case "element":
          availableElements.push(component);
          renderElementsPanel();
          break;
        case "biological":
          availableBiologicals.push(component);
          renderBiologicalPanel();
          break;
        case "energy":
          availableEnergy.push(component);
          renderEnergyPanel();
          break;
        case "essence":
          availableEssence.push(component);
          renderEssencePanel();
          break;
        case "people":
          availablePeople.push(component);
          renderPeoplePanel();
          break;
        case "places":
          availablePlaces.push(component);
          renderPlacesPanel();
          break;
        case "nexus":
          availableNexus.push(component);
          renderNexusPanel();
          break;
        case "mythical":
          availableMythical.push(component);
          break;
        default:
          availableSpecials.push(component);
          renderSpecialsPanel();
          break;
      }
      
      // Add to owned recipes (for store filtering).
      ownedRecipes.push(recipe);
      
      // Resort components so that input pools remain organized.
      resortComponents();
      
      // Re-render store; purchased recipes will now be filtered out from the store view.
      renderStore();
      
      // Show purchase confirmation with tax info.
      alert(`Purchase complete!\nTotal cost: ${totalCost} coins (including ${taxAmount} tax)\nThe original discoverer will receive a reward!`);
      
      // Save game state.
      saveGameData();
    } else {
      alert(`Not enough currency! Total cost is ${totalCost} coins (including ${taxAmount} tax)`);
    }
  }
}

// Handle discoverer rewards.
export function handleDiscovererReward(eventData) {
  if (eventData && eventData.recipientUsername) {
    const room = getRoom();
    if (room && room.party.client.username === eventData.recipientUsername) {
      playerCurrency.value += eventData.amount;
      updateCurrencyUI(playerCurrency.value);
      alert(`You received ${eventData.amount} coins as a reward for someone purchasing your recipe: ${eventData.recipeName}!`);
      saveGameData();
    }
  }
}

// NEW: Function to generate a high quality realistic image for the output.
// This system will only be activated if the user clicks "USE GENERATED IMAGE INSTEAD" on the output overlay.
export async function generateOutputImage(creature) {
  try {
    const prompt = `Generate a high quality realistic image for:
Name: ${creature.name}
Description: ${creature.description}
Category: ${creature.category}
Rarity: ${creature.rarity}

Additional context: The image should be realistic, detailed, and representative of the creature's described properties.

interface Response {
  imageUrl: string;
}

{
  "imageUrl": "https://images.websim.ai/v1/generated/123456789"
}`;

    const response = await fetch("/api/ai_completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        prompt,
        data: {
          name: creature.name,
          description: creature.description,
          category: creature.category,
          rarity: creature.rarity
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Image generation failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !data.imageUrl) {
      throw new Error("Invalid image generation response");
    }

    return data.imageUrl;
  } catch (error) {
    console.error("Image generation error:", error);
    // Return null to indicate failure, allowing graceful fallback
    return null;
  }
}

// Handle image generation caching
export async function handleUseGeneratedImage(creature) {
  const outputContainer = document.getElementById("output-image-container");
  outputContainer.innerHTML = "";
  
  // Check if the creature already has a cached generated image
  if (creature.generatedImage) {
    outputContainer.innerHTML = `<img src="${creature.generatedImage}" alt="${creature.name}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />`;
  } else {
    outputContainer.textContent = "Generating image...";
    const imageUrl = await generateOutputImage(creature);
    if (imageUrl) {
      creature.generatedImage = imageUrl; // cache the generated image
      outputContainer.innerHTML = `<img src="${imageUrl}" alt="${creature.name}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />`;
    } else {
      outputContainer.innerHTML = creature.svg;
      alert("Failed to generate image.");
      return;
    }
  }
  
  // Add buttons for saving and regenerating
  addImageControls(outputContainer, creature);
}

function addImageControls(container, creature) {
  // Create Save as Preview Image button
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save as Preview Image";
  saveBtn.style.marginTop = "1rem";
  saveBtn.style.padding = "0.5rem 1rem";
  saveBtn.style.background = "#2ecc71";
  saveBtn.style.color = "#fff";
  saveBtn.style.border = "none";
  saveBtn.style.borderRadius = "4px";
  saveBtn.style.cursor = "pointer";
  saveBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    await handleSavePreviewImage(creature, creature.generatedImage);
    alert("Preview image saved globally!");
    document.getElementById("new-output-overlay").style.display = "none";
  });
  container.appendChild(saveBtn);
  
  // Create Regenerate Image button
  const regenBtn = document.createElement("button");
  regenBtn.textContent = "Regenerate Image";
  regenBtn.style.marginTop = "1rem";
  regenBtn.style.padding = "0.5rem 1rem";
  regenBtn.style.background = "#e67e22";
  regenBtn.style.color = "#fff";
  regenBtn.style.border = "none";
  regenBtn.style.borderRadius = "4px";
  regenBtn.style.cursor = "pointer";
  regenBtn.style.marginLeft = "0.5rem";
  regenBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    container.textContent = "Regenerating image...";
    const newImageUrl = await generateOutputImage(creature);
    if (newImageUrl) {
      creature.generatedImage = newImageUrl;
      container.innerHTML = `<img src="${newImageUrl}" alt="${creature.name}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />`;
      addImageControls(container, creature);
    } else {
      container.innerHTML = creature.svg;
      alert("Failed to generate image.");
    }
  });
  container.appendChild(regenBtn);
}

// Expose functions globally for use by render event listeners.
window.addToCombination = addToCombination;
window.removeFromCombination = removeFromCombination;
window.combineElements = combineElements;
window.buyRecipe = buyRecipe;
window.handleUseGeneratedImage = handleUseGeneratedImage;