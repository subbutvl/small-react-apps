import React from "react";
import styled from "styled-components";
import Cell from "./Cell.component";

interface Cell {
  isAlive: boolean;
  index: number;
}

interface GridProps {
  cells: Cell[][];
}

const GridElem = styled("div")`
  display: grid;
  grid-template-rows: repeat(10, 3rem);
  grid-template-columns: repeat(10, 3rem);
  justify-content: center;
  margin-top: 3rem;
`;

export default function Grid(props: GridProps) {
  return (
    <GridElem>
      {props.cells.map((row) =>
        row.map((cell) => (
          <Cell key={cell.index} isAlive={cell.isAlive} index={cell.index} />
        ))
      )}
    </GridElem>
  );
}
