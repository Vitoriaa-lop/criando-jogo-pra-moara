const cropsData = {
  trigo: { name: "Trigo", growDays: 1, icon: "🌾", buyPrice: 10, sellPrice: 20 },
  tomate: { name: "Tomate", growDays: 2, icon: "🍅", buyPrice: 25, sellPrice: 55 }
};

let gameState = {
  day: 1,
  hour: 6,
  energy: 100,
  gold: 50,
  seeds: { trigo: 2, tomate: 0 },
  harvest: { trigo: 0, tomate: 0 },
  plots: Array(6).fill(null).map(() => ({ crop: null, dayPlanted: 0, watered: false, ready: false }))
};

function loadGame() {
  const saved = localStorage.getItem("fazendinha_save");
  if (saved) gameState = JSON.parse(saved);
  updateUI();
}

function saveGame() {
  localStorage.setItem("fazendinha_save", JSON.stringify(gameState));
}

function log(msg) {
  document.getElementById("log-text").innerText = msg;
}

function updateUI() {
  document.getElementById("day").innerText = gameState.day;
  document.getElementById("time").innerText = `${String(gameState.hour).padStart(2, '0')}:00`;
  document.getElementById("energy").innerText = gameState.energy;
  document.getElementById("gold").innerText = gameState.gold;

  // Renderizar Inventário
  const inv = document.getElementById("inventory-list");
  inv.innerHTML = `
    <span>🌾 Sementes Trigo: ${gameState.seeds.trigo}</span> | 
    <span>🍅 Sementes Tomate: ${gameState.seeds.tomate}</span> | 
    <span>📦 Frutos: ${gameState.harvest.trigo + gameState.harvest.tomate}</span>
  `;

  // Renderizar Canteiros
  const grid = document.getElementById("farm-grid");
  grid.innerHTML = "";

  gameState.plots.forEach((plot, index) => {
    const div = document.createElement("div");
    div.className = `plot ${plot.watered ? 'watered' : ''}`;
    
    if (!plot.crop) {
      div.innerText = "🟫";
    } else if (plot.ready) {
      div.innerText = cropsData[plot.crop].icon;
    } else {
      div.innerText = "🌱";
    }

    div.onclick = () => interactPlot(index);
    grid.appendChild(div);
  });

  saveGame();
}

function interactPlot(index) {
  const plot = gameState.plots[index];

  if (gameState.energy < 5) {
    log("Você está muito cansado! Vá dormir.");
    return;
  }

  // Colher
  if (plot.ready) {
    gameState.harvest[plot.crop]++;
    log(`Você colheu ${cropsData[plot.crop].name}!`);
    gameState.plots[index] = { crop: null, dayPlanted: 0, watered: false, ready: false };
    gameState.energy -= 5;
    addTime(1);
    return;
  }

  // Plantar
  if (!plot.crop) {
    if (gameState.seeds.trigo > 0) {
      gameState.seeds.trigo--;
      plot.crop = "trigo";
      log("Você plantou Trigo!");
    } else if (gameState.seeds.tomate > 0) {
      gameState.seeds.tomate--;
      plot.crop = "tomate";
      log("Você plantou Tomate!");
    } else {
      log("Você não tem sementes! Compre mais na loja.");
      return;
    }
    plot.dayPlanted = gameState.day;
    gameState.energy -= 5;
    addTime(1);
    return;
  }

  // Regar
  if (plot.crop && !plot.watered) {
    plot.watered = true;
    gameState.energy -= 5;
    log("Você regou a planta.");
    addTime(1);
  }
}

function buySeed(type, price) {
  if (gameState.gold >= price) {
    gameState.gold -= price;
    gameState.seeds[type]++;
    log(`Comprou 1 semente de ${type}!`);
    updateUI();
  } else {
    log("Ouro insuficiente!");
  }
}

function sellAll() {
  let total = 0;
  for (let crop in gameState.harvest) {
    total += gameState.harvest[crop] * cropsData[crop].sellPrice;
    gameState.harvest[crop] = 0;
  }
  if (total > 0) {
    gameState.gold += total;
    log(`Você vendeu sua colheita por ${total}g!`);
  } else {
    log("Você não tem produtos para vender.");
  }
  updateUI();
}

function actionRest() {
  gameState.day++;
  gameState.hour = 6;
  gameState.energy = 100;

  // Atualiza crescimento das plantas
  gameState.plots.forEach(plot => {
    if (plot.crop && plot.watered) {
      const daysPassed = gameState.day - plot.dayPlanted;
      if (daysPassed >= cropsData[plot.crop].growDays) {
        plot.ready = true;
      }
      plot.watered = false; // Solo seca no novo dia
    }
  });

  log("Novo dia! Suas plantas regadas cresceram.");
  updateUI();
}

function addTime(hours) {
  gameState.hour += hours;
  if (gameState.hour >= 22) {
    log("Ficou tarde demais! Você dormiu de cansaço.");
    actionRest();
  }
  updateUI();
}

window.onload = loadGame;