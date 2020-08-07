import React, { Component } from "react";
import { RouteComponentProps, NavLink, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faTag, faEdit } from "@fortawesome/free-solid-svg-icons";
import CustomerDetail from "./CustomerDetail";
import CustomerOrder from "./CustomerOrder";
import CustomerForm from "./CustomerForm";

interface CustomerInformationProps extends RouteComponentProps {
  customersList: Customer[];
}
export default class CustomerInformation extends Component<
  CustomerInformationProps
> {
  render() {
    const { customersList } = this.props;
    return (
      <div>
        <header>
          <ul className='list-inline'>
            <li className='list-inline-item'>
              <NavLink
                to='/customers/customer-information/details'
                className='text-secondary font-weight-bold mr-3'
              >
                <FontAwesomeIcon icon={faHamburger} className='mr-2' />
                Customer Details
              </NavLink>
            </li>
            <li className='list-inline-item'>
              <NavLink
                to='/customers/customer-information/orders'
                className='text-secondary font-weight-bold mr-3'
              >
                <FontAwesomeIcon icon={faTag} className='mr-2' />
                Customer Orders
              </NavLink>
            </li>
            <li className='list-inline-item'>
              <NavLink
                to='/customers/customer-information/new-customer'
                className='text-secondary font-weight-bold mr-3'
              >
                <FontAwesomeIcon icon={faEdit} className='mr-2' />
                Edit Customer
              </NavLink>
            </li>
          </ul>
        </header>
        <Route
          path='/customers/customer-information/details/:customerID'
          render={(routeProps) => (
            <CustomerDetail {...routeProps} customersList={customersList} />
          )}
        />
        <Route
          path='/customers/customer-information/orders/:customerID'
          render={(routeProps) => <CustomerOrder {...routeProps} />}
        />
        <Route
          path='/customers/customer-information/new-customer'
          render={(routeProps) => <CustomerForm {...routeProps} />}
        />
        <Route
          path='/customers/customer-information/edit-customer/:customerID'
          render={(routeProps) => <CustomerForm {...routeProps} />}
        />
        <Link to='/customers/all-customers'>View all Customers</Link>
      </div>
    );
  }
}
