/**
 * Interface for nutrition information
 */
export interface Nutrition {
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
}

/**
 * Interface for recipe data
 */
export interface Recipe {
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
