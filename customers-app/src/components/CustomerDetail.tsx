import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import MaleAvartar from "../hairstyle-male-svgrepo-com.svg";
import FeMaleAvartar from "../hairstyle-female-svgrepo-com.svg";
interface CustomerDetailProps extends RouteComponentProps {
  customersList: Customer[];
}
export default class CustomerDetail extends Component<CustomerDetailProps> {
  render() {
    const { match, customersList } = this.props;
    const customerID = (match.params as any).customerID || "";
    const customer = customersList.find(
      (customer: Customer) => customer.id === parseInt(customerID)
    );
    return (
      <div>
        {customer ? (
          <div>
            <img
              src={customer.gender === "male" ? MaleAvartar : FeMaleAvartar}
              alt=''
              className='img-thumbnail'
              style={{ maxWidth: "10rem" }}
            />
            <h2 className='text-capitailize'>
              {customer.firstName} {customer.lastName}
            </h2>
            <p>{customer.address}</p>
            <p>{customer.city}</p>
          </div>
        ) : null}
      </div>
    );
  }
}
