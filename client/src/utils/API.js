/* eslint-disable no-console */
import axios from "axios";

/** ***************************************************************
 * * API Utilities perform function calls to the serverside API   *
 * ************************************************************** */

export default {
  // AuthenticateUser posts login information to server API for authentication
  // When authenticated, user info is set in cookie
  authenticateUser(username, password) {
    axios.post(`/api/auth`, {
      username,
      password,
    })
      .then(res => {
        console.log(res.data.user);
        document.cookie = `uuid=${res.data.user.id}`;
        document.cookie = `token=${res.data.token}`;
      })
      .catch(error => {
        console.log(error);
      });
  },

  refreshGames(gamesArray) {
    // this.state.games = (gamesArray);
    this.setState({
      games: gamesArray,
    });
  },

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
  },

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
  },

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
  },
};
