import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Messages from "./Messages.component";

const UnderConstruct = () => (
  <h1 className='text-center'>This site is under construction</h1>
);

interface TabContentsProps {
  mailBoxItems: string[];
  messages: {
    [folder: string]: Message[];
  };
}

export default function TabContents(props: TabContentsProps) {
  return (
    <Switch>
      <Route path='/' exact render={() => <Redirect to='/messages' />} />
      <Route
        path='/messages/:item'
        render={(routeProps) => <Messages {...routeProps} {...props} />}
      ></Route>
      <Route
        path='/messages'
        render={(routeProps) => {
          const { mailBoxItems } = props;

          return mailBoxItems.length ? (
            <Redirect to={`/messages/${mailBoxItems[0]}`} />
          ) : (
            <Messages {...routeProps} {...props} />
          );
        }}
      ></Route>
      <Route path='/contacts' component={UnderConstruct}></Route>
      <Route path='/preferences' component={UnderConstruct}></Route>
    </Switch>
  );
}
