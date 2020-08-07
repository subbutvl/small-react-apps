import React, { Component } from "react";
import MaleAvartar from "../hairstyle-male-svgrepo-com.svg";
import FeMaleAvartar from "../hairstyle-female-svgrepo-com.svg";
import { NavLink, Link } from "react-router-dom";

export default class CustomersListItem extends Component<Customer> {
  render() {
    const {
      gender,
      firstName,
      lastName,
      city,
      address,
      orders,
      id,
    } = this.props;
    return (
      <tr className='text-capitalize'>
        <th scope='row'>
          <img
            src={gender === "male" ? MaleAvartar : FeMaleAvartar}
            className='img-fluid'
            alt='...'
            style={{ minWidth: "4rem" }}
          />
        </th>
        <td>
          <Link to={`/customers/customer-information/details/${id}`}>
            {firstName}
          </Link>
        </td>
        <td>{lastName}</td>
        <td>{city}</td>
        <td>{address}</td>
        <td>
          {orders && orders.length
            ? orders
                .reduce((total, item) => total + item.itemCost, 0)
                .toFixed(2)
            : ""}
        </td>
        <td>
          <NavLink to={`/customers/customer-orders/${id}`}>View Orders</NavLink>
        </td>
      </tr>
    );
  }
}
