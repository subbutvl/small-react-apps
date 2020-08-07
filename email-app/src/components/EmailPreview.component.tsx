import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const EmailPreviewContainer = styled.section`
  grid-area: mailPreview;
  overflow: auto;
`;

const TIME_OPTION = [
  undefined,
  {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
];

const getFormattedTime = (timeString: string) => {
  const dateString = new Date(timeString).toLocaleDateString(
    ...(TIME_OPTION as [
      undefined,
      { year: string; month: string; day: string }
    ])
  );

  return dateString.split("/").reverse().join("/");
};

const MessageRow = ({ history, location, message, className }: any) => (
  <tr
    onClick={() => {
      history.push({
        search: `?messageId=${message._id}`,
      });
    }}
    className={
      new URLSearchParams(location.search).get("messageId") === message._id
        ? `${className} active`
        : className
    }
  >
    <td className='align-middle'>{message.from}</td>
    <td className='align-middle'>{message.subject}</td>
    <td className='align-middle'>{getFormattedTime(message.date)}</td>
  </tr>
);

const StyledMessageRow = styled(MessageRow)`
  &.active {
    background-color: #007bff;
    color: #fff;
  }
`;

interface EmailPreviewProps extends RouteComponentProps<any> {
  messages: {
    [folder: string]: Message[];
  };
}

const EmailPreview: React.SFC<EmailPreviewProps> = ({
  match,
  messages,
  history,
  location,
}) => {
  const topic = match.params.item;
  const currentMessages = messages[topic] || [];
  return (
    <EmailPreviewContainer>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Sender</th>
            <th scope='col'>Subject</th>
            <th scope='col'>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentMessages.map((message: Message, index: number) => (
            <StyledMessageRow
              key={index}
              message={message}
              history={history}
              location={location}
            />
          ))}
        </tbody>
      </table>
    </EmailPreviewContainer>
  );
};

export default withRouter(EmailPreview);
