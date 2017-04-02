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
        password: '',
        currentpassword: ''
      },
      snackbarOpen: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser  = this.changeUser.bind(this);
    this.handleSnackbarClose  = this.handleSnackbarClose.bind(this);

  }
  //
  // // Change the user object
  changeUser(event) {
    const field = event.target.name;
    const user  = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  //close snackbar
  handleSnackbarClose(event) {
    this.setState({
      snackbarOpen: false,
    });
  };

  changePasswordRequest(email, password) {
    // request to change password
    const formData = `email=${email}&password=${password}`;
    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'auth/changePassword');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
       if(xhr.status == 200) {
          // Success

          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          this.setState({
            errors: {},
            user: {
              password: '',
              currentpassword: ''
            },
            snackbarOpen: true
          });

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

  checkPasswordRequest (email, password, currentpassword, callback){
    const formDataCheckPassword = `email=${email}&password=${currentpassword}`;
    // Create an AJAX request
    const xhrpass = new XMLHttpRequest();
    xhrpass.open('post', '/auth/login');
    xhrpass.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhrpass.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
    xhrpass.responseType = 'json';
    xhrpass.addEventListener('load', () => {
       if(xhrpass.status !== 200) {
          // Success

          const errors = xhrpass.response.errors ? xhrpass.response.errors : {};
          errors.summary = xhrpass.response.message;
          this.setState({errors});
          this.setState({
            user: {
              password: '',
              currentpassword: ''
            }
          });
          //if error skip request to change password
          console.log('incorrect password and error message is ' + errors.summary);

       } else {
         console.log('correct password')
         callback(email, password);
       }

    });

    xhrpass.send(formDataCheckPassword);
  }
  //
  // Process the form
  processForm(event) {

    // prevent default action
    event.preventDefault();

    var flag = false;
    const storedEmail = LocalAuth.getAuthenticatedEmail();
    console.log('stored email' + storedEmail);
    const email = encodeURIComponent(storedEmail);
    const password = encodeURIComponent(this.state.user.password);
    const currentpassword = encodeURIComponent(this.state.user.currentpassword);

    this.checkPasswordRequest(email, password, currentpassword, this.changePasswordRequest.bind(this));

  }

  // Display the object
  render() {

    return  (
      <UpdatePasswordForm
      onSubmit={this.processForm}
      onChange={this.changeUser}
      errors={this.state.errors}
      user={this.state.user}
      snackbarOpen={this.state.snackbarOpen}
      handleSnackbarClose={this.handleSnackbarClose}
      />
    );

  }

}

UpdatePassword.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UpdatePassword;
