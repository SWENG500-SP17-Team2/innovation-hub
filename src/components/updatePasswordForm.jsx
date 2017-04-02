import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {ProfileStyle, changePasswordCardStyle } from '../styles';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';


const UpdatePasswordForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  snackbarOpen,
  handleSnackbarClose
}) => (
  <div className="current-pass-field-line">
    <Paper style={ProfileStyle} zDepth={1}>
      <Card style={changePasswordCardStyle}>
        <form action="/" onSubmit={onSubmit}>
          <h2>Update your password here</h2>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
          <div className="field-line">
            <TextField
              floatingLabelText="Type Current Password"
              name="currentpassword"
              type="password"
              errorText={errors.currentpassword}
              onChange={onChange}
              value={user.currentpassword}
            /><br/>
            <TextField
              floatingLabelText="Type New Password"
              name="password"
              type="password"
              errorText={errors.password}
              onChange={onChange}
              value={user.password}
            />
          </div>
          <Snackbar
            open={snackbarOpen}
            message="Password changed successfully!"
            autoHideDuration={4000}
            onRequestClose={handleSnackbarClose}
          />
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
  user: PropTypes.object.isRequired,
  snackbarOpen: PropTypes.bool.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired
};

export default UpdatePasswordForm;
