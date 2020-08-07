import React, { Component } from "react";
import seed from "./response.json";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import CustomersBoard from "./components/CustomersBoard";
import CustomerInformation from "./components/CustomerInformation";
import SettingSection from "./components/SettingSection";
import LoginForm from "./components/LoginForm";
import { getAllCustomers } from "./APIService";

class App extends Component {
  state = {
    customersList: [],
  };
  async componentDidMount() {
    const allCustomers = await getAllCustomers();
    this.setState({ customersList: allCustomers });
  }
  render() {
    return (
      <Router>
        <div className='container'>
          <AppHeader />
          <main className='px-5 py-2'>
            <Route
              path='/customers/all-customers'
              render={(routeProps) => (
                <CustomersBoard
                  {...routeProps}
                  customersList={this.state.customersList}
                />
              )}
            ></Route>
            <Route
              path='/customers/customer-information/'
              render={(routeProps) => (
                <CustomerInformation
                  {...routeProps}
                  customersList={this.state.customersList}
                />
              )}
            ></Route>
            <Route
              path='/setting'
              render={(routeProps) => <SettingSection {...routeProps} />}
            ></Route>
            <Route
              path='/login'
              render={(routeProps) => <LoginForm {...routeProps} />}
            ></Route>
            <Route
              path='/'
              exact
              render={(routeProps) => (
                <Redirect to='/customers/all-customers' />
              )}
            ></Route>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
