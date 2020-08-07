import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className='navbar-brand'>
          Recipe Bookeessss
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
              <NavLink to='/recipes' className='nav-link'>
                Recipes
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/shopping-list' className='nav-link'>
                Shopping List
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
