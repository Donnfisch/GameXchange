import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Games from "./components/Games";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Ad from "./components/Ad";
import API from "./utils/API";

class App extends Component {
  state = {
    games: [],
  };

  render() {
    // console.log(this.state.games);
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Nav handleSearch={API.handleSearch} handleMyGames={API.handleMyGames} />
            <Ad />
            <Route exact path="/" />
            <Route path="/login" component={Login} />
            <Route path="/mygames" component={Games} />
          </React.Fragment>
        </Router>
        <Ad />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
