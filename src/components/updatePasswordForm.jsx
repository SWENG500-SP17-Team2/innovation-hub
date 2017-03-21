import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {ProfileStyle, changePasswordCardStyle } from '../styles';
import Paper from 'material-ui/Paper';

const UpdatePasswordForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div className="current-pass-field-line">
    <Paper style={ProfileStyle} zDepth={1}>
      <Card style={changePasswordCardStyle}>
        <form action="/" onSubmit={onSubmit}>
          <h2>Update your password here</h2>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
          <div className="field-line">
            <TextField
              floatingLabelText="New Password"
              name="password"
              errorText={errors.password}
              onChange={onChange}
              value={user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Update Password" primary={true}/>
          </div>
        </form>
      </Card>
    </Paper>
  </div>
);

UpdatePasswordForm.propTypes ={
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default UpdatePasswordForm;
