import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { marginMedium, textCenter} from '../styles';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import InnovationList from './InnovationList';

const HomePage = () => (

  <Card className="container"  style={marginMedium}>
      <CardTitle title="Innovation Hub"
               subtitle="A Place to Share Ideas"
             style={textCenter}/>
  </Card>

);

export default HomePage;
