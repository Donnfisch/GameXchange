import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ad from "./components/Ad";
import Footer from "./components/Footer";
import Games from "./components/Games";
import Login from "./components/Login";
import Matches from './components/Matches';
import Nav from "./components/Nav";
import API from "./utils/API";

class App extends Component {
  state = {
    user: {
      id: null,
      name: null,
      isLoggedIn: false,
      games: [],
    },
  };


  render() {
    // console.log(this.state.games);
    const { isLoggedIn } = { ...this.state };
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Nav
              handleSearch={API.handleSearch}
              handleMyGames={API.handleMyGames}
              isLoggedIn={isLoggedIn}
            />
            <Ad />
            <Route exact path="/" />
            <Route path="/login" component={Login} />
            <Route path="/mygames" component={Games} />
            <Route path="/matches" component={Matches} />
          </React.Fragment>
        </Router>
        <Ad />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
