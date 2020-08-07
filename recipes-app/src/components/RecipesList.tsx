import React, { Component } from "react";
import RecipeListItem from "./RecipeListItem";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface RecipesListProps extends RouteComponentProps {
  recipesList: Recipe[];
  setSelectingRecipeID: (recipeID: string) => void;
  selectingRecipeID: string;
}

class RecipesList extends Component<RecipesListProps> {
  render() {
    const { recipesList, setSelectingRecipeID, selectingRecipeID } = this.props;
    return (
      <ul className='list-group mt-4'>
        {recipesList.map((recipe: Recipe) => (
          <RecipeListItem
            key={recipe.id}
            recipeID={recipe.id}
            name={recipe.name}
            description={recipe.description}
            imageURL={recipe.imageURL}
            setSelectingRecipeID={setSelectingRecipeID}
            isActive={selectingRecipeID === recipe.id}
          />
        ))}
      </ul>
    );
  }
}

export default withRouter(RecipesList);
