import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import UserSelect from "./UserSelect.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMailBulk } from "@fortawesome/free-solid-svg-icons";

const Link = styled(NavLink)`
  display: flex;
  height: calc(100% - 0.5rem);
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;

  &.active {
    border-color: #ddd;
    color: #000;
    background-color: #eee;
  }

  &:active,
  &:hover {
    text-decoration: none;
  }
`;

const NavBar = ({ className, children }: any) => (
  <nav
    className={`${className} navbar navbar-expand-lg navbar-light bg-light p-0`}
  >
    {children}
  </nav>
);

const AppNavBar = styled(NavBar)`
  height: 3.5rem;
`;

interface AppHeaderProps {
  users: string[];
  currentUser: string;
  handleChangeUser: (user: string) => () => void;
}

export default function AppHeader({
  users,
  currentUser,
  handleChangeUser,
}: AppHeaderProps) {
  return (
    <AppNavBar>
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

      <div
        className='collapse navbar-collapse h-100 d-flex justify-content-between align-items-center'
        id='navbarSupportedContent'
      >
        <ul className='navbar-nav  h-100'>
          <li className='nav-item d-flex align-items-end h-100 active'>
            <Link to='/messages'> Messages </Link>
          </li>
          <li className='nav-item d-flex align-items-end h-100'>
            <Link to='/contacts'> Contacts </Link>
          </li>
          <li className='nav-item d-flex align-items-end h-100'>
            <Link to='/preferences'> Preferences </Link>
          </li>
        </ul>
        {/* Right panel */}
        <div className='d-flex align-items-center'>
          <UserSelect
            users={users}
            currentUser={currentUser}
            handleChangeUser={handleChangeUser}
          />
          <button type='button' className='btn btn-primary mr-1 ml-3'>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button type='button' className='btn btn-primary'>
            <FontAwesomeIcon icon={faMailBulk} />
            New Message
          </button>
        </div>
      </div>
    </AppNavBar>
  );
}
