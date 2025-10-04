// AI Food Planner Frontend Script
const planBtn = document.getElementById("planBtn");
const exportBtn = document.getElementById("exportBtn");
const results = document.getElementById("results");
const recetasDiv = document.getElementById("recetas");
const listaUl = document.getElementById("lista");

// Evento principal
planBtn.addEventListener("click", async () => {
  const data = {
    ingredientes: document.getElementById("ingredientes").value.trim(),
    dieta: document.getElementById("dieta").value,
    alergias: document.getElementById("alergias").value.trim(),
    cocina: document.getElementById("cocina").value
  };

  if (!data.ingredientes) {
    alert("Por favor, ingresa al menos un ingrediente 🍅");
    return;
  }

  // Guardar preferencias en LocalStorage
  localStorage.setItem("ai_food_prefs", JSON.stringify(data));

  planBtn.disabled = true;
  planBtn.textContent = "⏳ Generando recetas...";

  try {
    const res = await fetch("/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    renderResults(json.recipes);
  } catch (err) {
    console.error(err);
    alert("Error al conectar con la IA. Intenta de nuevo.");
  } finally {
    planBtn.disabled = false;
    planBtn.textContent = "🍲 Planificar comidas";
  }
});

// Renderizar resultados
function renderResults(recipes) {
  recetasDiv.innerHTML = "";
  listaUl.innerHTML = "";
  results.classList.remove("hidden");

  if (!recipes || recipes.length === 0) {
    recetasDiv.innerHTML = "<p>No se encontraron recetas.</p>";
    return;
  }

  recipes.forEach((r) => {
    const receta = document.createElement("div");
    receta.classList.add("receta");
    receta.innerHTML = `
      <h3>${r.nombre}</h3>
      <p><strong>Calorías:</strong> ${r.calorias || "N/A"} | <strong>Dificultad:</strong> ${r.dificultad || "N/A"}</p>
      <h4>Ingredientes usados:</h4>
      <ul>${r.ingredientes_usados.map(i => `<li>${i}</li>`).join("")}</ul>
      <h4>Pasos:</h4>
      <ul>${r.pasos.map(p => `<li>${p}</li>`).join("")}</ul>
    `;
    recetasDiv.appendChild(receta);

    // Agregar faltantes a lista de compras
    if (r.ingredientes_faltantes?.length > 0) {
      r.ingredientes_faltantes.forEach((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        listaUl.appendChild(li);
      });
    }
  });
}

// Exportar lista a archivo TXT
exportBtn.addEventListener("click", () => {
  const items = Array.from(listaUl.querySelectorAll("li")).map(li => li.textContent);
  if (items.length === 0) {
    alert("No hay elementos para exportar 🛒");
    return;
  }

  const blob = new Blob([items.join("\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "lista_de_compras.txt";
  link.click();
});
