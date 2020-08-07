import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faForward,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import moment from "moment";

const Button = ({ label, icon }: { label: string; icon: any }) => (
  <button type='button' className='btn btn-primary mr-1'>
    <FontAwesomeIcon icon={icon} />
    <span className='ml-2'>{label}</span>
  </button>
);

interface EmailDetailHeaderProps {
  subject: string;
  from: string;
  to: string;
  date: string;
  className?: string;
}

function EmailDetailHeader({
  subject,
  from,
  to,
  date,
  className,
}: EmailDetailHeaderProps) {
  return (
    <header
      className={`d-flex align-items-center justify-content-between ${className}`}
    >
      <div>
        <h4 className='font-weight-bold'>{subject}</h4>
        <p className='m-0'>{`${from} \u279E ${to}`}</p>
      </div>
      <div>
        <p>{moment(date).format("MMMM DD YYYY, hh:mm:ss A")}</p>
        <div className='d-flex'>
          <Button icon={faReply} label='Reply' />
          <Button icon={faForward} label='Forward' />
          <Button icon={faWindowClose} label='Delete' />
        </div>
      </div>
    </header>
  );
}

export default styled(EmailDetailHeader)`
  background-color: #6c757d;
  padding: 1.5rem 2rem;
`;
