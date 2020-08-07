import React, { FormEventHandler } from "react";
import styled from "styled-components";
import { FormLabel } from "../common-styles";

interface CustomerFilterProps {
  handleChange: FormEventHandler;
}

const FilterSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterFormGroup = styled.div`
  display: flex;
  width: 50%;
  margin-top: 5rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const FilterLabel = styled(FormLabel)``;

const FilterInput = styled.input`
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

export default function CustomerFilter(props: CustomerFilterProps) {
  return (
    <FilterSection>
      <FilterFormGroup>
        <FilterLabel htmlFor='customerFilter'>Filter:</FilterLabel>
        <FilterInput
          type='text'
          name='customerFilter'
          id='customerFilter'
          placeholder='Name, birthday, or anything...'
          onChange={props.handleChange}
        ></FilterInput>
      </FilterFormGroup>
    </FilterSection>
  );
}
