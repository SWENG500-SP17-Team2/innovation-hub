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
  processForm(even) {
    // prevent default action
    event.preventDefault();
    alert('SignUp information\nname: ' +
          this.state.user.name +
          ' \nemail: ' + this.state.user.email +
          ' \npassword: ' + this.state.user.password );

    //console.log('name:', this.state.user.name);
    //console.log('email', this.state.user.email);
    //console.log('password', this.state.user.password);
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
