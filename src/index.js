import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from  'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import { store } from './stores/app';
import App from './app.jsx';

injectTapEventPlugin();

ReactDOM.render(
    <App />,
    document.getElementById('react-container')
);
