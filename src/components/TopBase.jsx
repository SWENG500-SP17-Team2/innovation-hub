import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { topBar, topBarLeft, topBarRight } from '../styles';

const TopBase = ({children}) => (
  <div>
    <div className="top-bar" style={topBar}>
      <div className="top-bar-left" style={topBarLeft}>
        <IndexLink to="/">Innovation Hub</IndexLink>
      </div>
      <div className="top-bar-right" style={topBarRight}>
        <Link to="/login">Log in</Link>&nbsp;
        <Link to="/signup">Sign up</Link>
      </div>
    </div>

       {children}
  </div>
);

TopBase.propTypes = {
  children: PropTypes.object.isRequired
};

export default TopBase;
