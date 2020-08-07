import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

interface RecipeProps extends RouteComponentProps {
  recipeID: string;
  name: string;
  description: string;
  imageURL: string;
  setSelectingRecipeID: (recipeID: string) => void;
  isActive: boolean;
}

const RecipeThumbnail = ({
  imageURL,
  description,
  className,
}: {
  imageURL: string;
  description: string;
  className?: string;
}) => (
  <img
    src={imageURL}
    className={`align-self-center mr-3 img-thumbnail ${className}`}
    alt={description}
  />
);

const StyledRecipeThumbnail = styled(RecipeThumbnail)`
  max-width: 6rem;
`;

class RecipeListItem extends Component<RecipeProps> {
  handleSelectRecipe = (recipeID: string) => {
    const { history, setSelectingRecipeID } = this.props;
    setSelectingRecipeID(recipeID);
    history.push(`/recipes/recipe-detail/${recipeID}`);
  };

  render() {
    const { recipeID, name, description, imageURL, isActive } = this.props;

    return (
      <li
        className={`list-group-item ${isActive ? "active" : ""}`}
        onClick={() => this.handleSelectRecipe(recipeID)}
      >
        <div className='media'>
          <div className='media-body text-left'>
            <h5 className='mt-0'>{name}</h5>
            <p
              className='text-truncate d-inline-block'
              style={{ maxWidth: "15rem" }}
            >
              {description}
            </p>
          </div>
          <StyledRecipeThumbnail
            imageURL={imageURL}
            description={description}
          />
        </div>
      </li>
    );
  }
}

export default withRouter(RecipeListItem);
