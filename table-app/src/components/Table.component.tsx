import React from "react";
import { User } from "../interfaces/Users";
import styled from "styled-components";

interface TableProps {
  displayUsers: User[];
  fields: Map<string, string>;
}

const CustomerTable = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 4rem;
  color: #212529;

  & th,
  & td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }

  & tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  & {
    border: 1px solid #dee2e6;
  }

  & th,
  & td {
    border: 1px solid #dee2e6;
  }

  & thead th,
  & thead td {
    border-bottom-width: 2px;
  }
`;

export default function Table(props: TableProps) {
  const { displayUsers, fields } = props;

  return (
    <CustomerTable>
      <thead>
        <tr>
          {[...fields.values()].map((field, index) => (
            <th key={index}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayUsers.map((user: User, index) => (
          <tr key={index}>
            {Object.values(user).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </CustomerTable>
  );
}
