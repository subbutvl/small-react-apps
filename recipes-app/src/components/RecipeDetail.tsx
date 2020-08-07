import React, { Component, Fragment } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import IngredientList from "./IngredientsList";

interface RecipeDetailProps extends RouteComponentProps {
  recipesList: Recipe[];
  deleteRecipe: (recipeID: string) => void;
  addIngredients: (...ingredients: Ingredient[]) => void;
}

export default class RecipeDetail extends Component<RecipeDetailProps> {
  handleAddIngredients = (ingredients: Ingredient[]) => {
    const { addIngredients } = this.props;

    addIngredients(...ingredients);
  };
  render() {
    const { recipesList, deleteRecipe, match } = this.props;
    const recipeID = (match.params as any).recipeID || "";
    const recipe = recipesList.find((item: Recipe) => item.id === recipeID);

    return (
      <Fragment>
        {recipe ? (
          <div>
            <div className='text-center'>
              <img
                src={recipe.imageURL}
                alt={recipe.description}
                className='img-thumbnail'
                style={{ maxWidth: "15rem" }}
              />
            </div>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
            <div className='dropdown'>
              <button
                className='btn btn-primary dropdown-toggle'
                type='button'
                id='dropdownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Manage Recipe
              </button>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'
              >
                <div
                  className='dropdown-item'
                  onClick={() => this.handleAddIngredients(recipe.ingredients)}
                >
                  To Shopping List
                </div>
                <Link
                  className='dropdown-item'
                  to={`/recipes/update-recipe/${recipe.id}`}
                >
                  Edit Recipe
                </Link>
                <div
                  className='dropdown-item'
                  onClick={() => {
                    deleteRecipe(recipeID);
                  }}
                >
                  Delete Recipe
                </div>
              </div>
              <div className='mt-4'>
                <IngredientList ingredients={recipe.ingredients} />
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
