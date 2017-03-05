import React from 'react';
import ProfileView from './ProfileView';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "default user name"
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

    $.getJSON("api/user_data", function(data) {
        // Make sure the data contains the username as expected before using it
        if (data.hasOwnProperty('username')) {
            console.log('Usrename: ' + data.username);
            this.setState({
               userName: data.username
            });
        }
    }.bind(this));

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
