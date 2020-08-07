import React, { Component } from "react";

interface IngredientsListItemProps {
  id: string;
  name: string;
  quantity: number;
  isActive?: boolean;
  handleOnClick?: (ingredienID: string) => void;
}

export default class IngredientsListItem extends Component<
  IngredientsListItemProps
> {
  render() {
    const { id, name, quantity, isActive, handleOnClick } = this.props;
    return (
      <li
        className={`list-group-item ${isActive ? "active" : ""}`}
        onClick={() => {
          handleOnClick && handleOnClick(id);
        }}
      >
        {handleOnClick ? `${name} (${quantity})` : `${name} - ${quantity}`}
      </li>
    );
  }
}
