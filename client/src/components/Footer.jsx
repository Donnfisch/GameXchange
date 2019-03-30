import React from 'react';

const Footer = () => (
  <footer className="bg-secondary" style={footerStyle}>
    <div className="container">
      <p>Copyright © 2019</p>
    </div>
  </footer>
);
  
const footerStyle = {
  position: "fixed",
  bottom: "0",
  width: "100%",
  height: "65px",
  lineHeight: "55px",
  textAlign: "center",
  borderTop: "8px solid #000000",
  fontSize: "24px",
};

export default Footer;
