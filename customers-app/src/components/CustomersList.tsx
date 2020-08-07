import React, { Component } from "react";
import CustomersListItem from "./CustomersListItem";

interface CustomersListProps {
  customersList: Customer[];
}

export default class CustomersList extends Component<CustomersListProps> {
  render() {
    const { customersList } = this.props;

    return (
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th scope='col'></th>
            <th scope='col'>Firstname</th>
            <th scope='col'>Lastname</th>
            <th scope='col'>Address</th>
            <th scope='col'>City</th>
            <th scope='col'>Orders Total</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {customersList.map((customer: Customer) => (
            <CustomersListItem
              id={customer.id}
              lastName={customer.lastName}
              firstName={customer.firstName}
              city={customer.city}
              address={customer.address}
              gender={customer.gender}
              orders={customer.orders}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
