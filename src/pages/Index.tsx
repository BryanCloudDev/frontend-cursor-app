import { useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RecipeForm, FormData } from "@/components/RecipeForm";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import type { Recipe } from "@/types/recipe";
import { RecipeExtras } from "@/components/RecipeExtras";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/food-hero.jpg";
import { getRecipeRecommendations, mapApiResponseToRecipes } from "@/services/recipeService";

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
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const t = translations[language];

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };


  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      // Call the API to get recipe recommendations
      const apiResponse = await getRecipeRecommendations(formData);

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
