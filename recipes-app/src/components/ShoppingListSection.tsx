import React, { Component } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientsList";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";
interface ShoppingListSectionProps extends RouteComponentProps {
  ingredientsList: Ingredient[];
  addIngredients: (...ingredients: Ingredient[]) => void;
  updateIngredient: (ingredient: Ingredient) => void;
  deleteIngredient: (ingredientID: string) => void;
}
export default class ShoppingListSection extends Component<
  ShoppingListSectionProps
> {
  state = {
    selectingIngredientID: "",
  };

  setSelectingIngredientID = (ingredientID: string) => {
    const { history } = this.props;

    this.setState({ selectingIngredientID: ingredientID });
    ingredientID &&
      history.push(`/shopping-list/edit-ingredient/${ingredientID}`);
  };

  render() {
    const {
      ingredientsList,
      addIngredients,
      deleteIngredient,
      updateIngredient,
    } = this.props;
    return (
      <div className='container'>
        <div className='p-4 border-bottom'>
          <Route
            path='/shopping-list/new-ingredient'
            render={(routeProps) => (
              <IngredientForm
                ingredientsList={ingredientsList}
                addIngredients={addIngredients}
                setSelectingIngredientID={this.setSelectingIngredientID}
                {...routeProps}
              />
            )}
          />
          <Route
            path='/shopping-list/edit-ingredient/:ingredientID'
            render={(routeProps) => (
              <IngredientForm
                ingredientsList={ingredientsList}
                updateIngredient={updateIngredient}
                deleteIngredient={deleteIngredient}
                setSelectingIngredientID={this.setSelectingIngredientID}
                {...routeProps}
              />
            )}
          />
          <Route
            path='/shopping-list'
            exact
            render={() => <Redirect to='/shopping-list/new-ingredient' />}
          />
        </div>
        <div className='pt-4'>
          <IngredientList
            ingredients={ingredientsList}
            setSelectingIngredientID={this.setSelectingIngredientID}
            selectingIngredientID={this.state.selectingIngredientID}
          />
        </div>
      </div>
    );
  }
}
