import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import MaleAvartar from "../hairstyle-male-svgrepo-com.svg";
import FeMaleAvartar from "../hairstyle-female-svgrepo-com.svg";

interface CustomerCardProps {
  id: number;
  name?: string;
  gender?: string;
  address?: string;
}

export default class CustomerCard extends Component<CustomerCardProps> {
  render() {
    const { name, gender, address, id } = this.props;
    return (
      <div className='col-md-6'>
        <div className='card'>
          <header className='bg-primary d-flex justify-content-between py-2 px-4'>
            <h5 className='text-white text-capitalize'>{name}</h5>
            <Link to={`/customers/edit-customer/${id}`} className='text-white'>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </header>
          <div className='card-body'>
            <div className='media'>
              <img
                src={gender === "male" ? MaleAvartar : FeMaleAvartar}
                className='mr-3'
                alt='...'
              />
              <div className='media-body'>
                <p className='mt-0'>{address}</p>
                <NavLink to={`/customers/customer-orders/${id}`}>
                  View Orders
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
