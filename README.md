# Kitchen Cursor App

A React application that helps users generate recipes based on ingredients they have, dietary preferences, and cuisine types.

## API Integration

The application integrates with a recipe generation API that provides personalized recipe recommendations based on user input.

### API Configuration

The API base URL is configured in `src/config/api.ts`. By default, it points to a local API server:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5007', // Local API server
};
```

### API Service

The API integration is implemented in `src/services/recipeService.ts`, which provides:

1. **API Response Interfaces**: TypeScript interfaces that define the structure of the API response.
2. **getRecipeRecommendations**: A function that sends a POST request to the `/plan` endpoint with the user's input.
3. **mapApiResponseToRecipes**: A function that transforms the API response into the format expected by the UI components.

### API Request Format

When calling the `/plan` endpoint, the application sends a JSON payload with the following structure:

```json
{
  "available_ingredients": "pollo, arroz, cebolla, tomate, ajo, aceite de oliva",
  "diet_type": "Libre",
  "restrictions": "Ninguna",
  "cuisine_type": "Internacional"
}
```

The field names in the request must match exactly what the API expects:
- `available_ingredients`: A comma-separated list of ingredients the user has
- `diet_type`: The type of diet (e.g., "Libre", "Vegetariana")
- `restrictions`: Any dietary restrictions or allergies
- `cuisine_type`: The preferred cuisine type (e.g., "Internacional", "Italiana")

### Data Flow

1. User submits the form with ingredients, diet type, restrictions, and cuisine type.
2. The application calls the `getRecipeRecommendations` function with the form data.
3. The API responds with recipe recommendations, shopping list, and cooking tips.
4. The `mapApiResponseToRecipes` function transforms the API response into the format expected by the UI.
5. The application displays the recipes, shopping list, and tips to the user.

## Type Definitions

The application uses TypeScript interfaces to ensure type safety:

- `Recipe`: Defines the structure of a recipe object used by the UI components.
- `Nutrition`: Defines the structure of nutrition information for a recipe.
- `ApiResponse`: Defines the structure of the API response.
- `ApiRecipe`: Defines the structure of a recipe object in the API response.
- `ApiRecipeIngredient`: Defines the structure of an ingredient object in the API response.
- `ApiRecipeNutrition`: Defines the structure of nutrition information in the API response.

## Components

- `RecipeForm`: Allows users to input ingredients, diet type, restrictions, and cuisine type.
- `RecipeDisplay`: Displays the generated recipes with details like ingredients, instructions, and nutrition information.
- `RecipeExtras`: Displays additional information like shopping list and cooking tips.

## Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (usually http://localhost:8080).

## Building for Production

To build the application for production:

```
npm run build
```

The build artifacts will be stored in the `dist/` directory.
