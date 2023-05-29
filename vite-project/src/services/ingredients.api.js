import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiKey = "fcf8765f5477482fb567d6bf3a4a042d";

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spoonacular.com' }),
  endpoints: (builder) => ({
    getByIngridients: builder.query({
      query: (ingredients) => ({
        url: "/recipes/findByIngredients", 
        params: {
          ingredients,
          apiKey
        }
      }),
    }),
    getByNutrients: builder.query(
      {
        query: (maxCalories) => ({
            url: '/recipes/findByNutrients',
            params: {
              maxCalories,
              apiKey
            }
          }),
        }),
    getRecipesInformation: builder.query(
      {
        query: (id) => ({
            url: `/recipes/${id}/information`,
            params: {
              id,
              includeNutrition: true,
              apiKey
            }
          }),
        }),
   }),
})

export const { useGetByIngridientsQuery, useGetByNutrientsQuery, useGetRecipesInformationQuery } = ingredientsApi;