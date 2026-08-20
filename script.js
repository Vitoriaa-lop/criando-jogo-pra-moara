const locations = ["Fazenda", "Floresta", "Mina", "Vila"];
let currentLocationIndex = 0;

let gameState = {
  day: 1,
  hour: 6,
  level: 1,
  xp: 0,
  energy: 100,
  gold: 50,
  inventory: {
    madeira: 0,
    pedra: 0,
    minerio: 0,
    frutas: 2,
    sementes: 3
  }
};

const rewards = {
  "Fazenda": [
    { name: "sementes", amount: 1, xp: 5, msg: "Você achou sementes secas no solo!" },
    { name: "frutas", amount: 1, xp: 5, msg: "Você colheu uma fruta silvestre!" }
  ],
  "Floresta": [
    { name: "madeira", amount: 2, xp: 10, msg: "Você cortou troncos velhos e conseguiu madeira." },
    { name: "frutas", amount: 2, xp: 8, msg: "Você encontrou arbustos repletos de frutas!" }
  ],
  "Mina": [
    { name: "pedra", amount: 2, xp: 12, msg: "Você quebrou algumas pedras grandes." },
    { name: "minerio", amount: 1, xp: 20, msg: "Sorte! Você encontrou um minério reluzente." }
  ],
  "Vila": [
    { name: "gold", amount: 15, xp: 5, msg: "Você ajudou um morador e ganhou umas moedas de ouro." }
  ]
};

function loadGame() {
  const saved = localStorage.getItem("valedasestrelas_save");
  if (saved) {
    gameState = JSON.parse(saved);
  }
  updateUI();
}

function saveGame() {
  localStorage.setItem("valedasestrelas_save", JSON.stringify(gameState));
}

function addTime(hours) {
  gameState.hour += hours;
  if (gameState.hour >= 22) {
    log("Está ficando muito tarde e você desmaiou de cansaço!");
    autoSleep();
  }
  updateUI();
}

function addXP(amount) {
  gameState.xp += amount;
  if (gameState.xp >= gameState.level * 50) {
    gameState.xp -= gameState.level * 50;
    gameState.level++;
    log(`🎉 Você subiu para o Nível ${gameState.level}!`);
  }
}

function log(msg) {
  document.getElementById("log-text").innerText = msg;
}

function updateUI() {
  document.getElementById("day").innerText = gameState.day;
  document.getElementById("time").innerText = `${String(gameState.hour).padStart(2, '0')}:00`;
  document.getElementById("level").innerText = gameState.level;
  document.getElementById("xp").innerText = gameState.xp;
  document.getElementById("energy").innerText = gameState.energy;
  document.getElementById("gold").innerText = gameState.gold;
  document.getElementById("location-title").innerText = `📍 ${locations[currentLocationIndex]}`;

  const invContainer = document.getElementById("inventory-list");
  invContainer.innerHTML = "";
  
  const icons = { madeira: "🪵", pedra: "🪨", minerio: "💎", frutas: "🍓", sementes: "🌾" };
  
  for (const [item, qty] of Object.entries(gameState.inventory)) {
    if (qty > 0) {
      const tag = document.createElement("div");
      tag.className = "item-tag";
      tag.innerText = `${icons[item] || ''} ${item}: ${qty}`;
      invContainer.appendChild(tag);
    }
  }
  saveGame();
}

function actionExplore() {
  if (gameState.energy < 10) {
    log("Você está sem energia! Precisa descansar.");
    return;
  }

  const loc = locations[currentLocationIndex];
  const possibleRewards = rewards[loc];
  const loot = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];

  gameState.energy -= 10;
  addXP(loot.xp);

  if (loot.name === "gold") {
    gameState.gold += loot.amount;
  } else {
    gameState.inventory[loot.name] = (gameState.inventory[loot.name] || 0) + loot.amount;
  }

  log(loot.msg);
  addTime(2);
}

function actionWork() {
  if (gameState.energy < 15) {
    log("Você não tem energia suficiente para trabalhar.");
    return;
  }

  gameState.energy -= 15;
  gameState.inventory.madeira += 1;
  gameState.inventory.pedra += 1;
  addXP(15);
  log("Você trabalhou duro limpando a área e conseguiu madeira e pedra!");
  addTime(3);
}

function changeLocation() {
  currentLocationIndex = (currentLocationIndex + 1) % locations.length;
  log(`Você caminhou até: ${locations[currentLocationIndex]}.`);
  addTime(1);
}

function actionRest() {
  autoSleep();
  log("Você dormiu profundamente. Um novo dia começa!");
}

function autoSleep() {
  gameState.day++;
  gameState.hour = 6;
  gameState.energy = 100;
  updateUI();
}

window.onload = loadGame;