import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Ad from "./components/Ad";
import Footer from "./components/Footer";
import Games from "./components/Games";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Welcome from "./components/Welcome";
import Matches from "./components/Matches";
const axios = require('axios');

class App extends Component {
  state = {
    games: [{
      id: "0",
      inventories: [{}],
    }],
    matchesOut: [],
    matchesIn: [],
  };

  refreshGames = gamesArray => {
    this.setState({ games: gamesArray });
  }

  handleSearch = (searchTerm, event) => {
    event.preventDefault();
    const token = document.cookie.split("; ")
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split("=")[1];
    axios
      .get(`/api/games/title/${searchTerm}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log(res.data);
        res.data.map(game => {
          if (!game.inventories[0]) {
            game.inventories.push({ have: false, want: false, trade: false });
          }
          return game;
        });
        this.setState({ games: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleMyGames = () => {
    const token = document.cookie.split("; ")
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split("=")[1];
    axios
      .get(`/api/inventory/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        this.setState({ games: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeGameStatus = (have, want, trade, boxId) => {
    const token = document.cookie.split("; ")
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split("=")[1];
    // console.log(token);
    axios
      .post(`/api/inventory/`, {
        have,
        want,
        trade,
        gameId: boxId,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const { games } = this.state;
        this.setState({
          games: games.map(game => {
            const updatedGame = game;
            if (game.id === boxId) {
              updatedGame.inventories[0].have = have;
              updatedGame.inventories[0].want = want;
              updatedGame.inventories[0].trade = trade;
            }
            return updatedGame;
          }),

        });
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleMatches = (direction) => {
    const token = document.cookie.split("; ")
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split("=")[1];
    axios
      .get(`/api/inventory/match/${direction}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // console.log(res.data);
        (direction === 'out') ? this.setState({ matchesOut: res.data }) : this.setState({ matchesIn: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { games, matchesOut, matchesIn } = this.state;
    return (
      <Router>
        <React.Fragment>
          <Route
            render={({ history }) => (
              <Nav
                handleSearch={this.handleSearch}
                handleMyGames={this.handleMyGames}
                handleMatches={this.handleMatches}
                history={history}
              />
            )}
          />
          <Ad />
          <Switch>
            <Route
              exact
              path="/"
              component={Welcome}
            />
            <Route
              exact
              path="/games"
              component={() => <Games games={games} changeGameStatus={this.changeGameStatus} />}
            />
            <Route
              exact
              path="/matches"
              component={() => <Matches matchesOut={matchesOut} matchesIn={matchesIn} />}
            />
            <Route
              path="/profile"
              component={Profile}
            />
            <Route
              path="/register"
              component={Registration}
            />
          </Switch>
          <Ad />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
