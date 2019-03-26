import React from 'react';
import {
  Button,
  Container,
  Header,
  Message,
} from "semantic-ui-react";
import './styles/Welcome.css';



const Welcome = () => (
  <Container>
    <Message>
      <Header size="huge" as="h1">
              Navbar example
      </Header>
      <p className="lead">
              This example is a quick exercise to illustrate how the default,
              static navbar and fixed to top navbar work. It includes the
              responsive CSS and HTML, so it also adapts to your viewport and
              device.
      </p>
      <Button primary size="big" as="a">
              View navbar docs &raquo;
      </Button>
    </Message>
  </Container>
);

export default Welcome;
