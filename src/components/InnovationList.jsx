import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { store, actions } from '../stores/app';
import { marginMedium } from '../styles';

class InnovationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            innovations: [{Name:"Loading...",Description:""}]
        };

        this.unsubMessage = store.subscribe(() => {
            this.setState({
                innovations: store.getState().innovations
            });
        })

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
      $.getJSON('/api/innovations').then(result => {
        this.setState({
        innovations: result
        });

      }, error =>{
      console.log(error);
      });
    }

    render() {

              return (<div>
                    { this.state.innovations.map(function(item) {
                            return <Card style={marginMedium}>
                                <CardTitle title={item.Name}></CardTitle>
                                <CardText>
                                    {item.Description}
                                </CardText>
                            </Card>
                        })
                    }
        </div>);
    }
}

export default InnovationList;
