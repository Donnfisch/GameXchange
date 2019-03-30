import axios from "axios";

export default {
  // Gets user data from cookie to update state
  getUserInfo: () => {
    const token = document.cookie.split("; ")
      .filter(
        (element) => element.indexOf('token=') === 0
      )[0].split("=")[1];
    return axios
      .get(`/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        res.data.token = token;
        return (res.data);
      });
  },
};
