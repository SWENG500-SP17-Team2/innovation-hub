import React, {PropTypes} from 'react';
import SignUpForm from './SignUpForm';
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        name:     '',
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
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        console.log('The form is valid');
      } else {
        // failure

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
    //return (<h1> Hello from SignUp Page</h1>);

    return  (
      <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
    );

  }
}
export default SignUpPage;
