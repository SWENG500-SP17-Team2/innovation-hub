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
import ReactHighcharts from 'react-highcharts';

var config = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
};

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
            <ReactHighcharts config={config}/>
          </div>
        </Tab>
        <Tab icon={<SettingsIcon />} label="Settings" >
            <Tabs tabItemContainerStyle={subTabStyle}>
              <Tab label="Change User Password">
                <UpdatePassword />
              </Tab >
              <Tab label="Another User Setting">
                <h1>Another user setting</h1>
              </Tab>
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
