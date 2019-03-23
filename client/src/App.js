import axios from 'axios';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ad from "./components/Ad";
import Footer from "./components/Footer";
import Games from "./components/Games";
import Login from "./components/Login";
import Matches from './components/Matches';
import Nav from "./components/Nav";

class App extends Component {
  state = {
    id: null,
    name: null,
    isLoggedIn: false,
    games: [],
  };

  refreshGames(gamesArray) {
    // this.state.games = (gamesArray);
    this.setState({
      games: gamesArray,
    });
  }

  handleLogin(user) {
    if (user) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleSearch(searchTerm, event) {
    event.preventDefault();
    console.log(document.cookie);
    const token = document.cookie
      .split("; ")
      .filter(element => element.indexOf("token=") === 0)[0]
      .split("=")[1];
    axios
      .get(`/api/games/title/${searchTerm}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        res.data.map(game => {
          if (!game.inventories[0]) {
            game.inventories.push({
              have: false,
              want: false,
              trade: false,
            });
          }
          return game;
        });
        this.setState({
          games: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleMyGames(event) {
    event.preventDefault();
    console.log("My Games ROUTE");
    const token = document.cookie
      .split("; ")
      .filter(element => element.indexOf("token=") === 0)[0]
      .split("=")[1];
    axios
      .get(`/api/inventory/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          games: res.data,
        });
        // console.log(this.state.games[0].inventories[0].have);
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeGameStatus(have, want, trade, boxId) {
    // console.log(event);
    console.log(`${boxId}:HAVE=${have} WANT=${want} TRADE=${trade}`);
    const token = document.cookie
      .split("; ")
      .filter(element => element.indexOf("token=") === 0)[0]
      .split("=")[1];
    axios
      .post(`/api/inventory/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        have,
        want,
        trade,
        gameId: boxId,
        userId: "5272e292-3c40-4eea-a3df-707b760fdf00",
      })
      .then(res => {
        this.setState({
          games: this.state.games.map(game => {
            if (game.id === boxId) {
              game.inventories[0].have = have;
              game.inventories[0].want = want;
              game.inventories[0].trade = trade;
            }
            return game;
          }),
        });
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.games);
    const { isLoggedIn } = { ...this.state.user };
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Nav
              handleSearch={this.handleSearch}
              handleMyGames={this.handleMyGames}
              isLoggedIn={isLoggedIn}
            />
            <Ad />
            <Route exact path="/" />
            <Route
              path="/login"
              component={Login}
              handleLogin={this.handleLogin}
            />
            <Route path="/matches" component={Matches} />
            <Route
              path="/mygames"
              component={Games}
              games={this.state.games}
              changeGameStatus={this.changeGameStatus}
            />
          </React.Fragment>
        </Router>
        <Ad />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
