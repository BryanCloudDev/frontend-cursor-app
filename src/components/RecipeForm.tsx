import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChefHat, Loader2 } from "lucide-react";

interface RecipeFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  language: "en" | "es";
}

export interface FormData {
  ingredients: string;
  dietType: string;
  restrictions: string;
  cuisineType: string;
}

const translations = {
  en: {
    ingredients: "Ingredients You Have",
    ingredientsPlaceholder: "e.g., chicken, tomatoes, rice, garlic...",
    dietType: "Diet Type",
    selectDiet: "Select diet type",
    restrictions: "Restrictions / Allergies",
    restrictionsPlaceholder: "e.g., nut allergy, lactose intolerant...",
    cuisineType: "Cuisine Type",
    selectCuisine: "Select cuisine type",
    generateRecipes: "Generate Recipes",
    generating: "Generating...",
  },
  es: {
    ingredients: "Ingredientes que Tienes",
    ingredientsPlaceholder: "ej., pollo, tomates, arroz, ajo...",
    dietType: "Tipo de Dieta",
    selectDiet: "Selecciona tipo de dieta",
    restrictions: "Restricciones / Alergias",
    restrictionsPlaceholder: "ej., alergia a nueces, intolerancia a la lactosa...",
    cuisineType: "Tipo de Cocina",
    selectCuisine: "Selecciona tipo de cocina",
    generateRecipes: "Generar Recetas",
    generating: "Generando...",
  },
};

const dietTypes = {
  en: ["Any", "Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "Low Carb"],
  es: ["Cualquiera", "Vegetariana", "Vegana", "Keto", "Paleo", "Mediterránea", "Baja en Carbohidratos"],
};

const cuisineTypes = {
  en: ["Any", "Italian", "Mexican", "Asian", "Mediterranean", "American", "Indian", "French"],
  es: ["Cualquiera", "Italiana", "Mexicana", "Asiática", "Mediterránea", "Americana", "India", "Francesa"],
};

export const RecipeForm = ({ onSubmit, isLoading, language }: RecipeFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    ingredients: "",
    dietType: "",
    restrictions: "",
    cuisineType: "",
  });

  const t = translations[language];
  const diets = dietTypes[language];
  const cuisines = cuisineTypes[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ingredients">{t.ingredients}</Label>
        <Textarea
          id="ingredients"
          placeholder={t.ingredientsPlaceholder}
          value={formData.ingredients}
          onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
          className="min-h-[100px] resize-none"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dietType">{t.dietType}</Label>
          <Select
            value={formData.dietType}
            onValueChange={(value) => setFormData({ ...formData, dietType: value })}
          >
            <SelectTrigger id="dietType">
              <SelectValue placeholder={t.selectDiet} />
            </SelectTrigger>
            <SelectContent>
              {diets.map((diet) => (
                <SelectItem key={diet} value={diet}>
                  {diet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuisineType">{t.cuisineType}</Label>
          <Select
            value={formData.cuisineType}
            onValueChange={(value) => setFormData({ ...formData, cuisineType: value })}
          >
            <SelectTrigger id="cuisineType">
              <SelectValue placeholder={t.selectCuisine} />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="restrictions">{t.restrictions}</Label>
        <Textarea
          id="restrictions"
          placeholder={t.restrictionsPlaceholder}
          value={formData.restrictions}
          onChange={(e) => setFormData({ ...formData, restrictions: e.target.value })}
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full"
        disabled={isLoading || !formData.ingredients.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t.generating}
          </>
        ) : (
          <>
            <ChefHat className="h-5 w-5" />
            {t.generateRecipes}
          </>
        )}
      </Button>
    </form>
  );
};
