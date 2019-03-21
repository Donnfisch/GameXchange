import React, { Component } from "react";
import Games from "./components/Games";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Ad from "./components/Ad";

class App extends Component {
  state = {
    games: [
      {
        id: 1,
        title: "Black Desert Online",
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
      },
      {
        id: 2,
        title: "Bloodstained: Ritual of the Night",
        platform: "PS4",
        region: "USA",
        publisher: "505 Games",
        version: null,
        upVotes: null,
        downVotes: null,
        status: "approved",
        createdAt: "2019-03-12T00:13:09.000Z",
        updatedAt: "2019-03-12T00:13:09.000Z",
        userId: "5272e292-3c40-4eea-a3df-707b760fdf00",
      },
      {
        id: 3,
        title: "Bubsy: Paws on Fire!",
        platform: "PS4",
        region: "USA",
        publisher: "Accolade",
        version: null,
        upVotes: null,
        downVotes: null,
        status: "approved",
        createdAt: "2019-03-12T00:13:09.000Z",
        updatedAt: "2019-03-12T00:13:09.000Z",
        userId: "5272e292-3c40-4eea-a3df-707b760fdf00",
      },
      {
        id: 4,
        title: "Catherine: Full Body",
        platform: "PS4",
        region: "USA",
        publisher: "Atlus",
        version: null,
        upVotes: null,
        downVotes: null,
        status: "approved",
        createdAt: "2019-03-12T00:13:09.000Z",
        updatedAt: "2019-03-12T00:13:09.000Z",
        userId: "5272e292-3c40-4eea-a3df-707b760fdf00",
      },
      {
        id: 5,
        title: "Code Vein",
        platform: "PS4",
        region: "USA",
        publisher: "Bandai Namco Ent.",
        version: null,
        upVotes: null,
        downVotes: null,
        status: "approved",
        createdAt: "2019-03-12T00:13:09.000Z",
        updatedAt: "2019-03-12T00:13:09.000Z",
        userId: "5272e292-3c40-4eea-a3df-707b760fdf00",
      },
    ],
  };

  refreshGames = gamesArray => {
    // this.state.games = (gamesArray);
    this.setState({ games: gamesArray });
  }


  render() {
    // console.log(this.state.games);
    return (
      <div>
        <Nav />
        <Ad />
        <Games games={this.state.games} />
        <Ad />
        <Footer />
      </div>
    );
  }
}

export default App;
