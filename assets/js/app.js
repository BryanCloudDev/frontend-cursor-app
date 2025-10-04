// AI Food Planner Frontend Script with i18n support

// Language translations
const translations = {
  en: {
    // Header
    "header-desc": "Plan your meals based on what you have at home.",
    
    // Ingredients section
    "ingredients-title": "Available Ingredients",
    "ingredients-placeholder": "Example: rice, chicken, onion, tomato",
    
    // Preferences section
    "preferences-title": "Preferences",
    "diet-label": "Diet Type",
    "diet-any": "Any",
    "diet-vegan": "Vegan",
    "diet-vegetarian": "Vegetarian",
    "diet-keto": "Keto",
    "diet-paleo": "Paleo",
    "diet-pescatarian": "Pescatarian",
    "diet-gluten-free": "Gluten Free",
    "diet-dairy-free": "Dairy Free",
    "diet-low-carb": "Low Carb",
    "diet-high-protein": "High Protein",
    
    "allergies-label": "Allergies or Restrictions",
    "allergies-placeholder": "Ex: gluten, nuts",
    
    "cuisine-label": "Cuisine Type",
    "cuisine-international": "International",
    "cuisine-mexican": "Mexican",
    "cuisine-italian": "Italian",
    "cuisine-asian": "Asian",
    "cuisine-mediterranean": "Mediterranean",
    "cuisine-indian": "Indian",
    "cuisine-french": "French",
    "cuisine-spanish": "Spanish",
    "cuisine-greek": "Greek",
    "cuisine-middle-eastern": "Middle Eastern",
    "cuisine-thai": "Thai",
    "cuisine-japanese": "Japanese",
    "cuisine-chinese": "Chinese",
    "cuisine-korean": "Korean",
    "cuisine-american": "American",
    "cuisine-latin-american": "Latin American",
    
    "plan-button": "🍲 Plan Meals",
    
    // Results section
    "recipes-title": "Suggested Recipes",
    "shopping-list-title": "Shopping List",
    "export-button": "💾 Export List",
    
    // Recipe rendering
    "calories": "Calories",
    "difficulty": "Difficulty",
    "used-ingredients": "Used Ingredients",
    "steps": "Steps",
    "no-recipes": "No recipes found.",
    
    // Alerts
    "ingredients-required": "Please enter at least one ingredient 🍅",
    "api-error": "Error connecting to the AI. Please try again.",
    "generating": "⏳ Generating recipes...",
    "no-items": "No items to export 🛒",
    
    // Footer
    "footer-text": "Developed with ❤️ using LangChain + Gemini"
  },
  es: {
    // Header
    "header-desc": "Planifica tus comidas según lo que tienes en casa.",
    
    // Ingredients section
    "ingredients-title": "Ingredientes disponibles",
    "ingredients-placeholder": "Ejemplo: arroz, pollo, cebolla, tomate",
    
    // Preferences section
    "preferences-title": "Preferencias",
    "diet-label": "Tipo de dieta",
    "diet-any": "Libre",
    "diet-vegan": "Vegana",
    "diet-vegetarian": "Vegetariana",
    "diet-keto": "Keto",
    "diet-paleo": "Paleo",
    "diet-pescatarian": "Pescatariana",
    "diet-gluten-free": "Sin Gluten",
    "diet-dairy-free": "Sin Lácteos",
    "diet-low-carb": "Baja en Carbohidratos",
    "diet-high-protein": "Alta en Proteínas",
    
    "allergies-label": "Alergias o restricciones",
    "allergies-placeholder": "Ej: gluten, nueces",
    
    "cuisine-label": "Tipo de cocina",
    "cuisine-international": "Internacional",
    "cuisine-mexican": "Mexicana",
    "cuisine-italian": "Italiana",
    "cuisine-asian": "Asiática",
    "cuisine-mediterranean": "Mediterránea",
    "cuisine-indian": "India",
    "cuisine-french": "Francesa",
    "cuisine-spanish": "Española",
    "cuisine-greek": "Griega",
    "cuisine-middle-eastern": "Medio Oriente",
    "cuisine-thai": "Tailandesa",
    "cuisine-japanese": "Japonesa",
    "cuisine-chinese": "China",
    "cuisine-korean": "Coreana",
    "cuisine-american": "Americana",
    "cuisine-latin-american": "Latinoamericana",
    
    "plan-button": "🍲 Planificar comidas",
    
    // Results section
    "recipes-title": "Recetas sugeridas",
    "shopping-list-title": "Lista de compras",
    "export-button": "💾 Exportar lista",
    
    // Recipe rendering
    "calories": "Calorías",
    "difficulty": "Dificultad",
    "used-ingredients": "Ingredientes usados",
    "steps": "Pasos",
    "no-recipes": "No se encontraron recetas.",
    
    // Alerts
    "ingredients-required": "Por favor, ingresa al menos un ingrediente 🍅",
    "api-error": "Error al conectar con la IA. Intenta de nuevo.",
    "generating": "⏳ Generando recetas...",
    "no-items": "No hay elementos para exportar 🛒",
    
    // Footer
    "footer-text": "Desarrollado con ❤️ usando LangChain + Gemini"
  }
};

