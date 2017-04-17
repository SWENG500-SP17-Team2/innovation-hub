import React from 'react';
// { AppRegistry, View } from 'react-native';
import {
    Card,
    CardTitle,
    CardText,
    CardActions,
    CardHeader,
    CardMedia
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {store, actions} from '../stores/app';
import {marginMedium, marginAuto} from '../styles';
import {ideaCard} from '../styles';
import {ideaCardList, ideaCardActionBar} from '../styles';
import LocalAuth from '../modules/LocalAuth';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

class InnovationGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            graphdata: [],
            postNum: ''
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.queryPost = this.queryPost.bind(this);
        this.queryLikes = this.queryLikes.bind(this);
        this.queryDisLikes = this.queryDisLikes.bind(this);
    }

    rankPopularity(pos, n) {
        var z,
            phat;
        z = 1.96;
        phat = 1 * pos / n;
        return (phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n);
    }

    componentDidMount() {
        this.queryPost();
    }

    queryPost() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/innovations');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //var PostStr = JSON.stringify(xhr.response.InnovationDocs);
                //console.log('\nPostStr: ' + PostStr);

                const innovationdata = xhr.response.InnovationDocs;
                this.setState({postNum: innovationdata.length});
                for (var i = 0; i < innovationdata.length; i++) {
                   var title = innovationdata[i]['title'];
                   this.queryLikes(title,innovationdata[i]['_id']);
                }
            }
        });
        xhr.send();

    }

    queryLikes(title, id) {
       const xhr2 = new XMLHttpRequest();
       xhr2.open('get', '/api/likes/' + id);
       xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       // set the authorization HTTP header
       xhr2.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
       xhr2.responseType = 'json';
       xhr2.addEventListener('load', () => {
           if (xhr2.status === 200) {
               var positiveVotes = xhr2.response.length;
               this.queryDisLikes(title, id, positiveVotes);
           }
       });
       xhr2.send();
    }

    queryDisLikes(title, id, positiveVotes) {
       const xhr3 = new XMLHttpRequest();
       xhr3.open('get', '/api/dislikes/' + id);
       xhr3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       // set the authorization HTTP header
       xhr3.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
       xhr3.responseType = 'json';
       xhr3.addEventListener('load', () => {
           if (xhr3.status === 200) {
               var negativeVotes = xhr3.response.length;
               var totalVotes = positiveVotes + negativeVotes;
               var rankPopularity = 0;
               console.log('\ntitle: ' + title +
                           '\nid: ' + id +
                           '\nlikes: ' + positiveVotes +
                           '\ndislikes: ' + negativeVotes +
                           '\ntotalVotes: ' + totalVotes);
               if (totalVotes > 0) {
                  rankPopularity = this.rankPopularity(positiveVotes, totalVotes)
               }
               this.state.graphdata.push({
                   name: title,
                   popularity: rankPopularity
               });

               // Update the graph data object
               if(this.state.graphdata.length > this.state.postNum - 1) {
                  this.setState({data: this.state.graphdata});
                  this.setState({graphdata:  ''});
               }

           }
       });
       xhr3.send();

    }

    render() {

        return (
            <div>
                <h2 style={marginAuto}>Most Popular Ideas</h2>
                <BarChart width={600} height={300} data={this.state.data} margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="popularity" fill="#8884d8"/>
                </BarChart>
            </div>
        );
    }
}

export default InnovationGraph;
