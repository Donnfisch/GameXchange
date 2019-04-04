import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, List, Image, GridColumn } from 'semantic-ui-react';
import './styles/Profile.css';
import defaultAvatar from './styles/images/default-avatar.jpg';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      address: '',
      bio: '',
      image: '',
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const {
      email, address, bio, image,
    } = user;
    this.setState({
      email, address, bio, image,
    });
  }

  render() {
    const { user } = this.props;
    const { username } = user;
    const {
      email, address, bio, image,
    } = this.state;

    return (
      <Grid columns={3} divided>
        <Grid.Row className="rowStyling">
          <Grid.Column width={7}>
            <Image className="imageStyle" circular>
              {image === ''
        && (
          <div>
            <img src={defaultAvatar} alt="avatar" />
          </div>
        )}
              {image !== ''
        && (
          <div>
            <img src={image} alt="avatar" />
          </div>
        )}
            </Image>
          </Grid.Column>
          <Grid.Column width={2}>
            <List className="listStyle">
              <List.Item icon="users" content={username} />
              <List.Item icon="marker" content={address} />
              <List.Item
                icon="mail"
                content={email}
              />
              <List.Item icon="id badge" content={bio} />
            </List>
          </Grid.Column>
          <List className="listStyle2">
            <List.Item><Link to="/update"> Update Info </Link></List.Item>
            <List.Item><Link to="/games"> My Games </Link></List.Item>
            <List.Item><Link to="/matches"> My Matches </Link></List.Item>
          </List>
          <GridColumn>

          </GridColumn>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Profile;

Profile.propTypes = { user: PropTypes.object.isRequired };
