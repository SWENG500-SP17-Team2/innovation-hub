import React from 'react';
import { Card, CardTitle, CardHeader, CardText, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return(
      <div>
        <Card>
          <CardHeader
          avatar="http://images.athlonsports.com/d/40190-2/pennstate.jpg"
          title="test"
          subtitle="testing"
          />
        </Card>
        <Tabs>
          <Tab label="Ideas" />
          <Tab label="Statistics" />
        </Tabs>
      </div>
    );
  }
}

export default ProfilePage;
