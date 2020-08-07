import React, { Component } from "react";
import TabContents from "./components/TabContents.component";
import AppHeader from "./components/AppHeader.component";
import { BrowserRouter as Router } from "react-router-dom";
import messages from "./messages.json";
interface AppState {
  currentUser: string;
  currentMailBoxItem: string;
}

class App extends Component<any, AppState> {
  users: string[];
  mailBoxItems: string[];
  messages: {
    [user: string]: {
      [folder: string]: Message[];
    };
  };

  constructor(props: any) {
    super(props);
    this.users = [];
    this.mailBoxItems = [];
    this.messages = {};

    messages.forEach((message: Message) => {
      const { to: user, folder } = message;

      if (!this.messages[user]) {
        this.messages[user] = {};
      } else {
        if (!this.messages[user][folder]) {
          this.messages[user][folder] = [];
        } else {
          this.messages[user][folder].push(message);
        }
      }

      !this.mailBoxItems.includes(folder) && this.mailBoxItems.push(folder);
      !this.users.includes(user) && this.users.push(user);
    });

    this.state = {
      currentUser: this.users[0],
      currentMailBoxItem: "",
    };
  }

  handleChangeUser = (user: string) => () => {
    this.setState({
      currentUser: user,
    });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div className='container-fluid'>
        <Router>
          <AppHeader
            users={this.users}
            currentUser={currentUser}
            handleChangeUser={this.handleChangeUser}
          />
          <TabContents
            mailBoxItems={this.mailBoxItems}
            messages={this.messages[currentUser]}
          />
        </Router>
      </div>
    );
  }
}

export default App;
