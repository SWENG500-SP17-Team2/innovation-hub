import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { marginMedium, style, formSubmit } from '../styles';

class PostIdea extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        textFieldTitle: '',
        textFieldValue: ''
      };

      this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
      this.handleTitleFieldChange= this.handleTitleFieldChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextFieldChange(e) {
      this.setState({textFieldValue: e.target.value});
    }

    handleTitleFieldChange(e) {
      this.setState({textFieldTitle: e.target.value});
    }

    handleSubmit() {
       alert('The following innovation idea was submitted\nTITLE: ' +
             this.state.textFieldTitle + ' \nDESCRIPTION: ' + this.state.textFieldValue );
       this.setState({textFieldValue: ''});
       this.setState({textFieldTitle: ''});
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
                     value={this.state.textFieldValue}
                     onChange={this.handleTextFieldChange}
                 />
               <br/><br/>
               <RaisedButton label="Submit" style={style} onClick={this.handleSubmit}/>
               <br/><br/>
            </div>
      );
    }
}

export default PostIdea;
