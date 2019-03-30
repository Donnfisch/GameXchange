import React from 'react';
import { Image, Segment } from 'semantic-ui-react';
import './styles/Header.css';
import GXLogo from "./styles/images/GXlogo.png";


const Header = () => (
  <Segment className="headImg">
    <Image
      src={GXLogo}
      size="small"
      as="a"
      href="/"
    />
  </Segment>
);

export default Header;
