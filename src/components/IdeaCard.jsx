import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import {
    Card,
    CardTitle,
    CardActions,
    CardHeader,
    CardText,
    CardMedia
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {ProfileStyle, changePasswordCardStyle} from '../styles';
import Paper from 'material-ui/Paper';
import UpdatePasswordForm from './UpdatePasswordForm';
import LocalAuth from '../modules/LocalAuth';
import {marginMedium} from '../styles';
import {ideaCard} from '../styles';
import {ideaCardList, ideaCardActionBar} from '../styles';
import Comment from './Comment'
import ActionBar from './ActionBar'

class IdeaCard extends React.Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {};

    }

    componentWillMount() {}

    // Display the object
    render() {

        return (
            <div style={ideaCard}>
                <Card>
                    <CardHeader title={this.props.idea.user} subtitle={this.props.idea.userEmail} avatar="https://image.shutterstock.com/z/stock-vector-reach-idea-with-human-hand-145799489.jpg"/>
                    <CardMedia overlay={< CardTitle title = {
                        this.props.idea.title
                    }
                    subtitle = "" />}>
                        <img src={this.props.idea.image}/>
                    </CardMedia>
                    <CardText>
                        {this.props.idea.description}
                    </CardText>
                    <ActionBar id={this.props.idea._id} itemType="innovations" style={{
                        marginBottom: '100px'
                    }}/>
                </Card>
            </div>
        );

    }

}

export default IdeaCard;
