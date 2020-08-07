import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

export default class AppHeader extends Component {
  render() {
    return (
      <header className=''>
        <nav className='navbar navbar-expand-lg navbar-light  d-flex align-items-center justify-content-between bg-primary py-2 px-5'>
          <Link className='navbar-brand text-white' to='/'>
            Customer Manager
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <NavLink
                  className='nav-link text-white'
                  to='/customers/all-customers'
                >
                  Customers
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link text-white' to='/setting'>
                  Setting
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='authenticate'>
            <Link to='/login' className='text-white'>
              Login
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}
