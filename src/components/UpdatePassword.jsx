import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {ProfileStyle, changePasswordCardStyle } from '../styles';
import Paper from 'material-ui/Paper';
import UpdatePasswordForm from './UpdatePasswordForm';
import LocalAuth from '../modules/LocalAuth';

// import SignUpForm from './SignUpForm';

class UpdatePassword extends React.Component {
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser  = this.changeUser.bind(this);
  }
  //
  // // Change the user object
  changeUser(event) {
    const field = event.target.name;
    const user  = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }
  //
  // Process the form
  processForm(event) {

    // prevent default action
    event.preventDefault();

    //alert('Info to send to server (information\npassword: ' +
    //      this.state.user.password + ')');

    // Create a string for an HTTP body message
  //   const name = encodeURIComponent(this.state.user.name);
  //   const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
  //   var adminFT = false;
  //   if(this.state.user.name     == "Admin123" &&
  //      this.state.user.password == "Admin123")
  //   {
  //      var adminTF = true;
  //   }
  //   const admin = encodeURIComponent(adminTF);
  //   const banned = encodeURIComponent('false');
    const formData = `password=${password}`;

    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'auth/changePassword');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
       if(xhr.status == 200) {
          // Success

          this.setState({errors: {}});
          //console.log('success connecting to changepassword');
          // Set a message
          //localStorage.setItem('successMessage', xhr.response.message);

          // Make a redirect
          //this.context.router.replace('/login');

       } else {
          // Failure

          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          //alert('change password ERROR (information\npassword: ' + this.state.user.password + ')');

          this.setState({errors});
       }

    });

    xhr.send(formData);
  }

  // Display the object
  render() {

    return  (
      <UpdatePasswordForm
      onSubmit={this.processForm}
      onChange={this.changeUser}
      errors={this.state.errors}
      user={this.state.user}
      />
    );

  }

}

export default UpdatePassword;
