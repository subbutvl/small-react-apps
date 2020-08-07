import React, { Component, FormEvent } from "react";
import "./App.css";

import Table from "./components/Table.component";
import Pagination from "./components/Pagination.component";
import OrderBy from "./components/OrderBy.component";
import CustomerFilter from "./components/CustomerFilter.component";

import users from "./users.json";
import { User } from "./interfaces/Users";
import {
  checkValuesMatchType,
  getFormattedDate,
  getFormattedPhoneNumber,
  getTimeFromCurrent,
} from "./utils";
import styled from "styled-components";

interface AppState {
  displayingUsers: User[];
  validUsers: User[];
  pagesCount: number;
  currentPageIndex: number;
}

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    & {
      max-width: 540px;
    }
  }

  @media (min-width: 768px) {
    & {
      max-width: 720px;
    }
  }

  @media (min-width: 992px) {
    & {
      max-width: 960px;
    }
  }

  @media (min-width: 1200px) {
    & {
      max-width: 1140px;
    }
  }
`;
const AppHeader = styled.header`
  margin-top: 5rem;
  text-align: center;
`;
const AppTitle = styled.h1`
  text-transform: uppercase;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;
class App extends Component<any, AppState> {
  users: User[];
  fieldsMap: Map<string, string>;
  usersPerPage: number;

  constructor(props: any) {
    super(props);

    this.fieldsMap = this.getDisplayFieldsMap(users[0]);
    this.users = users.map((user: User) => ({
      ...user,
      birthday: getFormattedDate(user.birthday),
      phone: getFormattedPhoneNumber(user.phone),
    }));
    this.usersPerPage = 10;
    this.state = {
      displayingUsers: this.users.slice(0, this.usersPerPage),
      validUsers: this.users,
      pagesCount: this.getPagesCount(this.users),
      currentPageIndex: 0,
    };
  }

  getDisplayFieldsMap = (user: User) =>
    Object.keys(user).reduce((fieldsMap, field) => {
      const displayField = field.replace(
        /(^\w)|([A-Z])/g,
        (match, ...group) => {
          const [, , matchIndex] = group;

          return matchIndex ? " " + match : match.toUpperCase();
        }
      );

      fieldsMap.set(field, displayField);

      return fieldsMap;
    }, new Map());

  getPagesCount = (users: User[] = this.state.validUsers) => {
    const pagesCount = Math.trunc(users.length / this.usersPerPage);

    return pagesCount === 0 ? pagesCount + 1 : pagesCount;
  };

  handleFilterChange = (e: FormEvent<HTMLInputElement>) => {
    const filterValue = e.currentTarget.value;
    const filteredUsers = this.users.filter((user) =>
      Object.values(user).some(
        (value) => value && `${value}`.includes(filterValue)
      )
    );

    this.setState({
      validUsers: filteredUsers,
      pagesCount: this.getPagesCount(filteredUsers),
      displayingUsers: this.getDisplayingUsers(0, filteredUsers),
    });
  };

  handleOrderByChange = (e: FormEvent<HTMLSelectElement>) => {
    const sortField = e.currentTarget.value;
    const sortedUsers = [...this.state.validUsers].sort(
      (prevUser: User, nextUser: User) => {
        const prevValue = (prevUser as any)[sortField];
        const nextValue = (nextUser as any)[sortField];

        if (checkValuesMatchType("number", prevValue, nextValue)) {
          return prevValue - nextValue;
        } else if (checkValuesMatchType("string", prevValue, nextValue)) {
          if (sortField === "birthday") {
            return (
              getTimeFromCurrent(nextValue) - getTimeFromCurrent(prevValue)
            );
          } else {
            return prevValue.localeCompare(nextValue);
          }
        } else {
          return 0;
        }
      }
    );

    this.setState({
      validUsers: sortedUsers,
      displayingUsers: this.getDisplayingUsers(
        this.state.currentPageIndex,
        sortedUsers
      ),
    });
  };

  getDisplayingUsers = (
    pageIndex: number = this.state.currentPageIndex,
    users: User[] = this.state.validUsers
  ) => {
    const startPageIndex = pageIndex * this.usersPerPage;

    return users.slice(startPageIndex, startPageIndex + this.usersPerPage);
  };

  updateDisplayingUsers = (pageIndex: number) => {
    this.setState({
      displayingUsers: this.getDisplayingUsers(pageIndex),
      currentPageIndex: pageIndex,
    });
  };

  render() {
    return (
      <Container>
        <AppHeader>
          <AppTitle>Customer Table</AppTitle>
        </AppHeader>
        <main>
          <CustomerFilter handleChange={this.handleFilterChange} />
          <OrderBy
            handleChange={this.handleOrderByChange}
            fields={this.fieldsMap}
          />
          <Table
            displayUsers={this.state.displayingUsers}
            fields={this.fieldsMap}
          />
          <Pagination
            updateDisplayingUsers={this.updateDisplayingUsers}
            pagesCount={this.state.pagesCount}
            currentPageIndex={this.state.currentPageIndex}
          />
        </main>
      </Container>
    );
  }
}
export default App;
