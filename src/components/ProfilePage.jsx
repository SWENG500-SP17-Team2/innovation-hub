import React from 'react';
import ProfileView from './ProfileView';
import LocalAuth from '../modules/LocalAuth';

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
    console.log('in profile page user is: ' + LocalAuth.getAuthenticatedUser());
    if(LocalAuth.getAuthenticatedUser() !== null) {
      this.setState({
        userName: LocalAuth.getAuthenticatedUser()
      });
    }

  }

  render() {
    return(
      <div>
        <ProfileView
          userName={this.state.userName}
        />
      </div>
    );
  }
}

export default ProfilePage;
