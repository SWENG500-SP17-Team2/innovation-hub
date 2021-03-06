import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {Card, CardTitle} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import {topBar, bottomBar, topBarLeft, topBarRight} from '../styles';
import LocalAuth from '../modules/LocalAuth';
import NavigationHome from 'material-ui/svg-icons/action/home';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

import RaisedButton from 'material-ui/RaisedButton';
import ActionCopyright from 'material-ui/svg-icons/action/copyright';

const TopBase = ({children}) => (
    <div>
        <AppBar title="Innovation Hub" iconElementLeft={< IndexLink to = "/" > <IconButton><NavigationHome/></IconButton> < /IndexLink>} iconElementRight= {LocalAuth.isUserAuthenticated() ? ( <div> <Link to="/NewPost"> <FlatButton label="Post New Idea"/> </Link> <Link to="/InnovationGraph"> <FlatButton label="Post Metrics"/> </Link> <Link to="/logout"> <FlatButton label="Sign out"/> </Link> <Link to="/ProfilePage"> <IconButton><AccountCircle /></IconButton> </Link> </div> ) : ( <div> <Link to="/login"> <FlatButton label="Login"/> </Link> <Link to="/signup"> <FlatButton label="Sign up"/> </Link> </div> )}/> {children}

        <FlatButton labelPosition="after" label="2017 Victor Azurin - Braun Brennecke - William Truong" labelStyle={bottomBar} icon={< ActionCopyright />} disabled={true}/>

    </div>

);

TopBase.propTypes = {
    children: PropTypes.object.isRequired
};

export default TopBase;
