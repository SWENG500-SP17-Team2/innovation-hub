import React, {PropTypes} from 'react';
import LoginForm from './LoginForm';
import LocalAuth from '../modules/LocalAuth';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email:    '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser  = this.changeUser.bind(this);
  }

  // Change the user object
  changeUser(event) {
    const field = event.target.name;
    const user  = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  // Process the form
  processForm(event) {
    // prevent default action
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    alert('Login information\nemail: ' +
          this.state.user.email + ' \npassword: ' + this.state.user.password );

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // Save the token
        LocalAuth.authenticateUser(xhr.response.token);

        // change the component-container state
        this.setState({
          errors: {}
        });
/*
        alert('Login information\nemail: ' +
              this.state.user.email +
              ' \npassword: ' + this.state.user.password +
              ' \ntoken: ' + xhr.response.token);
*/
        // change the current URL to /
        this.context.router.replace('/Dashboard');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);

}

  // Display the object
  render() {
    //return (<h1> Hello from Login Page</h1>);

    return  (
      <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />
    );

  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
