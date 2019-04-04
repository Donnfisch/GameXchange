import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          <Grid.Column width={6}>
            <Image className="imageStyle">
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
          <Grid.Column width={5}>
            <div>
              <List className="listStyle">
                <List.Item icon="users" content={username} />
                <List.Item icon="marker" content={address} />
                <List.Item
                  icon="mail"
                  content={email}
                />
                <List.Item icon="id badge" content={bio} />
              </List>
            </div>
          </Grid.Column>
          <List>
            <List.Item className="itemStyle" as="a" href="/update">Update Info</List.Item>
            <List.Item className="itemStyle" as="a" href="/games">My Games</List.Item>
            <List.Item className="itemStyle" as="a" href="/wishlist">Wish List</List.Item>
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
