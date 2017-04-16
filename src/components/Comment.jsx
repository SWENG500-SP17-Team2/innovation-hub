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
import {ideaCardList, ideaCardActionBar, commentCard, ideaCard, marginMedium} from '../styles';
import ActionBar from './Actionbar'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {};

    }

    componentWillMount() {}

    // Display the object
    render() {

        return (
            <div style={commentCard}>
                <Card>
                    <CardHeader title={this.props.comment.user} subtitle={this.props.comment.userEmail} avatar="https://image.shutterstock.com/z/stock-vector-reach-idea-with-human-hand-145799489.jpg"/>
                    <CardText>
                        {this.props.comment.text}
                    </CardText>
                    <ActionBar id={this.props.comment._id} itemType="comments"/>
                </Card>
            </div>
        );

    }

}

export default Comment;
