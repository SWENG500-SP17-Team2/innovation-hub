import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { store, actions } from '../stores/app';
import { marginMedium } from '../styles';
import LocalAuth from '../modules/LocalAuth';


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

      const xhr = new XMLHttpRequest();
      xhr.open('get', '/api/innovations');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.setState({
             innovations: xhr.response.InnovationDocs
          });
        }
      });
      xhr.send();


      // $.getJSON('/api/innovations').then(result => {
      //   this.setState({
      //   innovations: result
      // //   });
      //
      // }, error =>{
      // console.log(error);
      // });
    }

    render() {

              return (<div>
                    { this.state.innovations.map(function(item) {
                            return <Card style={marginMedium}>
                                <CardTitle title={item.title}></CardTitle>
                                <CardText>
                                    {item.description}
                                </CardText>
                            </Card>
                        })
                    }
        </div>);
    }
}

export default InnovationList;
