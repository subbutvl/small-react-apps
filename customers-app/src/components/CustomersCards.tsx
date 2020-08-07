import React, { Component } from "react";
import CustomerCard from "./CustomerCard";

interface CustomersCardsProps {
  customersList: Customer[];
}

export default class CustomersCards extends Component<CustomersCardsProps> {
  render() {
    const { customersList } = this.props;

    return (
      <div className='row'>
        {customersList.map((customer: Customer) => (
          <CustomerCard
            key={customer.id}
            name={`${customer.firstName} ${customer.lastName}`}
            gender={customer.gender}
            address={customer.address}
            id={customer.id}
          />
        ))}
      </div>
    );
  }
}
