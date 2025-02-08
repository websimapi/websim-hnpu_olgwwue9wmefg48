// data.js - Global data and state

export const mutationOverrideChance = 0.05;

// Helper to generate a basic predetermined SVG.
export function getPredeterminedSVG(title) {
  return `<svg class="component-svg" viewBox="0 0 100 100">
    <rect x="15" y="15" width="70" height="70" fill="#a0a0a0" />
    <text x="50" y="55" text-anchor="middle" font-size="10" fill="#000">${title}</text>
  </svg>`;
}

// Predetermined combination outputs – key is created by sorting component names (joined by "|")
export const predeterminedCombos = {
  "Lipids|Proteins": {
    name: "Cell Membrane",
    description: "The protective barrier of a cell.",
    svg: getPredeterminedSVG("Cell Membrane"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Carbohydrates|Proteins": {
    name: "Glycoproteins (Cell Communication)",
    description: "Complex molecules aiding in cell signaling and communication.",
    svg: getPredeterminedSVG("Glycoproteins"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Carbohydrates|Lipids": {
    name: "Glycolipids (Energy Storage)",
    description: "Molecules that store energy effectively.",
    svg: getPredeterminedSVG("Glycolipids"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Cytoplasm|DNA/RNA": {
    name: "Nucleus Formation",
    description: "The early stage of cell compartmentalization.",
    svg: getPredeterminedSVG("Nucleus Formation"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "DNA/RNA|Organelles": {
    name: "Cell Nucleus",
    description: "A well-defined nucleus is the hallmark of eukaryotic cells.",
    svg: getPredeterminedSVG("Cell Nucleus"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "DNA/RNA|Microtubules": {
    name: "Cell Division",
    description: "The intricate process driving cell division.",
    svg: getPredeterminedSVG("Cell Division"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Microtubules|ATP": {
    name: "Cell Movement",
    description: "Efficient cell movement powered by ATP.",
    svg: getPredeterminedSVG("Cell Movement"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Enzymes|ATP": {
    name: "Metabolism Activation",
    description: "Enzymes powered by ATP initiate metabolic reactions.",
    svg: getPredeterminedSVG("Metabolism Activation"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "ATP|Carbohydrates": {
    name: "Cellular Respiration",
    description: "A process by which cells convert nutrients into energy.",
    svg: getPredeterminedSVG("Cellular Respiration"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Enzymes|Proteins": {
    name: "Protein Folding",
    description: "Proteins folding into functional shapes.",
    svg: getPredeterminedSVG("Protein Folding"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Cytoplasm|Organelles": {
    name: "Eukaryotic Cell",
    description: "The emergence of a sophisticated, compartmentalized cell.",
    svg: getPredeterminedSVG("Eukaryotic Cell"),
    category: "biological",
    rarity: "legendary",
    containerType: "biological",
    mutation: false
  },
  "Heat|Organelles": {
    name: "Increased Metabolic Rate",
    description: "Heat stimulates organelles to boost metabolism.",
    svg: getPredeterminedSVG("Increased Metabolic Rate"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Cold|Organelles": {
    name: "Slowed Metabolism (Hibernation)",
    description: "Cold slows down the metabolic processes within cells.",
    svg: getPredeterminedSVG("Hibernation"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "ATP|Heat": {
    name: "Increased Energy Production",
    description: "ATP combined with heat results in higher energy production.",
    svg: getPredeterminedSVG("Increased Energy Production"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "ATP|Cold": {
    name: "Energy Conservation",
    description: "Cold in combination with ATP conserves energy within cells.",
    svg: getPredeterminedSVG("Energy Conservation"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Enzymes|Heat": {
    name: "Enzyme Denaturation",
    description: "Heat causes enzymes to lose their structure.",
    svg: getPredeterminedSVG("Enzyme Denaturation"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Enzymes|Cold": {
    name: "Slowed Enzyme Activity",
    description: "Cold slows down enzyme activity.",
    svg: getPredeterminedSVG("Slowed Enzyme Activity"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Carbohydrates|Cold": {
    name: "Glucose Storage",
    description: "Cold enhances the storage capability of glucose in cells.",
    svg: getPredeterminedSVG("Glucose Storage"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Lipids|Cold": {
    name: "Fat Accumulation",
    description: "Cold induces the accumulation of fats.",
    svg: getPredeterminedSVG("Fat Accumulation"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "Lipids|Heat": {
    name: "Fat Breakdown",
    description: "Heat breaks down lipids for energy.",
    svg: getPredeterminedSVG("Fat Breakdown"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "DNA/RNA|Heat": {
    name: "Mutation",
    description: "Heat causes mutations in genetic material.",
    svg: getPredeterminedSVG("Mutation"),
    category: "biological",
    rarity: "rare",
    containerType: "biological",
    mutation: false
  },
  "DNA/RNA|Radiation": {
    name: "Mutation & Evolution",
    description: "Exposure to radiation triggers mutation and evolution.",
    svg: getPredeterminedSVG("Mutation & Evolution"),
    category: "biological",
    rarity: "rare",
    containerType: "biological",
    mutation: false
  },
  "DNA/RNA|Proteins": {
    name: "Gene Expression",
    description: "Proteins interact with DNA/RNA to express genes.",
    svg: getPredeterminedSVG("Gene Expression"),
    category: "biological",
    rarity: "rare",
    containerType: "biological",
    mutation: false
  },
  "Microtubules|Proteins": {
    name: "Muscle Contraction",
    description: "Muscle fibers contract with the aid of microtubules.",
    svg: getPredeterminedSVG("Muscle Contraction"),
    category: "biological",
    rarity: "rare",
    containerType: "biological",
    mutation: false
  },
  "Microtubules|Organelles": {
    name: "Cell Transport System",
    description: "A system for intracellular transport.",
    svg: getPredeterminedSVG("Cell Transport System"),
    category: "biological",
    rarity: "rare",
    containerType: "biological",
    mutation: false
  },
  "Heat|Organic Matter": {
    name: "Decomposition",
    description: "Heat accelerates the breakdown of organic matter.",
    svg: getPredeterminedSVG("Decomposition"),
    category: "element",
    rarity: "common",
    containerType: "elemental",
    mutation: false
  },
  "Cold|Organic Matter": {
    name: "Preservation",
    description: "Cold preserves organic matter.",
    svg: getPredeterminedSVG("Preservation"),
    category: "element",
    rarity: "common",
    containerType: "elemental",
    mutation: false
  },
  "Heat|Water": {
    name: "Evaporation",
    description: "Heat causes water to evaporate.",
    svg: getPredeterminedSVG("Evaporation"),
    category: "element",
    rarity: "common",
    containerType: "elemental",
    mutation: false
  },
  "Cold|Water": {
    name: "Ice Formation",
    description: "Cold freezes water, forming ice.",
    svg: getPredeterminedSVG("Ice Formation"),
    category: "element",
    rarity: "common",
    containerType: "elemental",
    mutation: false
  },
  "Cold|Cytoplasm": {
    name: "Cell Freezing",
    description: "Cytoplasm freezes in cold conditions.",
    svg: getPredeterminedSVG("Cell Freezing"),
    category: "biological",
    rarity: "rare",
    containerType: "biological",
    mutation: false
  },
  "Heat|Cytoplasm": {
    name: "Cytoplasmic Expansion",
    description: "Heat causes the cytoplasm to expand.",
    svg: getPredeterminedSVG("Cytoplasmic Expansion"),
    category: "biological",
    rarity: "common",
    containerType: "biological",
    mutation: false
  },
  "ATP|Microtubules|Organelles": {
    name: "Muscle Cell",
    description: "A specialized cell capable of contraction, forming muscles.",
    svg: getPredeterminedSVG("Muscle Cell"),
    category: "biological",
    rarity: "legendary",
    containerType: "biological",
    mutation: false
  },
  "ATP|Carbohydrates|Enzymes": {
    name: "Digestive Process",
    description: "Combined biochemical processes yield the digestive system.",
    svg: getPredeterminedSVG("Digestive Process"),
    category: "biological",
    rarity: "rare",
    containerType: "biological",
    mutation: false
  },
  "Carbohydrates|Lipids|Proteins": {
    name: "Cell Structure",
    description: "A stable cell structure is formed from these essential components.",
    svg: getPredeterminedSVG("Cell Structure"),
    category: "biological",
    rarity: "legendary",
    containerType: "biological",
    mutation: false
  },
  "DNA/RNA|Cytoplasm|Organelles": {
    name: "Living Cell",
    description: "The emergence of a living cell from essential components.",
    svg: getPredeterminedSVG("Living Cell"),
    category: "biological",
    rarity: "legendary",
    containerType: "biological",
    mutation: false
  },
  "DNA/RNA|Proteins|Microtubules|ATP": {
    name: "Primitive Organism",
    description: "The basic form of life of a primitive organism.",
    svg: getPredeterminedSVG("Primitive Organism"),
    category: "biological",
    rarity: "mythical",
    containerType: "biological",
    mutation: false
  }
};

// Fundamental Elemental Components (Refined) with default cost values.
export let availableElements = [
  { id: "hydrogen", name: "Hydrogen (H)", color: "#A8D5BA", componentType: "element", cost: 5 },
  { id: "oxygen", name: "Oxygen (O)", color: "#ADD8E6", componentType: "element", cost: 5 },
  { id: "carbon", name: "Carbon (C)", color: "#333333", componentType: "element", cost: 6 },
  { id: "nitrogen", name: "Nitrogen (N)", color: "#98FB98", componentType: "element", cost: 5 },
  { id: "silicon", name: "Silicon (Si)", color: "#F4A460", componentType: "element", cost: 7 },
  { id: "iron", name: "Iron (Fe)", color: "#B22222", componentType: "element", cost: 8 },
  { id: "magnesium", name: "Magnesium (Mg)", color: "#B0E0E6", componentType: "element", cost: 7 },
  { id: "calcium", name: "Calcium (Ca)", color: "#DAA520", componentType: "element", cost: 7 },
  { id: "copper", name: "Copper (Cu)", color: "#B87333", componentType: "element", cost: 9 },
  { id: "aluminum", name: "Aluminum (Al)", color: "#C0C0C0", componentType: "element", cost: 7 },
  { id: "organic_matter", name: "Organic Matter", color: "#8B4513", componentType: "element", cost: 4 },
  { id: "carbon_dioxide", name: "Carbon Dioxide (CO₂)", color: "#90EE90", componentType: "element", cost: 5 }
];

// Fundamental Biological Components (Refined) with cost.
export let availableBiologicals = [
  { id: "lipids", name: "Lipids", color: "#8BC34A", componentType: "biological", cost: 10 },
  { id: "proteins", name: "Proteins", color: "#FFC107", componentType: "biological", cost: 12 },
  { id: "carbohydrates", name: "Carbohydrates", color: "#03A9F4", componentType: "biological", cost: 10 },
  { id: "cytoplasm", name: "Cytoplasm", color: "#E91E63", componentType: "biological", cost: 8 },
  { id: "dna", name: "DNA/RNA", color: "#9C27B0", componentType: "biological", cost: 15 },
  { id: "microtubules", name: "Microtubules", color: "#4CAF50", componentType: "biological", cost: 10 },
  { id: "atp", name: "ATP", color: "#FF9800", componentType: "biological", cost: 10 },
  { id: "enzymes", name: "Enzymes", color: "#673AB7", componentType: "biological", cost: 12 },
  { id: "organelles", name: "Organelles", color: "#3F51B5", componentType: "biological", cost: 15 }
];

// Energy Components – these form a separate group.
export let availableEnergy = [
  { id: "heat", name: "Heat", color: "#FF4500", componentType: "energy", cost: 5 },
  { id: "cold", name: "Cold", color: "#1E90FF", componentType: "energy", cost: 5 }
];

// Special Discoveries.
export let availableSpecials = [];

// New dynamic categories.
export let availableEssence = [];
export let availablePeople = [];
export let availablePlaces = [];
export let availableNexus = [];

// NEW: Mythical Creatures category.
export let availableMythical = [];

// Global state variables for the current combination.
export let selectedComponents = [];

// Player currency is a mutable object.
export const playerCurrency = { value: 0 };

// Global recipes discovered.
export let globalRecipes = {};

// Maintain a list of recipes owned (purchased or auto-awarded if discovered by the player).
export let ownedRecipes = [];

// Multiplayer connection management.
let room = null;
export function setRoom(r) {
  room = r;
}
export function getRoom() {
  return room;
}

// Save game data to localStorage.
export function saveGameData() {
  const save = {
    playerCurrency: playerCurrency.value,
    availableElements,
    availableBiologicals,
    availableEnergy,
    availableSpecials,
    availableEssence,
    availablePeople,
    availablePlaces,
    availableNexus,
    availableMythical,
    ownedRecipes,
    globalRecipes
  };
  localStorage.setItem('bioGenesisSave', JSON.stringify(save));
}

// Load game data from localStorage.
export function loadGameData() {
  const save = localStorage.getItem('bioGenesisSave');
  if (save) {
    try {
      const data = JSON.parse(save);
      playerCurrency.value = data.playerCurrency || 0;
      if (data.availableElements) {
        availableElements.splice(0, availableElements.length, ...data.availableElements);
      }
      if (data.availableBiologicals) {
        availableBiologicals.splice(0, availableBiologicals.length, ...data.availableBiologicals);
      }
      if (data.availableEnergy) {
        availableEnergy.splice(0, availableEnergy.length, ...data.availableEnergy);
      }
      if (data.availableSpecials) {
        availableSpecials.splice(0, availableSpecials.length, ...data.availableSpecials);
      }
      if (data.availableEssence) {
        availableEssence.splice(0, availableEssence.length, ...data.availableEssence);
      }
      if (data.availablePeople) {
        availablePeople.splice(0, availablePeople.length, ...data.availablePeople);
      }
      if (data.availablePlaces) {
        availablePlaces.splice(0, availablePlaces.length, ...data.availablePlaces);
      }
      if (data.availableNexus) {
        availableNexus.splice(0, availableNexus.length, ...data.availableNexus);
      }
      if (data.availableMythical) {
        availableMythical.splice(0, availableMythical.length, ...data.availableMythical);
      }
      if (data.ownedRecipes) {
        ownedRecipes.splice(0, ownedRecipes.length, ...data.ownedRecipes);
      }
      if (data.globalRecipes) {
        Object.keys(data.globalRecipes).forEach(key => {
          globalRecipes[key] = data.globalRecipes[key];
        });
      }
    } catch (e) {
      console.error("Failed to load game data:", e);
    }
  }
}

// New function to award store-based currency to the original discoverer
export function awardDiscovererCurrency(recipe, price) {
  const rewardPercentage = 0.4; // 40% reward
  const reward = Math.floor(price * rewardPercentage);
  
  // If there's a room connection and a discoverer
  const room = getRoom();
  if (room && recipe.discovered_by && recipe.discovered_by.username) {
    // Send event to notify discoverer of their reward
    room.send({
      type: "discovererReward",
      recipientUsername: recipe.discovered_by.username,
      amount: reward,
      recipeName: recipe.name
    });
  }
  
  return reward;
}

// Update the tax calculation function
export function calculateTax(price) {
  return Math.floor(price * 0.1); // 10% tax
}

// Updated function to sort available component pools in a more detailed manner.
// Components are sorted by multiple criteria: category, name, cost, and discovery date
export function resortComponents() {
  const sortFn = (a, b) => {
    // First sort by name
    const nameSort = a.name.localeCompare(b.name);
    if (nameSort !== 0) return nameSort;
    
    // Then by cost (if equal names)
    const aCost = a.cost || 15;
    const bCost = b.cost || 15;
    const costSort = aCost - bCost;
    if (costSort !== 0) return costSort;
    
    // Finally by discovery date if present
    if (a.discovered_at && b.discovered_at) {
      return new Date(b.discovered_at) - new Date(a.discovered_at);
    }
    return 0;
  };

  // Helper function to determine category based on name and properties
  function determineCategory(component) {
    const name = component.name.toLowerCase();
    const description = (component.description || '').toLowerCase();
    
    // Check for essence
    if (name.includes('essence') || description.includes('essence')) {
      return 'essence';
    }

    // Check for mythical creatures and beings
    if (component.rarity === 'mythical' || description.includes('mythical')) {
      return 'mythical';
    }
    
    // Check for people and humanoid entities
    if (name.includes('person') || name.includes('human') || 
        description.includes('person') || description.includes('human') ||
        component.category === 'people') {
      return 'people';
    }
    
    // Check for places and locations
    if (name.includes('place') || name.includes('location') || 
        name.includes('realm') || name.includes('dimension') ||
        component.category === 'places') {
      return 'places';
    }
    
    // Check for nexus/connection elements
    if (name.includes('nexus') || name.includes('portal') || 
        name.includes('gateway') || component.category === 'nexus') {
      return 'nexus';
    }
    
    // Basic elements and real-world compounds
    const realWorldElements = [
      'hydrogen', 'oxygen', 'carbon', 'nitrogen', 'silicon',
      'iron', 'magnesium', 'calcium', 'copper', 'aluminum'
    ];
    
    if (realWorldElements.some(el => name.includes(el)) || 
        component.componentType === 'element') {
      return 'element';
    }
    
    // Biological components
    if (name.includes('cell') || name.includes('organ') || 
        name.includes('tissue') || component.componentType === 'biological') {
      return 'biological';
    }
    
    // Energy components
    if (name.includes('energy') || name.includes('heat') || 
        name.includes('cold') || component.componentType === 'energy') {
      return 'energy';
    }
    
    // Everything else that doesn't exist in the real world goes to special
    return 'special';
  }

  // Clean up any misplaced items by checking categories
  const allComponents = [
    ...availableElements,
    ...availableBiologicals,
    ...availableEnergy,
    ...availableSpecials,
    ...availableEssence,
    ...availablePeople,
    ...availablePlaces,
    ...availableNexus,
    ...availableMythical
  ];

  // Clear all arrays
  availableElements.length = 0;
  availableBiologicals.length = 0;
  availableEnergy.length = 0;
  availableSpecials.length = 0;
  availableEssence.length = 0;
  availablePeople.length = 0;
  availablePlaces.length = 0;
  availableNexus.length = 0;
  availableMythical.length = 0;

  // Re-sort all components into their proper categories
  allComponents.forEach(component => {
    // Determine the proper category
    const category = determineCategory(component);
    component.category = category; // Update the component's category
    
    // Place in appropriate array
    switch (category) {
      case 'element':
        availableElements.push({ ...component, componentType: 'element' });
        break;
      case 'biological':
        availableBiologicals.push({ ...component, componentType: 'biological' });
        break;
      case 'energy':
        availableEnergy.push({ ...component, componentType: 'energy' });
        break;
      case 'essence':
        availableEssence.push({ ...component, componentType: 'essence' });
        break;
      case 'people':
        availablePeople.push({ ...component, componentType: 'people' });
        break;
      case 'places':
        availablePlaces.push({ ...component, componentType: 'places' });
        break;
      case 'nexus':
        availableNexus.push({ ...component, componentType: 'nexus' });
        break;
      case 'mythical':
        availableMythical.push({ ...component, componentType: 'mythical' });
        break;
      default:
        availableSpecials.push({ ...component, componentType: 'special' });
        break;
    }
  });

  // Sort each category array
  availableElements.sort(sortFn);
  availableBiologicals.sort(sortFn);
  availableEnergy.sort(sortFn);
  availableSpecials.sort(sortFn);
  availableEssence.sort(sortFn);
  availablePeople.sort(sortFn);
  availablePlaces.sort(sortFn);
  availableNexus.sort(sortFn);
  availableMythical.sort(sortFn);
}