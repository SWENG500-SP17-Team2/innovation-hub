import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { marginMedium, textCenter } from '../styles';

const HomePage = () => (
  <Card className="container"  style={marginMedium}>
    <CardTitle title="Innovation Hub Application"
               subtitle="This is the home page."
               style={textCenter}/>
  </Card>
);

export default HomePage;
