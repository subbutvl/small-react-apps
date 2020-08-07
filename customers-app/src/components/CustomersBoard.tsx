import React, { Component } from "react";
import { NavLink, Route, RouteComponentProps } from "react-router-dom";
import CustomersCards from "./CustomersCards";
import CustomersList from "./CustomersList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceFour,
  faHamburger,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface CustomersBoardProps extends RouteComponentProps {
  customersList: Customer[];
}

export default class CustomersBoard extends Component<CustomersBoardProps> {
  state = {
    filteringCustomer: "",
    isCardView: true,
  };
  render() {
    const { customersList } = this.props;
    const filterValue = this.state.filteringCustomer;
    const matchedCustomers = filterValue.length
      ? customersList.filter((customer: Customer) =>
          Object.values(customer).some((value) =>
            value.toString().toLowerCase().includes(filterValue.toLowerCase())
          )
        )
      : customersList;

    return (
      <main>
        <header className='d-flex justify-content-between align-items-center'>
          <ul className='list-inline'>
            <li
              className='list-inline-item text-secondary font-weight-bold mr-3'
              onClick={() => this.setState({ isCardView: true })}
            >
              <FontAwesomeIcon icon={faDiceFour} className='mr-2' />
              Card View
            </li>
            <li
              className='list-inline-item text-secondary font-weight-bold mr-3'
              onClick={() => this.setState({ isCardView: false })}
            >
              <FontAwesomeIcon icon={faHamburger} className='mr-2' />
              List View
            </li>
            <li className='list-inline-item text-secondary font-weight-bold mr-3'>
              <NavLink to='/customers/customer-information/new-customer'>
                <FontAwesomeIcon icon={faPlus} className='mr-2' />
                New Customer
              </NavLink>
            </li>
          </ul>
          <div className='form-group'>
            <label htmlFor='customerFilter' className='font-weight-bold'>
              Filter
            </label>
            <input
              className='form-control'
              type='text'
              onChange={(event) => {
                this.setState({
                  filteringCustomer: event.currentTarget.value,
                });
              }}
            ></input>
          </div>
        </header>
        <section>
          {this.state.isCardView ? (
            <CustomersCards customersList={matchedCustomers} />
          ) : (
            <CustomersList customersList={matchedCustomers} />
          )}
        </section>
        <nav aria-label='Page navigation'>
          <ul className='pagination'>
            <li className='page-item'>
              <a className='page-link'>Previous</a>
            </li>
            <li className='page-item'>
              <a className='page-link'>1</a>
            </li>
            <li className='page-item'>
              <a className='page-link'>2</a>
            </li>
            <li className='page-item'>
              <a className='page-link'>3</a>
            </li>
            <li className='page-item'>
              <a className='page-link'>Next</a>
            </li>
          </ul>
        </nav>
      </main>
    );
  }
}
