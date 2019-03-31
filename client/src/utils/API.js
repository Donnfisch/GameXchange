import axios from 'axios';

const formatHeader = (token) => (
  {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

export default {
  // Gets user data from cookie to update state
  formatHeader: (token) => (
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),

  getUserInfo: async () => {
    const token = document.cookie.split('; ')
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split('=')[1];
    try {
      const res = await axios
        .get('/api/user/', { headers: formatHeader(token) });
      res.data.token = token;
      return (res.data);
    } catch (error) {
      console.log(error);
    }
    return (null);
  },

  // Gets user's matches
  getMatches: (token, direction) => axios
    .get(`/api/inventory/match/${direction}`, { headers: formatHeader(token) })
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
    }, { headers: formatHeader(token) })
    .then(res => (res.data))
    .catch(error => {
      console.log(error);
    }),

  // Returns games from user's inventory
  getUserGames: (token) => axios
    .get('/api/inventory/', { headers: formatHeader(token) })
    .then(res => (res.data))
    .catch(error => {
      console.log(error);
    }),

  // Searches for games
  searchGames: (token, searchTerm) => axios
    .get(`/api/games/title/${searchTerm}`, { headers: formatHeader(token) })
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
