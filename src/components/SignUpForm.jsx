import React from 'react';
//import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const SignUpForm = ({
    onSubmit,
    onChange,
    errors,
    user
}) => (
    <Card className="loginForm">
       <form action="/" onSubmit={onSubmit}>
          <h2 className="card-heading">Login</h2>

          {errors.summary && <p className="error-message">{errors.summary}</p>}

          <div className="user-name">
             <TextField
                floatingLabelText="Name"
                name="name"
                errorText={errors.name}
                onChange={onChange}
                value={user.name}
               />
          </div>

          <div className="user-email">
             <TextField
                floatingLabelText="Email"
                name="email"
                errorText={errors.email}
                onChange={onChange}
                value={user.email}
               />
          </div>

          <div className="user-password">
             <TextField
                floatingLabelText="Password"
                name="password"
                type="password"
                errorText={errors.password}
                onChange={onChange}
                value={user.password}
               />
          </div>

          <div className="submit-button">
             <RaisedButton type="submit" label="Create New Account" primary />
          </div>

          <CardText>Already have an account?
//            <Link to={'/login'}> Log in</Link>
          </CardText>
       </form>
    </Card>
);

SignUpForm.propTypes ={
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
