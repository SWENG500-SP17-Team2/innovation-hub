import React from 'react';
// { AppRegistry, View } from 'react-native';
import { Card, CardTitle, CardText, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { store, actions } from '../stores/app';
import { marginMedium, marginAuto } from '../styles';
import { ideaCard } from '../styles';
import { ideaCardList, ideaCardActionBar } from '../styles';
import LocalAuth from '../modules/LocalAuth';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class InnovationGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            innovations: [{Name:"Loading...",Description:""}],
            data: [
              {name: 'Idea 1', popularity: 4},
              {name: 'Idea 2', popularity: 2},
              {name: 'Idea 3', popularity: 6},
              {name: 'Idea 4', popularity: 8},
            ]
        };

        this.unsubMessage = store.subscribe(() => {
            this.setState({
                innovations: store.getState().innovations
            });
        })

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {

      // const xhr = new XMLHttpRequest();
      // xhr.open('get', '/api/innovations');
      // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // // set the authorization HTTP header
      // xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
      // xhr.responseType = 'json';
      // xhr.addEventListener('load', () => {
      //   if (xhr.status === 200) {
      //     this.setState({
      //        innovations: xhr.response.InnovationDocs
      //     });
      //   }
      // });
      // xhr.send();

    }

    render() {

              return (<div>
                      <h2 style={marginAuto}>Most Popular Ideas</h2>
                      <BarChart width={600} height={300} data={this.state.data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                       <XAxis dataKey="name"/>
                       <YAxis/>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <Tooltip/>
                       <Legend />
                       <Bar dataKey="popularity" fill="#8884d8" />
                      </BarChart>
                     </div>);
    }
}

export default InnovationGraph;
