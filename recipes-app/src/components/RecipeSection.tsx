import React, { Component } from "react";
import NewRecipe from "./NewRecipe";
import RecipesList from "./RecipesList";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";
import { Route, Switch } from "react-router-dom";

const SelectRecipe = () => (
  <h1 className='text-center mt-4'>Please select a recipe!</h1>
);

interface RecipeSectionProps {
  recipesList: Recipe[];
  createNewRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipe: string) => void;
  setSelectingRecipeID: (recipeID: string) => void;
  addIngredients: (...ingredients: Ingredient[]) => void;
  selectingRecipeID: string;
}

class RecipeSection extends Component<RecipeSectionProps> {
  render() {
    const {
      recipesList,
      createNewRecipe,
      updateRecipe,
      deleteRecipe,
      setSelectingRecipeID,
      selectingRecipeID,
      addIngredients,
    } = this.props;

    return (
      <main>
        <div className='container'>
          <div className='row'>
            <div className='col-md-5'>
              <NewRecipe setSelectingRecipeID={setSelectingRecipeID} />
              <RecipesList
                recipesList={recipesList}
                setSelectingRecipeID={setSelectingRecipeID}
                selectingRecipeID={selectingRecipeID}
              />
            </div>
            <div className='col-md-7'>
              <div className='p-4'>
                <Switch>
                  <Route
                    path='/recipes/recipe-detail/:recipeID'
                    render={(routeProps) => (
                      <RecipeDetail
                        recipesList={recipesList}
                        deleteRecipe={deleteRecipe}
                        addIngredients={addIngredients}
                        {...routeProps}
                      />
                    )}
                  />
                  <Route
                    path='/recipes/update-recipe/:recipeID'
                    render={(routeProps) => (
                      <RecipeForm
                        match={routeProps.match}
                        history={routeProps.history}
                        location={routeProps.location}
                        recipesList={recipesList}
                        updateRecipe={updateRecipe}
                      />
                    )}
                  />
                  <Route
                    path='/recipes/create-new-recipes'
                    render={(routeProps) => (
                      <RecipeForm
                        match={routeProps.match}
                        history={routeProps.history}
                        location={routeProps.location}
                        createNewRecipe={createNewRecipe}
                      />
                    )}
                  />
                  <Route path='/recipes' component={SelectRecipe} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default RecipeSection;
