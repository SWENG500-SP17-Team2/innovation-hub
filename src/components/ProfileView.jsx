import React, {PropTypes} from 'react';
import { Card, CardTitle, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FaceIcon from 'material-ui/svg-icons/action/face';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import { ProfileStyle, FaceIconStyle, subTabStyle } from '../styles';
import UpdatePassword from './UpdatePassword';

//const ProfileView = ({userName}) => (
class ProfileView extends React.Component {
 render() {
  return (
  <div>
   <Paper style={ProfileStyle} zDepth={1}>
    <Card>
      <CardMedia
        overlay={
            <CardTitle title={this.props.userName} />
        }
      >
        <img src="https://arielle.com.au/wp-content/uploads/2016/04/nature-purple-mountains-light.jpg" />
      </CardMedia>
      <Tabs>
        <Tab icon={<SettingsIcon />} label="Settings" >
            <Tabs tabItemContainerStyle={subTabStyle}>
              <Tab label="Change User Password">
                <UpdatePassword />
              </Tab >
            </Tabs>
        </Tab>
      </Tabs>
    </Card>
   </Paper>
  </div>
 );
}
}
ProfileView.propTypes ={
  userName: PropTypes.string.isRequired
};

export default ProfileView;
