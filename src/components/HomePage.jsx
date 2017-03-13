import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { marginMedium, textCenter } from '../styles';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import InnovationList from './InnovationList';

const HomePage = () => (
    <div>
        <InnovationList/>
          <Card className="container"  style={marginMedium}>
            <CardTitle title="Innovation Hub Application"
                       subtitle="This is the home page."
                       style={textCenter}/>
          </Card>
    </div>
);

export default HomePage;
