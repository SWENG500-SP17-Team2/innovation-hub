import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from  'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';

import { store } from './stores/app';
import routes from './routes.js';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends React.Component {
    //navMenuClick() {
    //    console.log('Nav menu button clicked! Again!');
    //}


    render() {
        //const globalFontStyle = {
        //    fontFamily: 'Roboto, sans-serif'
        //};

        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <div >
                  <Router history={browserHistory} routes={routes} />
                </div>
            </MuiThemeProvider>
        );
    }
}

injectTapEventPlugin();

ReactDOM.render(
    <App />,
    document.getElementById('react-container')
);
