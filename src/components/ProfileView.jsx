import React, {PropTypes} from 'react';
import { Card, CardTitle, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import FaceIcon from 'material-ui/svg-icons/action/face';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import { ProfileStyle, FaceIconStyle } from '../styles';

const ProfileView = ({userName}) => (
  <div>
   <Paper style={ProfileStyle} zDepth={5}>
    <Card>
      <CardMedia
        overlay={
            <CardTitle title={userName} />
        }
      >
        <img src="https://arielle.com.au/wp-content/uploads/2016/04/nature-purple-mountains-light.jpg" />
      </CardMedia>
      <Tabs>
        <Tab icon={<LightBulbIcon />} label="Started Ideas" >
          <div>
            <Card>
              <CardTitle title="Here goes the user idea 1" />
            </Card>
            <Card>
              <CardTitle title="Here goes the user idea 2" />
            </Card>
          </div>
        </Tab>
        <Tab icon={<AssessmentIcon />} label="Statistics" >
          <div>
            <h2>Here goes some graphs</h2>
          </div>
        </Tab>
        <Tab label="Settings" >
          <div>
            <h2>Some settings</h2>
          </div>
        </Tab>
      </Tabs>
    </Card>
   </Paper>
  </div>
)

ProfileView.propTypes ={
  userName: PropTypes.string.isRequired
};

export default ProfileView;
