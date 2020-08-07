import React, { Component } from "react";
import { Link } from "react-router-dom";

interface NewRecipeProps {
  setSelectingRecipeID: (recipeID: string) => void;
}
export default class NewRecipe extends Component<NewRecipeProps> {
  handleOnClick = () => {
    const { setSelectingRecipeID } = this.props;

    setSelectingRecipeID("");
  };

  render() {
    return (
      <div className='py-4 px-2 border-bottom text-left'>
        <Link to='/recipes/create-new-recipes' onClick={this.handleOnClick}>
          <button className='btn btn-success'>New Recipe</button>
        </Link>
      </div>
    );
  }
}
