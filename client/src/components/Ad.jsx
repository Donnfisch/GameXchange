import React from 'react';
import legoAd from './styles/images/legoad.jpg';
import tacoAd from './styles/images/tacoad.gif';

function serveAd() {
  const adArray = [tacoAd, legoAd];
  return adArray[Math.floor(Math.random() * adArray.length)];
}

const Ad = () => (
  <div style={adDivStyle}>
    {/* <img src={serveAd()} style={adStyle} alt="legoad" /> */}
  </div>
);

const adDivStyle = {
  position: "center",
  textAlign: "center",
};

const adStyle = {
  height: "100px",
  margin: "15px",
};

export default Ad;
