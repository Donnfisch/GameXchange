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
    games: [
      {
        id: 1,
        title: "TEST Black Desert Online",
        platform: "PS4",
        region: "USA",
        publisher: "Pearl Abyss",
        version: null,
        upVotes: null,
        downVotes: null,
        status: "approved",
        createdAt: "2019-03-12T00:13:09.000Z",
        updatedAt: "2019-03-12T00:13:09.000Z",
        userId: "5272e292-3c40-4eea-a3df-707b760fdf00",
        // inventories: [
        //   {
        //     have: "false",
        //     want: "false",
        //     trade: "false",
        //   },
        // ],
      },
    ],
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
        console.log(res.data);
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
    console.log('My Games ROUTE');
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

  changeGameStatus = (have, want, trade, boxId, event) => {
    const token = document.cookie.split("; ")
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split("=")[1];
    console.log(token);
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

  handleMatchesOut = (direction) => {
    console.log('Match Route OUT');
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
        console.log(res.data);
        (direction === 'out') ? this.setState({ matchesOut: res.data }) : this.setState({ matchesIn: res.data });
        // this.setState({ matchesOut: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // handleMatchesIn = () => {
  //   console.log('Match Route IN');
  //   const token = document.cookie.split("; ")
  //     .filter(
  //       (element) => element.indexOf('token=') === 0
  //     )[0].split("=")[1];
  //   axios
  //     .get(`/api/inventory/match/in`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({ matchesIn: res.data });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            render={({ history }) => (
              <Nav
                handleSearch={this.handleSearch}
                handleMyGames={this.handleMyGames}
                handleMatchesOut={this.handleMatchesOut}
                handleMatchesIn={this.handleMatchesIn}
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
              component={() => <Games games={this.state.games} changeGameStatus={this.changeGameStatus} />}
            />
            <Route
              exact
              path="/matches"
              component={() => <Matches matchesOut={this.state.matchesOut} matchesIn={this.state.matchesIn} />}
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
