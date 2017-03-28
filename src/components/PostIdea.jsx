import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { marginMedium, style, formSubmit , ideaCardList, ideaCardActionBar, ideaCard} from '../styles';
import LocalAuth from '../modules/LocalAuth';
import { Card, CardTitle, CardText, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import { store, actions } from '../stores/app';


class PostIdea extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        textFieldTitle: 'Title',
        textFieldDescription: 'Description',
        textFieldPictureURL: 'http://www.goaugment.io/wp-content/uploads/2016/07/Innovation-is-an-Attitude.jpg',
        userText: LocalAuth.getAuthenticatedUser(),
        userEmailText: 'textEmail@email.com'
      };

      this.handleDescriptionFieldChange = this.handleDescriptionFieldChange.bind(this);
      this.handleTitleFieldChange= this.handleTitleFieldChange.bind(this);
      this.handlePictureURLFieldChange= this.handlePictureURLFieldChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDescriptionFieldChange(e) {
      this.setState({textFieldDescription: e.target.value});
    }

    handleTitleFieldChange(e) {
      this.setState({textFieldTitle: e.target.value});
    }

    handlePictureURLFieldChange(e) {
      this.setState({textFieldPictureURL: e.target.value});
    }

    handleSubmit(e) {
      // prevent default action
      console.log("handlesubmit");
      e.preventDefault();

      // create a string for an HTTP body message
      const description = encodeURIComponent(this.state.textFieldDescription);
      const title = encodeURIComponent(this.state.textFieldTitle);
      const image = encodeURIComponent(this.state.textFieldPictureURL);
      const user = LocalAuth.getAuthenticatedUser();
      const formData = `title=${title}&description=${description}&user=${user}&image=${image}`;
      console.log(image);
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/innovations');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 201) {

          this.setState({
            errors: {}
          });

         this.context.router.replace('/Dashboard');
        } else {

          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;

          this.setState({
            errors
          });
        }
      });

      xhr.send(formData);
  }

    render() {
      return (
            <div>
              <br></br>
               <TextField hintText="Title of innovation idea ..."
                     multiLine={true}
                     fullWidth={true}
                     style={style}
                     value={this.state.textFieldTitle}
                     onChange={this.handleTitleFieldChange}
               />
               <TextField
                     hintText="Description ..."
                     multiLine={true}
                     fullWidth={true}
                     style={style}
                     disabled={false}
                     value={this.state.textFieldDescription}
                     onChange={this.handleDescriptionFieldChange}
                 />
                 <TextField
                       hintText="Picture URL ..."
                       multiLine={true}
                       fullWidth={true}
                       style={style}
                       disabled={false}
                       value={this.state.textFieldPictureURL}
                       onChange={this.handlePictureURLFieldChange}
                   />
               <br/><br/>
                  <RaisedButton label="Submit" style={style} onClick={this.handleSubmit}/>
               <br/><br/>
               <div style={ideaCardList}>
               <div>Preview</div>
               <div style={ideaCard}>
                           <Card>
                             <CardHeader
                               title={this.state.userText}
                               subtitle={this.state.userEmailText}
                               avatar="https://image.shutterstock.com/z/stock-vector-reach-idea-with-human-hand-145799489.jpg"
                             />
                             <CardMedia overlay={<CardTitle title={this.state.textFieldTitle} subtitle="" />}>
                               <img src={this.state.textFieldPictureURL} />
                             </CardMedia>
                             <CardText>
                               {this.state.textFieldDescription}
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
                       </div>
            </div>
      );
    }
}

PostIdea.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PostIdea;
