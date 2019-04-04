import React from 'react';
import { Container, Label } from 'semantic-ui-react';
import GitLogo from './styles/images/git.jpg';
import Copyright from './styles/images/copyright.png';
import './styles/Footer.css';

const Footer = () => (
  <Container fluid className="footStyle">
    <Label className="labelStyle1" as="a" href="https://github.com/1701c" image>
      <img src={Copyright} alt="copyright" />
      Copyright 2019
    </Label>
    <Label className="labelStyle" as="a" href="https://github.com/1701c" image>
      <img src={GitLogo} alt="gitLogo" />
      Alex
    </Label>
    <Label className="labelStyle" as="a" href="https://github.com/Donnfisch" image>
      <img src={GitLogo} alt="gitLogo" />
      Donnie
    </Label>
    <Label className="labelStyle" as="a" href="https://github.com/jeysonp" image>
      <img src={GitLogo} alt="gitLogo" />
      Jason
    </Label>
    <Label className="labelStyle" as="a" href="https://github.com/shane-lennon" image>
      <img src={GitLogo} alt="gitLogo" />
      Shane
    </Label>
  </Container>
);

export default Footer;
