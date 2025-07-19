function renderPerks() {
    const role = document.getElementById("role").value;
    const perks = role === "survivor" ? survivorPerks : killerPerks;
    const container = document.getElementById("perkContainer");
    container.innerHTML = '';
  
    perks.forEach((perk, index) => {
      const div = document.createElement("div");
      div.className = "perk-card";
      div.innerHTML = `
        <img src="${perk.img}" alt="${perk.name}" />
        <label><input type="checkbox" id="exclude-${index}"> ${perk.name}</label>
      `;
      container.appendChild(div);
    });
  
    document.getElementById("perkCount").textContent = `Total perks: ${perks.length}`;
  }
  
  function randomizePerks() {
    const role = document.getElementById("role").value;
    const perks = role === "survivor" ? [...survivorPerks] : [...killerPerks];
    const available = perks.filter((_, i) => !document.getElementById(`exclude-${i}`).checked);
  
    const result = document.getElementById("result");
    result.innerHTML = "";
  
    if (available.length < 4) {
      result.innerHTML = "<p>No hay suficientes perks disponibles.</p>";
      return;
    }
  
    const selected = [];
    while (selected.length < 4) {
      const rand = available[Math.floor(Math.random() * available.length)];
      if (!selected.includes(rand)) selected.push(rand);
    }
  
    selected.forEach(perk => {
      const div = document.createElement("div");
      div.className = "perk-card";
      div.innerHTML = `
        <img src="${perk.img}" alt="${perk.name}" />
        <strong>${perk.name}</strong>
      `;
      result.appendChild(div);
    });
  }
  
  document.addEventListener("change", () => {
    const role = document.getElementById("role").value;
    const perks = role === "survivor" ? survivorPerks : killerPerks;
    let excluded = 0;
    perks.forEach((_, i) => {
      const box = document.getElementById(`exclude-${i}`);
      if (box && box.checked) excluded++;
    });
    document.getElementById("perkCount").textContent = `Total perks: ${perks.length - excluded} (de ${perks.length})`;
  });
  
  renderPerks();
  