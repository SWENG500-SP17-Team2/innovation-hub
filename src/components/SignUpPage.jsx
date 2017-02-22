import React, {PropTypes} from 'react';
import SignUpForm from './SignUpForm';

class SignUpPage extends React.Component {
  constructor(props, context) {
    super(props, context);

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

    alert('SignUp information\nname: ' +
          this.state.user.name +
          ' \nemail: ' + this.state.user.email +
          ' \npassword: ' + this.state.user.password );

    // Create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password${password}`;

    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
       if(xhr.status == 200) {
          // Success

          this.setState({errors: {}});

          // Set a message
          localStorage.setItem('successMessage', xhr.response.message);

          // Make a redirect
          this.context.router.replace('/login');
/*
          alert('SignUp information\nname: ' +
                this.state.user.name +
                ' \nemail: ' + this.state.user.email +
                ' \npassword: ' + this.state.user.password);
*/
       } else {
          // Failure

          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;

          this.setState({errors});
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

SignUpPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignUpPage;
