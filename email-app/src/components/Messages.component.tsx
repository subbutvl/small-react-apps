import React, { Component } from "react";
import styled from "styled-components";
import EmailBox from "./EmailBox.component";
import EmailPreview from "./EmailPreview.component";
import EmailDetail from "./EmailDetail.component";
import { RouteComponentProps } from "react-router-dom";

const ContentGrid = styled.div`
  display: grid;
  height: calc(100vh - 3.5rem);
  grid-template-columns: 20% auto;
  grid-template-rows: 4fr 6fr;
  grid-template-areas:
    "mailBox mailPreview"
    "mailDetail mailDetail";
`;

interface MessagesProps extends RouteComponentProps<any> {
  mailBoxItems: string[];
  messages: {
    [folder: string]: Message[];
  };
}

export default class Messages extends Component<MessagesProps> {
  render() {
    return (
      <ContentGrid>
        <EmailBox {...this.props} />
        <EmailPreview {...this.props} />
        <EmailDetail {...this.props} />
      </ContentGrid>
    );
  }
}
