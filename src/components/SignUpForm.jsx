import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {marginMedium, textCenter} from '../styles';

const SignUpForm = ({onSubmit, onChange, errors, user}) => (
    <Card className="container" style={marginMedium}>
        <form action="/" onSubmit={onSubmit}>
            <h2 className="card-heading" style={textCenter}>Sign Up</h2>

            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line" style={textCenter}>
                <TextField floatingLabelText="Name" name="name" errorText={errors.name} onChange={onChange} value={user.name}/>
            </div>

            <div className="field-line" style={textCenter}>
                <TextField floatingLabelText="Email" name="email" errorText={errors.email} onChange={onChange} value={user.email}/>
            </div>

            <div className="field-line" style={textCenter}>
                <TextField floatingLabelText="Password" name="password" type="password" errorText={errors.password} onChange={onChange} value={user.password}/>
            </div>

            <div className="button-line" style={textCenter}>
                <RaisedButton type="submit" label="Create New Account" primary/>
            </div>

            <CardText style={textCenter}>Already have an account?
                <Link to={'/login'}>
                    Log in</Link>
            </CardText>
        </form>
    </Card>
);

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;
