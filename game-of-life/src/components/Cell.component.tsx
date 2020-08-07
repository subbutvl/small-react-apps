import React from "react";

interface CellProps {
  isAlive: boolean;
  index: number;
}

export default function Cell(props: CellProps) {
  return (
    <div className={`Cell ${props.isAlive ? "is-alive" : ""}`}>
      <span className={props.isAlive ? "" : "text-white"}>{props.index}</span>
    </div>
  );
}
