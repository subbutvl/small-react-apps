import React from "react";
import EmailDetailHeader from "./EmailDetailHeader.component";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const EmailDetailContainer = styled.section`
  grid-area: mailDetail;
  overflow: auto;
`;

interface EmailDetailProps extends RouteComponentProps<any> {
  messages: {
    [folder: string]: Message[];
  };
}

const EmailDetail: React.SFC<EmailDetailProps> = ({
  match,
  messages,
  location,
}) => {
  const topic = match.params.item;
  const currentMessages = (messages[topic] || []) as any;
  const messageId = new URLSearchParams(location.search).get("messageId");
  const message = currentMessages.find(
    (message: Message) => message._id === messageId
  );
  return (
    <EmailDetailContainer>
      {message ? (
        <div>
          <EmailDetailHeader
            subject={message.subject}
            from={message.from}
            to={message.to}
            date={message.date}
          />
          <section className='px-4 py-3'>
            <code>{message.body}</code>
          </section>
        </div>
      ) : null}
    </EmailDetailContainer>
  );
};

export default withRouter(EmailDetail);

