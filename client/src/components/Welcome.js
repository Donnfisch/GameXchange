import React from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Message,
} from 'semantic-ui-react';
import './styles/Welcome.css';

const Welcome = () => (
  <Grid columns={3} divided>
    <Grid.Row stretched>
      <Grid.Column width={4}>
      </Grid.Column>
      <Grid.Column width={8}>
        <Container className="welcomeBox">
          <div className="messageStyle">
            <Message>
              <Header className="head" size="huge" as="h1">
              GameXchange
              </Header>
              <Header className="head" size="tiny" as="h6">
              GameXchange is an online database designed to with the gaming community in mind.
              </Header>
              <Button className="menuButton" primary size="tiny" as="a" href="./register">
              Register &raquo;
              </Button>
            </Message>
          </div>
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Welcome;
