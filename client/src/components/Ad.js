import React from 'react';
import legoAd from '../img/legoad.jpg';
import tacoAd from '../img/tacoad.gif';

function serveAd() {
  const adArray = [tacoAd, legoAd];
  return adArray[0];
}

const Ad = () => (
  <div style={adDivStyle}>
    <img src={serveAd()} style={adStyle} alt="legoad" />
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
