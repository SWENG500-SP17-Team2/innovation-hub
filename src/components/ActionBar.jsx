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
import Comment from './Comment';
import Snackbar from 'material-ui/Snackbar';

class ActionBar extends React.Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            errors: {},
            comments: [],
            likes: [],
            dislikes: [],
            showComments: false,
            textFieldDescription: '',
            open: false,
            message: ''

        };

        this.handleDescriptionFieldChange = this.handleDescriptionFieldChange.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.submitLike = this.submitLike.bind(this);
        this.submitDislike = this.submitDislike.bind(this);
        this.refresh = this.refresh.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.reportItem = this.reportItem.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

    }

    componentWillMount() {
        this.refresh();
    }

    handleDescriptionFieldChange(e) {
        this.setState({textFieldDescription: e.target.value});
    }

    refresh() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/comments/' + this.props.id);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({comments: xhr.response});
            }
        });
        xhr.send();

        const xhr2 = new XMLHttpRequest();
        xhr2.open('get', '/api/likes/' + this.props.id);
        xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr2.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr2.responseType = 'json';
        xhr2.addEventListener('load', () => {
            if (xhr2.status === 200) {
                this.setState({likes: xhr2.response});
            }
        });
        xhr2.send();

        const xhr3 = new XMLHttpRequest();
        xhr3.open('get', '/api/dislikes/' + this.props.id);
        xhr3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr3.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr3.responseType = 'json';
        xhr3.addEventListener('load', () => {
            if (xhr3.status === 200) {
                this.setState({dislikes: xhr3.response});
            }
        });
        xhr3.send();
    }

    toggleComments() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    handleTouchTap(messageInput) {
        this.setState({open: true, message: messageInput});
    };

    handleRequestClose() {
        this.setState({open: false});
    };

    submitComment(e) {
        // prevent default action
        e.preventDefault();

        // create a string for an HTTP body message
        const description = encodeURIComponent(this.state.textFieldDescription);
        const parentid = this.props.id;
        const user = LocalAuth.getAuthenticatedUser();
        const userEmail = LocalAuth.getAuthenticatedEmail();
        const formData = `parentid=${parentid}&text=${description}&user=${user}&userEmail=${userEmail}`;
        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/comments');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {

                this.setState({errors: {}});
            } else {

                const errors = xhr.response.errors
                    ? xhr.response.errors
                    : {};
                errors.summary = xhr.response.message;

                this.setState({errors});
            }
        });

        xhr.send(formData);
        this.handleTouchTap('This comment has been submitted!');
        this.refresh();
    }

    submitLike() {
        // prevent default action
        event.preventDefault();

        // Create a string for an HTTP body message
        const name = encodeURIComponent(LocalAuth.getAuthenticatedUser());
        const email = encodeURIComponent(LocalAuth.getAuthenticatedEmail());
        const parentId = encodeURIComponent(this.props.id);
        var adminTF = false;

        const formData = `user=${name}&parentid=${parentId}&userEmail=${email}`;

        // Create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'api/likes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                // Success

                this.setState({errors: {}});

                // Set a message
                localStorage.setItem('successMessage', xhr.response.message);

                // Make a redirect
                this.context.router.replace('/login');

            } else {
                // Failure

                const errors = xhr.response.errors
                    ? xhr.response.errors
                    : {};
                errors.summary = xhr.response.message;

                this.setState({errors});
            }

        });

        xhr.send(formData);
        this.refresh();

        this.handleTouchTap('Like Submitted!');
    }

    submitDislike() {
        // prevent default action
        event.preventDefault();

        // Create a string for an HTTP body message
        const name = encodeURIComponent(LocalAuth.getAuthenticatedUser());
        const email = encodeURIComponent(LocalAuth.getAuthenticatedEmail());
        const parentId = encodeURIComponent(this.props.id);
        var adminTF = false;

        const formData = `user=${name}&parentid=${parentId}&userEmail=${email}`;

        // Create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'api/dislikes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                // Success

                this.setState({errors: {}});

                // Set a message
                localStorage.setItem('successMessage', xhr.response.message);

                // Make a redirect
                this.context.router.replace('/login');

            } else {
                // Failure

                const errors = xhr.response.errors
                    ? xhr.response.errors
                    : {};
                errors.summary = xhr.response.message;

                this.setState({errors});
            }

        });

        xhr.send(formData);
        this.refresh();

        this.handleTouchTap('Disike Submitted!');
    }

    reportItem() {
        // prevent default action
        event.preventDefault();

        // Create a string for an HTTP body message

        const parentId = encodeURIComponent(this.props.id);
        var adminTF = false;

        const formData = `parentid=${parentId}`;

        // Create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('put', 'api/' + this.props.itemType + '/report/' + this.props.id);
        xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({comments: xhr.response});
            }
        });
        xhr.send();
        this.handleTouchTap('This item has been reported!');
        this.refresh();
    }

    // Display the object
    render() {

        return (
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '66%'
                }}>
                    <div style={ideaCardActionBar} onClick={this.toggleComments}>
                        <img style={{
                            paddingRight: '10px'
                        }} src="../assets/comment-icon.png"/>{this.state.comments.length}
                        Comments</div>
                    <div onClick={this.submitLike} style={ideaCardActionBar}>
                        <img style={{
                            paddingRight: '10px'
                        }} src="../assets/thumb-up-icon.png"/>{this.state.likes.length}
                        Likes</div>
                    <div onClick={this.submitDislike} style={ideaCardActionBar}>
                        <img style={{
                            paddingRight: '10px'
                        }} src="../assets/thumb-down-icon.png"/>{this.state.dislikes.length}
                        Disikes</div>
                    <div style={ideaCardActionBar} onClick={this.reportItem}>
                        <img style={{
                            paddingRight: '10px'
                        }} src="../assets/report-problem-icon.png"/>Report</div>
                </div>
                <div style={{
                    alignItems: 'center'
                }}>
                    {this.state.showComments
                        ? <div>
                                <div>
                                    {this.state.comments.map(function(item) {
                                        return <Comment comment={item} style={{
                                            alignItems: 'center'
                                        }}/>
                                    })}
                                </div>
                                <div style={{
                                    paddingLeft: '10px'
                                }}>
                                    <TextField hintText="Comment ..." multiLine={true} fullWidth={true} disabled={false} value={this.state.textFieldDescription} onChange={this.handleDescriptionFieldChange}/>
                                    <br/><br/>
                                    <RaisedButton label="Submit" onClick={this.submitComment}/>
                                    <br/><br/>
                                </div>
                            </div>
                        : null}

                </div>
                <Snackbar open={this.state.open} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
            </div>
        );

    }

}

export default ActionBar;
