import { API_CONFIG } from '@/config/api';
import { FormData } from '@/components/RecipeForm';
import type { Recipe, Nutrition } from '@/types/recipe';

// API response interfaces
export interface ApiRecipeIngredient {
  amount: string;
  available: boolean;
  ingredient: string;
}

export interface ApiRecipeNutrition {
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
}

export interface ApiRecipe {
  description: string;
  difficulty: string;
  ingredients_needed: ApiRecipeIngredient[];
  instructions: string[];
  name: string;
  nutrition: ApiRecipeNutrition;
  prep_time: string;
  servings: number;
}

export interface ApiResponse {
  data: {
    recipes: ApiRecipe[];
    shopping_list: string[];
    tips: string[];
  };
  response_time: string;
  source: string;
  success: boolean;
}

/**
 * Fetches recipe recommendations based on user input
 * @param formData User input from the recipe form
 * @returns Promise with the API response
 */
export const getRecipeRecommendations = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        available_ingredients: formData.ingredients,
        diet_type: formData.dietType,
        restrictions: formData.restrictions,
        cuisine_type: formData.cuisineType,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe recommendations:', error);
    throw error;
  }
};

/**
 * Maps API response to the format expected by the RecipeDisplay component
 * @param apiResponse The API response from the server
 * @returns Mapped recipes in the format expected by RecipeDisplay
 */
export const mapApiResponseToRecipes = (apiResponse: ApiResponse): Recipe[] => {
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
      // Additional properties
      difficulty: recipe.difficulty,
      nutrition: recipe.nutrition,
    };
  });
};
