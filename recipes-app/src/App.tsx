import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./App.css";
import seed from "./seed.json";
import * as uuid from "uuid";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import RecipeSection from "./components/RecipeSection";
import ShoppingListSection from "./components/ShoppingListSection";

interface AppState {
  recipesList: Recipe[];
  selectingRecipeID: string;
  ingredientsList: Ingredient[];
}

const createUniqueList = (list: any[]) =>
  list.map((item: any) => ({ ...item, id: uuid.v4() }));
class App extends Component<any, AppState> {
  state = {
    recipesList: seed.map((item) => ({
      ...item,
      id: uuid.v4(),
      ingredients: createUniqueList(item.ingredients),
    })),
    selectingRecipeID: "",
    ingredientsList: [] as Ingredient[],
  };

  setSelectingRecipeID = (recipeID: string) => {
    this.setState({ selectingRecipeID: recipeID });
  };

  createNewRecipe = (recipe: Recipe) => {
    const uniqueRecipe = {
      ...recipe,
      id: uuid.v4(),
      ingredients: createUniqueList(recipe.ingredients),
    };

    this.setState({
      recipesList: [...this.state.recipesList, uniqueRecipe],
    });
  };

  updateRecipe = (newRecipe: Recipe) => {
    const recipes = [...this.state.recipesList];
    const updatedRecipeIndex = recipes.findIndex(
      (item) => item.id === newRecipe.id
    );

    if (updatedRecipeIndex !== -1) {
      recipes[updatedRecipeIndex] = newRecipe;
    }

    this.setState({
      recipesList: recipes,
    });
  };

  deleteRecipe = (recipeID: string) => {
    this.setState({
      recipesList: this.state.recipesList.filter(
        (recipe: Recipe) => recipe.id !== recipeID
      ),
    });
  };

  addIngredients = (...ingredients: Ingredient[]) => {
    this.setState({
      ingredientsList: [
        ...this.state.ingredientsList,
        ...createUniqueList(ingredients),
      ],
    });
  };

  deleteIngredient = (ingredientID: string) => {
    this.setState({
      ingredientsList: this.state.ingredientsList.filter(
        (ingredient: Ingredient) => ingredient.id !== ingredientID
      ),
    });
  };

  updateIngredient = (newIngredient: Ingredient) => {
    const ingredients = [...this.state.ingredientsList];
    const updatedIngredientIndex = ingredients.findIndex(
      (item: Ingredient) => item.id === newIngredient.id
    );

    if (updatedIngredientIndex !== -1) {
      ingredients[updatedIngredientIndex] = newIngredient;
    }

    this.setState({
      ingredientsList: ingredients,
    });
  };

  render() {
    const { recipesList, selectingRecipeID, ingredientsList } = this.state;

    return (
      <div className='App'>
        <Router>
          <AppHeader />
          <Route
            path='/recipes'
            render={(routeProps) => (
              <RecipeSection
                recipesList={recipesList}
                createNewRecipe={this.createNewRecipe}
                updateRecipe={this.updateRecipe}
                deleteRecipe={this.deleteRecipe}
                setSelectingRecipeID={this.setSelectingRecipeID}
                selectingRecipeID={selectingRecipeID}
                addIngredients={this.addIngredients}
                {...routeProps}
              />
            )}
          />
          <Route
            path='/shopping-list'
            render={(routeProps) => (
              <ShoppingListSection
                ingredientsList={ingredientsList}
                addIngredients={this.addIngredients}
                updateIngredient={this.updateIngredient}
                deleteIngredient={this.deleteIngredient}
                {...routeProps}
              />
            )}
          />
          <Route path='/' exact render={() => <Redirect to='/recipes' />} />
        </Router>
      </div>
    );
  }
}

export default App;
