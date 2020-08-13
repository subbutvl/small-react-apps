import React from "react";
import ReactDOM from "react-dom";
import List from "./containers/List";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className='container-fluid'>
      <h1>Movie List</h1>
      <nav className='navbar stickty-top nav-bar-light bg-dark'>
        <h1 className='navbar-brand text-light'>moiveList</h1>
      </nav>

      <List />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
