import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, UtensilsCrossed, Gauge, Utensils } from "lucide-react";

interface Nutrition {
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
}

interface Recipe {
  name: string;
  description: string;
  prepTime?: string;
  servings?: string;
  ingredients?: string[];
  instructions?: string[];
  // Additional properties from API response
  difficulty?: string;
  nutrition?: Nutrition;
}

interface RecipeDisplayProps {
  recipes: Recipe[];
  language: "en" | "es";
}

const translations = {
  en: {
    yourRecipes: "Your Personalized Recipes",
    noRecipes: "No recipes yet. Fill out the form to get started!",
    prepTime: "Prep Time",
    servings: "Servings",
    ingredients: "Ingredients",
    instructions: "Instructions",
    difficulty: "Difficulty",
    nutrition: "Nutrition",
    calories: "Calories",
    carbs: "Carbs",
    protein: "Protein",
    fat: "Fat",
    shoppingList: "Shopping List",
    tips: "Tips",
  },
  es: {
    yourRecipes: "Tus Recetas Personalizadas",
    noRecipes: "Aún no hay recetas. ¡Completa el formulario para comenzar!",
    prepTime: "Tiempo de Preparación",
    servings: "Porciones",
    ingredients: "Ingredientes",
    instructions: "Instrucciones",
    difficulty: "Dificultad",
    nutrition: "Nutrición",
    calories: "Calorías",
    carbs: "Carbohidratos",
    protein: "Proteínas",
    fat: "Grasas",
    shoppingList: "Lista de Compras",
    tips: "Consejos",
  },
};

export const RecipeDisplay = ({ recipes, language }: RecipeDisplayProps) => {
  const t = translations[language];

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <UtensilsCrossed className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg">{t.noRecipes}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center bg-gradient-warm bg-clip-text text-transparent">
        {t.yourRecipes}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {recipes.map((recipe, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-soft transition-smooth">
            <CardHeader className="bg-gradient-subtle">
              <CardTitle className="text-2xl">{recipe.name}</CardTitle>
              <CardDescription className="text-base">{recipe.description}</CardDescription>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                {recipe.prepTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings}</span>
                  </div>
                )}
                {recipe.difficulty && (
                  <div className="flex items-center gap-1">
                    <Gauge className="h-4 w-4" />
                    <span>{recipe.difficulty}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t.ingredients}</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.instructions && recipe.instructions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t.instructions}</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    {recipe.instructions.map((instruction, i) => (
                      <li key={i} className="pl-2">{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
              
              {recipe.nutrition && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t.nutrition}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t.calories}:</span> 
                      <span>{recipe.nutrition.calories}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t.carbs}:</span> 
                      <span>{recipe.nutrition.carbs}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t.protein}:</span> 
                      <span>{recipe.nutrition.protein}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t.fat}:</span> 
                      <span>{recipe.nutrition.fat}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
