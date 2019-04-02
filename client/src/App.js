import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Ad from './components/Ad';
import Footer from './components/Footer';
import Games from './components/Games';
import Header from './components/Header';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Registration from './components/Registration';
import Welcome from './components/Welcome';
import Matches from './components/Matches';
import './components/styles/Home.css';
import API from './utils/API';

class App extends Component {
  state = {
    games: [
      {
        id: '0',
        inventories: [{}],
      },
    ],
    matchesOut: [],
    matchesIn: [],
  };

  refreshGames = gamesArray => {
    this.setState({ games: gamesArray });
  };

  handleSearch = (searchTerm, event) => {
    event.preventDefault();
    const { token } = this.state;
    API.searchGames(token, searchTerm).then(res => {
      res.map(game => {
        if (!game.inventories[0]) {
          game.inventories.push({
            have: false, want: false, trade: false,
          });
        }
        return game;
      });
      this.setState({ games: res });
    });
  };

  handleMyGames = () => {
    const { token } = this.state;
    API.getUserGames(token).then(res => {
      this.setState({ games: res });
    });
  };

  changeGameStatus = (have, want, trade, boxId) => {
    const { token } = this.state;
    API.updateGameStatus(have, want, trade, boxId, token).then(() => {
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
    });
  };

  handleMatches = direction => {
    const { token } = this.state;
    API.getMatches(token, direction).then(res => {
      direction === 'out'
        ? this.setState({ matchesOut: res })
        : this.setState({ matchesIn: res });
    });
  };

  authenticateUser = (username, password) => {
    API.validateUser(username, password).then(res => {
      document.cookie = `uuid=${res.user.id}`;
      document.cookie = `token=${res.token}`;
      this.setState({ user: res.user });
    });
  };

  render() {
    const {
      games, matchesOut, matchesIn, token, user,
    } = this.state;
    if (!token && document.cookie !== '') {
      API.getUserInfo().then(res => this.setState({ user: res.user, token: res.token }));
    }
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Route
            render={({ history }) => (
              <Nav
                authenticateUser={this.authenticateUser}
                handleSearch={this.handleSearch}
                handleMyGames={this.handleMyGames}
                handleMatches={this.handleMatches}
                history={history}
                token={token}
              />
            )}
          />
          <Ad />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route
              exact
              path="/games"
              component={() => (
                <Games games={games} changeGameStatus={this.changeGameStatus} />
              )}
            />
            <Route
              exact
              path="/matches"
              component={() => (
                <Matches
                  matchesOut={matchesOut}
                  matchesIn={matchesIn}
                  username={user.username}
                />
              )}
            />
            <Route
              path="/profile"
              component={() => (
                <Profile
                  user={user}
                  token={token}
                />
              )}
            />
            <Route path="/register" component={Registration} />
          </Switch>
          <Ad />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
