import { useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RecipeForm, FormData } from "@/components/RecipeForm";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { RecipeExtras } from "@/components/RecipeExtras";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/food-hero.jpg";

// API response interface
interface ApiRecipeIngredient {
  amount: string;
  available: boolean;
  ingredient: string;
}

interface ApiRecipeNutrition {
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
}

interface ApiRecipe {
  description: string;
  difficulty: string;
  ingredients_needed: ApiRecipeIngredient[];
  instructions: string[];
  name: string;
  nutrition: ApiRecipeNutrition;
  prep_time: string;
  servings: number;
}

interface ApiResponse {
  data: {
    recipes: ApiRecipe[];
    shopping_list: string[];
    tips: string[];
  };
  response_time: string;
  source: string;
  success: boolean;
}

const translations = {
  en: {
    title: "AI Food Planner",
    subtitle: "Transform your ingredients into delicious recipes",
    description: "No idea what to cook? Let AI help you create amazing meals with what you have!",
  },
  es: {
    title: "Planificador de Comidas AI",
    subtitle: "Transforma tus ingredientes en recetas deliciosas",
    description: "¿No sabes qué cocinar? ¡Deja que la AI te ayude a crear comidas increíbles con lo que tienes!",
  },
};

const Index = () => {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const t = translations[language];

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  // Function to map API response to the format expected by RecipeDisplay
  const mapApiResponseToRecipes = (apiResponse: ApiResponse) => {
    return apiResponse.data.recipes.map(recipe => {
      // Format ingredients as strings with amount and ingredient name
      const ingredients = recipe.ingredients_needed.map(item => 
        `${item.amount} ${item.ingredient}${!item.available ? ' (not available)' : ''}`
      );
      
      return {
        name: recipe.name,
        description: recipe.description,
        prepTime: recipe.prep_time,
        servings: recipe.servings.toString(),
        ingredients: ingredients,
        instructions: recipe.instructions,
        // Additional properties that could be useful
        difficulty: recipe.difficulty,
        nutrition: recipe.nutrition,
      };
    });
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call
      // For now, we'll use the sample response provided
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Sample API response (in a real app, this would come from an API call)
      const apiResponse: ApiResponse = {
        "data": {
          "recipes": [
            {
              "description": "Un plato vegetariano rápido y nutritivo, inspirado en los sabores mediterráneos de Italia. Perfecto para una comida ligera y sin gluten. Hemos omitido el pollo para cumplir con la dieta vegetariana.",
              "difficulty": "Fácil",
              "ingredients_needed": [
                {
                  "amount": "1 taza (200g)",
                  "available": true,
                  "ingredient": "Arroz (grano corto o redondo)"
                },
                {
                  "amount": "1/2 unidad",
                  "available": true,
                  "ingredient": "Cebolla mediana"
                },
                {
                  "amount": "2 unidades (o 400g de tomate triturado/cubos)",
                  "available": true,
                  "ingredient": "Tomates maduros"
                },
                {
                  "amount": "2 unidades",
                  "available": true,
                  "ingredient": "Dientes de ajo"
                },
                {
                  "amount": "2 cucharadas",
                  "available": true,
                  "ingredient": "Aceite de oliva virgen extra"
                },
                {
                  "amount": "3 tazas (750ml)",
                  "available": false,
                  "ingredient": "Caldo de verduras"
                },
                {
                  "amount": "Un puñado",
                  "available": false,
                  "ingredient": "Albahaca fresca"
                },
                {
                  "amount": "Al gusto",
                  "available": false,
                  "ingredient": "Sal"
                },
                {
                  "amount": "Al gusto",
                  "available": false,
                  "ingredient": "Pimienta negra molida"
                },
                {
                  "amount": "2 cucharadas",
                  "available": false,
                  "ingredient": "Queso parmesano vegetariano (opcional)"
                }
              ],
              "instructions": [
                "Pica finamente la cebolla y los ajos. Si usas tomates frescos, córtalos en cubos pequeños.",
                "En una sartén o cacerola mediana, calienta el aceite de oliva a fuego medio. Añade la cebolla y sofríe hasta que esté transparente, unos 5-7 minutos. Agrega el ajo picado y cocina por 1 minuto más, hasta que esté fragante.",
                "Incorpora el arroz a la sartén y remueve durante 1-2 minutos para que se tueste ligeramente y se impregne del aceite y los sabores.",
                "Añade los tomates picados (o triturados) y cocina por 2-3 minutos, removiendo ocasionalmente.",
                "Vierte el caldo de verduras caliente. Lleva a ebullición, luego reduce el fuego a bajo, tapa la sartén y cocina durante 18-20 minutos, o hasta que el arroz haya absorbido la mayor parte del líquido y esté tierno.",
                "Retira del fuego. Sazona con sal y pimienta al gusto. Incorpora la albahaca fresca picada. Si lo deseas, añade el queso parmesano vegetariano y remueve.",
                "Sirve inmediatamente."
              ],
              "name": "Arroz a la Italiana con Tomate y Albahaca",
              "nutrition": {
                "calories": 400,
                "carbs": "75g",
                "fat": "17g",
                "protein": "12g"
              },
              "prep_time": "10 min",
              "servings": 2
            }
          ],
          "shopping_list": [
            "Caldo de verduras",
            "Albahaca fresca",
            "Sal",
            "Pimienta negra molida",
            "Queso parmesano vegetariano (opcional)"
          ],
          "tips": [
            "Para una versión con pollo (si no sigues una dieta vegetariana), puedes añadir 200g de pechuga de pollo cortada en cubos y salteada al inicio con la cebolla.",
            "Para una textura más cremosa, no laves el arroz antes de cocinarlo.",
            "Ajusta la cantidad de caldo para lograr la consistencia de arroz deseada; si te gusta más seco, usa un poco menos, si lo prefieres más caldoso, añade un poco más al final."
          ]
        },
        "response_time": "24.72s",
        "source": "gemini",
        "success": true
      };

      // Map the API response to the format expected by RecipeDisplay
      const mappedRecipes = mapApiResponseToRecipes(apiResponse);
      setRecipes(mappedRecipes);
      
      // Set shopping list and tips
      setShoppingList(apiResponse.data.shopping_list || []);
      setTips(apiResponse.data.tips || []);
      
      toast({
        title: language === "en" ? "Recipes generated!" : "¡Recetas generadas!",
        description: language === "en" 
          ? "Your personalized recipes are ready" 
          : "Tus recetas personalizadas están listas",
      });
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" 
          ? "Failed to generate recipes. Please try again." 
          : "No se pudieron generar las recetas. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
            {t.title}
          </h1>
          <LanguageToggle language={language} onToggle={handleLanguageToggle} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Fresh ingredients" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t.subtitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Recipe Form */}
          <section className="bg-card rounded-lg p-6 md:p-8 shadow-soft">
            <RecipeForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading} 
              language={language} 
            />
          </section>

          {/* Recipe Results */}
          {recipes.length > 0 && (
            <section className="space-y-8">
              <RecipeDisplay recipes={recipes} language={language} />
              
              {/* Shopping List and Tips */}
              <RecipeExtras 
                shoppingList={shoppingList} 
                tips={tips} 
                language={language} 
              />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>
            {language === "en" 
              ? "Made with ❤️ for food lovers everywhere" 
              : "Hecho con ❤️ para los amantes de la comida en todas partes"}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
