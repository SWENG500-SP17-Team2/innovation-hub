
import {jsdom} from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Router,browserHistory,createMemoryHistory } from "react-router";
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import localStorageMock from '../../__mocks__/localStorage';
import TopBase from '../../src/components/TopBase';
import HomePage from '../../src/components/HomePage';
import SignUpPage from '../../src/components/SignUpPage';
import LoginPage from '../../src/components/LoginPage';
import ProfilePage from '../../src/components/ProfilePage';


import App from '../../src/app.jsx';

// Set up fake HTML
const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
global.document = jsdom(documentHTML);

const lightMuiTheme = getMuiTheme(lightBaseTheme);

// Create history object to operate with in non-browser environment
const history = createMemoryHistory("/signup");

// Setup routes configuration.
const routes = {
   // Base component (wrapper for the whole application)
   component : TopBase,

   childRoutes: [
     {path: '/', component: HomePage},
     {path: '/signup', component: SignUpPage}
   ]
};


describe('App', () => {

    it('Renders without crashing', () => {

       //ReactDOM.render(<App/>, div);

       //const component = renderer.create(
      //     <MuiThemeProvider muiTheme={lightMuiTheme}>
      //     <App/>,
      //     </MuiThemeProvider>
       //);

       //const rendered = mount(<App/>, {attachTo: document.getElementById('root')});
       const appSnap = renderer.create(<App/>).toJSON();
       expect(appSnap).toMatchSnapshot();

   });

});


describe('Render signup page', () => {

      it('Renders Snapshot SignUpPage', () => {
          //const div = document.createElement('div');
          //ReactDOM.render(<SignUpPage/>, div);
          const signupSnap = renderer.create(<SignUpPage/>).toJSON();
          expect(signupSnap).toMatchSnapshot();
      });
});

describe('Render login page', () => {
   it('Renders Snapshot LoginPage', () => {
       const loginSnap = renderer.create(<LoginPage/>).toJSON();
       expect(loginSnap).toMatchSnapshot();
   });
});

describe('Render Profile page', () => {
   it('Renders Snapshot ProfilePage', () => {
       const ProfilePageSnap = renderer.create(<ProfilePage/>).toJSON();
       expect(ProfilePageSnap).toMatchSnapshot();
   });
});

/*
      it('Should submit the signup form', () => {
          const spy = jest.fn();
          const renderedTree= TestUtils.renderIntoDocument(<SignUpPage user={spy}/>);
          const signup_form = TestUtils.scryRenderedDOMComponentsWithClass(renderedTree, 'field-line');

          expect(signup_form[0].textContent).toEqual('Name');
          expect(signup_form[1].textContent).toEqual('Email');
          expect(signup_form[2].textContent).toEqual('Password');

          renderedTree.state.user.name='user';
          renderedTree.state.user.email='user@aol.com';
          renderedTree.state.user.password='12345678';

          //TestUtils.Simulate.submit(signup_form[0], signup_form[1], signup_form[2);
      });
*/
