import React, { Component } from "react";
import IngredientsListItem from "./IngredientsListItem";

interface IngredientListProps {
  ingredients: Ingredient[];
  setSelectingIngredientID?: (ingredientID: string) => void;
  selectingIngredientID?: string;
}
export default class IngredientList extends Component<IngredientListProps> {
  render() {
    const {
      ingredients,
      setSelectingIngredientID,
      selectingIngredientID,
    } = this.props;
    return (
      <ul className='list-group'>
        {ingredients.map((ingredient) => (
          <IngredientsListItem
            id={ingredient.id}
            name={ingredient.name}
            quantity={ingredient.quantity}
            isActive={selectingIngredientID === ingredient.id}
            handleOnClick={setSelectingIngredientID}
          />
        ))}
      </ul>
    );
  }
}
