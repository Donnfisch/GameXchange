import axios from 'axios';

export default {
  // Gets user data from cookie to update state
  getUserInfo: () => {
    const token = document.cookie.split('; ')
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split('=')[1];
    return axios
      .get('/api/user/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        res.data.token = token;
        return (res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  // Gets user's matches
  getMatches: (token, direction) => axios
    .get(`/api/inventory/match/${direction}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => (res.data))
    .catch(error => {
      console.log(error);
    }),

  // Updates users inventory status flags
  updateGameStatus: (have, want, trade, boxId, token) => axios
    .post('/api/inventory/', {
      have,
      want,
      trade,
      gameId: boxId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => (res.data))
    .catch(error => {
      console.log(error);
    }),

  // Returns games from user's inventory
  getUserGames: (token) => axios
    .get('/api/inventory/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => (res.data))
    .catch(error => {
      console.log(error);
    }),

  // Searches for games
  searchGames: (token, searchTerm) => axios
    .get(`/api/games/title/${searchTerm}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => (res.data))
    .catch(error => {
      console.log(error);
    }),

  // Validates user and returns token
  validateUser: (username, password) => axios
    .post('/api/auth', {
      username,
      password,
    })
    .then(res => (res.data))
    .catch(error => {
      console.log(error);
    }),
};
