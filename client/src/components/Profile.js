import React from 'react';
import profilePic from "./styles/images/SnoopProfile.jpg";
import { Card, Image, Grid } from 'semantic-ui-react';
import './styles/Profile.css';

const Profile = () => (
  <div>
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Card>
            <Image src={profilePic} alt="profile"/>
            <Card.Content>
              <Card.Header>Snoop Dog</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in 2019</span>
              </Card.Meta>
              <Card.Description>Lives in Oakland, CA.</Card.Description>
            </Card.Content>
            <Card.Content extra>Additional content here</Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card>
            <div className="mainContent">
              <Card.Content>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non sollicitudin mi. Proin arcu erat, varius sit amet orci id, commodo volutpat purus. Suspendisse et sem in augue imperdiet pretium eget ac lacus. Integer vulputate purus et risus molestie, eget venenatis elit lacinia. Proin lacinia nulla sit amet libero imperdiet faucibus. Fusce lacinia at odio sed lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla efficitur tellus ut condimentum ullamcorper. Nullam justo dolor, venenatis ac augue id, varius dignissim tortor.</p>
              </Card.Content>
            </div>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card>
            <div className="mainContent">
              <Card.Content>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non sollicitudin mi. Proin arcu erat, varius sit amet orci id, commodo volutpat purus. Suspendisse et sem in augue imperdiet pretium eget ac lacus. Integer vulputate purus et risus molestie, eget venenatis elit lacinia. Proin lacinia nulla sit amet libero imperdiet faucibus. Fusce lacinia at odio sed lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla efficitur tellus ut condimentum ullamcorper. Nullam justo dolor, venenatis ac augue id, varius dignissim tortor.</p>
              </Card.Content>
            </div>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>  
)

export default Profile;