import React, { FormEventHandler } from "react";
import styled from "styled-components";
import { FormLabel } from "../common-styles";

interface OrderByProps {
  handleChange: FormEventHandler;
  fields: Map<string, string>;
}

const SortSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SortFormGroup = styled.div`
  display: flex;
  width: 50%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const SortLabel = styled(FormLabel)``;

const SortSelect = styled.select`
  width: 75%;
  display: block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export default function OrderBy(props: OrderByProps) {
  return (
    <SortSection>
      <SortFormGroup>
        <SortLabel htmlFor='orderedField'> Order By:</SortLabel>
        <SortSelect id='orderedField' onChange={props.handleChange}>
          <option defaultValue=''>Choose...</option>
          {[...props.fields].map(([field, displayField], index) => (
            <option value={field} key={index}>
              {displayField}
            </option>
          ))}
        </SortSelect>
      </SortFormGroup>
    </SortSection>
  );
}
