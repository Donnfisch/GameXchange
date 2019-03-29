import React from 'react';
import {
  Button,
  Container,
  Header,
  Message,
} from "semantic-ui-react";
import './styles/Welcome.css';

const Welcome = () => (

  <div className="ui internally celled grid">
    <div className="row">
      <div className="three wide column">

      </div>
      <div className="ten wide column">
        <Container className="welcomeBox">
          <Message>
            <Header className="head" size="huge" as="h1">
              GameXchange
            </Header>
      GameXchange is an online database designed to with the gaming community in mind.
            <ul>
              <li>Browse from a library of every game you could have or want</li>
              <li>Even find rare games or titles that are out of print!</li>
              <li>Proudly display your library and</li>
              <li>Make a wish list of all the games you would like to play</li>
            </ul>

            <Button className="menuButton" primary size="small" as="a" href="./register">
              Register &raquo;
            </Button>
          </Message>
        </Container>
      </div>
      <div className="three wide column">

      </div>
    </div>
    <div className="row">
      <div className="three wide column">

      </div>
      <div className="ten wide column">
        <p></p>
      </div>
      <div className="three wide column">

      </div>
    </div>
  </div>

);

export default Welcome;
