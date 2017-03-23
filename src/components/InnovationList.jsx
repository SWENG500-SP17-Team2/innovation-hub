import React from 'react';
// { AppRegistry, View } from 'react-native';
import { Card, CardTitle, CardText, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { store, actions } from '../stores/app';
import { marginMedium } from '../styles';
import { ideaCard } from '../styles';
import { ideaCardList, ideaCardActionBar } from '../styles';
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

    }

    render() {

              return (<div style={ideaCardList}>
                        { this.state.innovations.map(function(item) {
                            return  <div style={ideaCard}>
                                        <Card>
                                          <CardHeader
                                            title={item.user}
                                            subtitle={item.user.email}
                                            avatar="https://image.shutterstock.com/z/stock-vector-reach-idea-with-human-hand-145799489.jpg"
                                          />
                                          <CardMedia overlay={<CardTitle title={item.title} subtitle="" />}>
                                            <img src={item.image} />
                                          </CardMedia>
                                          <CardText>
                                            {item.description}
                                          </CardText>
                                          <CardActions>
                                            <div style={{ display:'flex', alignItems:'center', width:'66%'}}>
                                              <div style={ideaCardActionBar} >
                                              <img style={{paddingRight:'10px'}} src="../assets/comment-icon.png"/>3 Comments</div>
                                              <div >
                                              <img style={{paddingRight:'10px'}} src="../assets/thumb-up-icon.png"/>4 Likes</div>
                                            </div>
                                          </CardActions>

                                        </Card>
                                    </div>
                            })
                        }
                        </div>);
    }
}

export default InnovationList;
