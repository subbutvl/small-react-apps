import React, { Component } from "react";
import styled from "styled-components";

interface PaginationProps {
  updateDisplayingUsers: (pageIndex: number) => void;
  pagesCount: number;
  currentPageIndex: number;
}

const PaginationNav = styled.nav`
  margin-top: 3rem;
`;

const PaginationList = styled.ul`
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
  justify-content: center;
`;

const PaginationLink = styled.a`
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;

  &:hover {
    z-index: 2;
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }

  &:focus {
    z-index: 3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const PaginationItem = styled.li`
  &:first-child ${PaginationLink} {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  &:last-child ${PaginationLink} {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  &.active ${PaginationLink} {
    z-index: 3;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  &.disabled ${PaginationLink} {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
  }
`;

export default class Pagination extends Component<PaginationProps> {
  displayPreviousPage = () => {
    const { currentPageIndex, updateDisplayingUsers } = this.props;

    currentPageIndex > 0 && updateDisplayingUsers(currentPageIndex - 1);
  };

  displayNextPage = () => {
    const { currentPageIndex, updateDisplayingUsers, pagesCount } = this.props;

    currentPageIndex < pagesCount - 1 &&
      updateDisplayingUsers(currentPageIndex + 1);
  };

  render() {
    const { currentPageIndex, updateDisplayingUsers, pagesCount } = this.props;
    return (
      <PaginationNav aria-label='Customer Pagination'>
        <PaginationList>
          <PaginationItem
            onClick={this.displayPreviousPage}
            className={`${currentPageIndex <= 0 ? "disabled" : ""}`}
          >
            <PaginationLink href='javascript: void(0)' aria-disabled='true'>
              Previous
            </PaginationLink>
          </PaginationItem>
          {Array(pagesCount)
            .fill(0)
            .map((_, index) => (
              <PaginationItem
                className={`${index === currentPageIndex ? "active" : ""}`}
                key={index}
                onClick={updateDisplayingUsers.bind(this, index)}
              >
                <PaginationLink href='javascript: void(0)'>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem
            onClick={this.displayNextPage}
            className={`${
              currentPageIndex >= pagesCount - 1 ? "disabled" : ""
            }`}
          >
            <PaginationLink href='javascript: void(0)' aria-disabled='true'>
              Next
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </PaginationNav>
    );
  }
}