// DOM Elements
const planBtn = document.getElementById("planBtn");
const exportBtn = document.getElementById("exportBtn");
const results = document.getElementById("results");
const recetasDiv = document.getElementById("recetas");
const listaUl = document.getElementById("lista");
const langButtons = document.querySelectorAll(".lang-btn");

// Initialize language
let currentLanguage = localStorage.getItem("ai_food_language") || "es";

// Set up language buttons
document.addEventListener("DOMContentLoaded", function() {
  // Set initial active button
  updateActiveLanguageButton();
  
  // Apply translations immediately
  applyTranslations();
  
  // Add event listeners for language buttons
  langButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const newLang = this.getAttribute("data-lang");
      if (newLang !== currentLanguage) {
        currentLanguage = newLang;
        localStorage.setItem("ai_food_language", currentLanguage);
        updateActiveLanguageButton();
        applyTranslations();
        console.log("Language changed to:", currentLanguage);
      }
    });
  });
});

// Update active language button
function updateActiveLanguageButton() {
  langButtons.forEach(btn => {
    if (btn.getAttribute("data-lang") === currentLanguage) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Apply translations based on current language
function applyTranslations() {
  // Update HTML elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
  
  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[currentLanguage][key]) {
      element.placeholder = translations[currentLanguage][key];
    }
  });
  
  // Update select options with data-i18n attribute
  document.querySelectorAll("option[data-i18n]").forEach(option => {
    const key = option.getAttribute("data-i18n");
    if (translations[currentLanguage][key]) {
      option.textContent = translations[currentLanguage][key];
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = currentLanguage;
}

// Get translated text
function t(key) {
  return translations[currentLanguage][key] || key;
}

// Evento principal
planBtn.addEventListener("click", async () => {
  // Always use English values for API
  const data = {
    ingredients: document.getElementById("ingredientes").value.trim(),
    diet: document.getElementById("dieta").value,
    allergies: document.getElementById("alergias").value.trim(),
    cuisine: document.getElementById("cocina").value,
    language: currentLanguage // Send current language to backend for response formatting
  };

  if (!data.ingredients) {
    alert(t("ingredients-required"));
    return;
  }

  // Guardar preferencias en LocalStorage
  localStorage.setItem("ai_food_prefs", JSON.stringify(data));

  planBtn.disabled = true;
  planBtn.textContent = t("generating");

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
    alert(t("api-error"));
  } finally {
    planBtn.disabled = false;
    planBtn.textContent = t("plan-button");
  }
});

// Renderizar resultados
function renderResults(recipes) {
  recetasDiv.innerHTML = "";
  listaUl.innerHTML = "";
  
  // Show results with animation
  results.classList.remove("hidden");
  setTimeout(() => {
    results.classList.add("visible");
  }, 10);

  if (!recipes || recipes.length === 0) {
    recetasDiv.innerHTML = `<p>${t("no-recipes")}</p>`;
    return;
  }

  recipes.forEach((r) => {
    const receta = document.createElement("div");
    receta.classList.add("receta");
    receta.innerHTML = `
      <h3>${r.nombre}</h3>
      <div class="receta-meta">
        <span><strong>${t("calories")}:</strong> ${r.calorias || "N/A"}</span>
        <span><strong>${t("difficulty")}:</strong> ${r.dificultad || "N/A"}</span>
      </div>
      <h4>${t("used-ingredients")}:</h4>
      <ul>${r.ingredientes_usados.map(i => `<li>${i}</li>`).join("")}</ul>
      <h4>${t("steps")}:</h4>
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
    alert(t("no-items"));
    return;
  }

  const blob = new Blob([items.join("\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = currentLanguage === "en" ? "shopping_list.txt" : "lista_de_compras.txt";
  link.click();
});

// Load saved preferences if available
window.addEventListener("DOMContentLoaded", () => {
  const savedPrefs = localStorage.getItem("ai_food_prefs");
  if (savedPrefs) {
    try {
      const prefs = JSON.parse(savedPrefs);
      document.getElementById("ingredientes").value = prefs.ingredients || "";
      document.getElementById("dieta").value = prefs.diet || "any";
      document.getElementById("alergias").value = prefs.allergies || "";
      document.getElementById("cocina").value = prefs.cuisine || "international";
    } catch (e) {
      console.error("Error loading saved preferences", e);
    }
  }
});
