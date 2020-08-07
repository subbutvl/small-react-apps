/// <reference types="react-scripts" />

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
}
interface Recipe {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  ingredients: Ingredient[];
}
