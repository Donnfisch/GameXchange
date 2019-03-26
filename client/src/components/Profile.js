import React, { Component } from 'react';
import profilePic from "./styles/images/profile.png";
import './styles/Profile.css';

export class Profile extends Component {
  render() {
    return (
      <div class="ui card">
        <div class="image">
        <img src={profilePic} alt="profile" />
        </div>
        <div class="content">
          <a class="header">Matthew</a>
          <div class="meta">
            <span class="date">Joined in 2019</span>
          </div>
          <div class="description">
            Matthew is a game collector living in Kansas City.
          </div>
        </div>
        <div class="extra content">
        <button class="ui button">Request</button>
        <button class="ui button">Offer</button>
        </div>
      </div>
    );
  }
}

export default Profile;
