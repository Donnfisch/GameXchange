import React from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Message,
} from "semantic-ui-react";
import './styles/Welcome.css';

const Welcome = () => (
  <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column width={3}>

      </Grid.Column>
      <Grid.Column stretched width={9}>
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
      </Grid.Column>
    </Grid.Row>
  </Grid>


);

export default Welcome;
