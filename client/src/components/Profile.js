import React, { Component } from 'react';
import profilePic from "./styles/images/profile.png";
import './styles/Profile.css';

export class Profile extends Component {
  render() {
    return (
      <div class="container">
        <div class="ui three column grid">
          <div class="column">
            <div class="ui fluid card">
              <div class="image">
                <img src={profilePic} alt="profile" />
              </div>
              <div class="content">
                <a class="header">Matt</a>
                <div class="meta">
                  <span class="date">Joined in 2019</span>
                </div>
                <div class="description">
                  Matt is a game collector living in Kansas City.
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="ui fluid card">
              <div class="content">
                <a class="header">More Stuff about the user</a>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="ui fluid card">
              <div class="content">
                <a class="header">and even more stuff</a>
              </div>
            </div>
        </div>
      </div>
    </div> 
    );
  }
}

export default Profile;
