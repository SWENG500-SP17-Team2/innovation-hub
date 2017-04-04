import React from 'react';
import ProfileView from './ProfileView';
import LocalAuth from '../modules/LocalAuth';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "default user name"
    };

    //this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {

    // $.getJSON("/user_data", function(data) {
    //     // Make sure the data contains the username as expected before using it
    //     if (data.hasOwnProperty('username')) {
    //         console.log('Usrename: ' + data.username);
    //         this.setState({
    //            userName: data.username
    //         });
    //     }
    // }.bind(this));
    if(LocalAuth.getAuthenticatedUser() !== null) {
      this.setState({
        userName: LocalAuth.getAuthenticatedUser()
      });
    }

  }

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <ProfileView
          userName={this.state.userName}
        />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default ProfilePage;
