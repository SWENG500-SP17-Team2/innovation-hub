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
import {marginMedium} from '../styles';
import {ideaCard} from '../styles';
import {ideaCardList, ideaCardActionBar} from '../styles';
import LocalAuth from '../modules/LocalAuth';
import IdeaCard from './IdeaCard'
import InnovationGraph from './InnovationGraph';

class InnovationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            innovations: []
        };

        this.unsubMessage = store.subscribe(() => {
            this.setState({innovations: store.getState().innovations});
        })

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {

        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/innovations');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({innovations: xhr.response.InnovationDocs});
            }
        });
        xhr.send();

    }

    render() {

        return (
            <div style={ideaCardList}>
                {this.state.innovations.map(function(item) {
                    return <IdeaCard idea={item}/>
                })
}
                <br/>
                <InnovationGraph/>
            </div>
        );
    }
}

export default InnovationList;
