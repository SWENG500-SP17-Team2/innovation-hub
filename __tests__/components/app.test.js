//'use strict';

//jest.unmock('../../src/components/HomePage');

//import React from 'react';
//import ReactDOM from 'react-dom';
//import ReactTestUtils from 'react-addons-test-utils';

//import HomePage from '../../src/components/HomePage';
var React = require('react');
var ReactDOM = require('react-dom');
var HomePage = require('../../src/components/HomePage');

it('renders without crashing', () => {
  alert("HomePage test in __tests__ is called");
  const div = document.createElement('div');
  //ReactDOM.render(<HomePage />, div);
});

/*
describe('HomePage', () => {

  it('should be able to run tests', () => {
      expect(1 + 2).toEqual(3);
  });

});
*/
