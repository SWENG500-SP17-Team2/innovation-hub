import React from 'react';
// { AppRegistry, View } from 'react-native';
import { Card, CardTitle, CardText, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { store, actions } from '../stores/app';
import { marginMedium } from '../styles';
import { ideaCard } from '../styles';
import { ideaCardList } from '../styles';

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

              return (<div style={ideaCardList}>
                    { this.state.innovations.map(function(item) {
                            return  <div style={ideaCard}>

                                        <Card>
                                          <CardHeader
                                            title={item.title}
                                            subtitle=""
                                            avatar="https://image.shutterstock.com/z/stock-vector-reach-idea-with-human-hand-145799489.jpg"
                                          />
                                          <CardMedia
                                            overlay={<CardTitle title={item.title} subtitle="" />}
                                          >
                                            <img src={item.image} />
                                          </CardMedia>
                                          <CardTitle title={item.title} />
                                          <CardText>
                                            {item.description}
                                          </CardText>
                                          <CardActions>
                                            <div style={{flex: 1, flexDirection: 'row'}}>
                                              <div style={{flex: 1}}><img src="../assets/comment-icon.png"/>3 Comments</div>
                                              <div style={{flex: 1}}><img src="../assets/thumb-up-icon.png"/>4 Likes</div>
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
