import React from "react";

export default ({
  children,
  htmlFor,
}: {
  children: string;
  htmlFor: string;
}) => (
  <label htmlFor={htmlFor} className='font-weight-bold'>
    {children}
  </label>
);
