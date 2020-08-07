import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { EFAULT } from "constants";
const EmailBoxContainer = styled.aside`
  grid-area: mailBox;
`;

const EmailBoxNav = styled.nav`
  background-color: #eee;
  height: 100%;
`;

const EmailBoxList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1.5rem 1rem;
  height: 100%;
`;

const EmailBoxItem = ({ item, isActive, className }: any) => {
  return (
    <li className={className}>
      <NavLink to={`/messages/${item}`}>
        <FontAwesomeIcon icon={isActive ? faFolderOpen : faFolder} />
        <span className='ml-2'> {item} </span>
      </NavLink>
    </li>
  );
};
const StyledEmailBoxItem = styled(EmailBoxItem)`
  & a {
    color: #000;
    text-decoration: none;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 0.3rem 0.5rem;
  }

  & a.active {
    background-color: #007bff;
    color: #fff;
  }
`;

interface EmailBoxProps extends RouteComponentProps<any> {
  mailBoxItems: string[];
}

const EmailBox: React.SFC<EmailBoxProps> = ({ mailBoxItems, match }) => {
  return (
    <EmailBoxContainer>
      <EmailBoxNav>
        <EmailBoxList>
          {mailBoxItems.map((item: string, index: number) => (
            <StyledEmailBoxItem
              item={item}
              key={index}
              isActive={match.params.item === item}
            />
          ))}
        </EmailBoxList>
      </EmailBoxNav>
    </EmailBoxContainer>
  );
};

export default EmailBox;
