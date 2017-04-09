import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { marginSmall, marginMedium, textCenter } from '../styles';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import LocalAuth from '../modules/LocalAuth';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';

/**
 * Main Admin class
*/
class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          tableData : [],
          //tableData : [{
          //  userName: 'William Elliott',
          //  email : 'welliot0@aol.com'
          //},],
          selectedEmail:''
          };

          this.handleLock = this.handleLock.bind(this);
          this.handleUnLock = this.handleUnLock.bind(this);
          this.handleDelete = this.handleDelete.bind(this);
          this.handleRowHover = this.handleRowHover.bind(this);
    }

/**
  * Routine to querying registered users
*/
    componentDidMount() {
       //console.log ('componentDidMount is invoke');

          var rowArray = [];
          // Query all users
          const email = encodeURIComponent('Admin123@bvw.net');
          const password = encodeURIComponent('Admin123');
          const formData = `email=${email}&password=${password}`;

          // create an AJAX request
          const xhr = new XMLHttpRequest();
          xhr.open('post', '/query/users');
          xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          //xhr.setRequestHeader('Authorization', `bearer ${LocalAuth.getToken()}`);
          xhr.responseType = 'json';
          xhr.addEventListener('load', () => {
             if (xhr.status === 200) {
                // Turns a Javascript object into JSON text into JSON string.
                var userStr = JSON.stringify(xhr.response.queryUser);
                console.log('\nuserStr: ' + userStr);
                var userEmail = "";
                var userName = "";
                var userPrivilege = "";
                var userStatus = "";

                for(var index = 0; index < userStr.length; index++) {
                   // Extract user's email
                   if(userStr.charAt(index)   === 'e' &&
                      userStr.charAt(index+1) === 'm' &&
                      userStr.charAt(index+2) === 'a' &&
                      userStr.charAt(index+3) === 'i' &&
                      userStr.charAt(index+4) === 'l' )
                   {
                     for (var eId = index+8; eId < userStr.length; eId++) {
                        if(userStr[eId]   === '"' &&
                           userStr[eId+1] === ',' &&
                           userStr[eId+2] === '"') {
                           break;
                        }
                        else {
                          userEmail += userStr.charAt(eId);
                        }
                     }
                   }
                   // Extract user's name
                   if(userStr.charAt(index)   === '"' &&
                      userStr.charAt(index+1) === ',' &&
                      userStr.charAt(index+2) === '"' &&
                      userStr.charAt(index+3) === 'n' &&
                      userStr.charAt(index+4) === 'a' &&
                      userStr.charAt(index+5) === 'm' &&
                      userStr.charAt(index+6) === 'e')
                   {
                     for (var nId = index+10; nId < userStr.length; nId++) {
                        if(userStr[nId]   === '"' &&
                           userStr[nId+1] === ',' &&
                           userStr[nId+2] === '"') {
                           break;
                        }
                        else {
                          userName += userStr.charAt(nId);
                        }
                     }

                   }

                  // Extract user's privilege
                  if(userStr.charAt(index)   === '"' &&
                     userStr.charAt(index+1) === ',' &&
                     userStr.charAt(index+2) === '"' &&
                     userStr.charAt(index+3) === 'a' &&
                     userStr.charAt(index+4) === 'd' &&
                     userStr.charAt(index+5) === 'm' &&
                     userStr.charAt(index+6) === 'i' &&
                     userStr.charAt(index+7) === 'n')
                  {
                    for (var pId = index+11; pId < userStr.length; pId++) {
                       if(userStr[pId]   === '"' &&
                          userStr[pId+1] === ',' &&
                          userStr[pId+2] === '"') {
                          break;
                       }
                       else {
                         userPrivilege += userStr.charAt(pId);
                       }
                    }
                  }

                  // Extract user's status
                  if(userStr.charAt(index)   === '"' &&
                     userStr.charAt(index+1) === ',' &&
                     userStr.charAt(index+2) === '"' &&
                     userStr.charAt(index+3) === 'b' &&
                     userStr.charAt(index+4) === 'a' &&
                     userStr.charAt(index+5) === 'n' &&
                     userStr.charAt(index+6) === 'n' &&
                     userStr.charAt(index+7) === 'e' &&
                     userStr.charAt(index+8) === 'd')
                    {
                      for (var sId = index+12; sId < userStr.length; sId++) {
                         if(userStr[sId]   === '"' &&
                            userStr[sId+1] === ',' &&
                            userStr[sId+2] === '"') {
                            break;
                         }
                         else {
                           userStatus += userStr.charAt(sId);
                         }
                      }

                      if(userPrivilege !== 'true') {
                         if(userStatus == 'false') {
                            var status = 'Active';
                         } else {
                            var status = 'Locked';
                         }

                         // Push this user object into an array
                         rowArray.push({userName: userName, email: userEmail, status:status});

                         this.setState({
                           tableData: rowArray
                         });
                      }

                      // Reset the local variables
                      userName   = "";
                      userEmail  = "";
                      userStatus = "";
                      userPrivilege ="";
                    }
                  }
                }
          });

          xhr.send(formData);
    }

/**
 * Routine to handle lock an user account
*/
    handleLock (event) {
      event.preventDefault();

      //alert("handleLock routine is called. selectedEmail : " +this.state.selectedEmail);

      const email = encodeURIComponent(this.state.selectedEmail);
      const password = encodeURIComponent('true');
      const formData = `email=${email}&password=${password}`;
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/update/updateLockAttr');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          alert("Successuful locking userEmail: " +this.state.selectedEmail);
        } else {
          alert("Failure to lock userEmail: " +this.state.selectedEmail);
        }
      });

      xhr.send(formData);

    }

/**
 * Routine to handle unlock an user account
*/
    handleUnLock (event) {
      event.preventDefault();

      //alert("handleUnLock routine is called. selectedEmail : " +this.state.selectedEmail);

      const email = encodeURIComponent(this.state.selectedEmail);
      const password = encodeURIComponent('false');
      const formData = `email=${email}&password=${password}`;
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/update/updateLockAttr');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          alert("Successuful Unlocking userEmail: " +this.state.selectedEmail);
        } else {
          alert("Failure to Unlock userEmail: " +this.state.selectedEmail);
        }
      });

      xhr.send(formData);

    }

/**
 * Routine to delete an user account
*/
    handleDelete (event) {
      event.preventDefault();

      //alert("handleDelete routine is called. selectedEmail : " +this.state.selectedEmail);
      const email = encodeURIComponent(this.state.selectedEmail);
      const password = encodeURIComponent(this.state.selectedEmail);
      const formData = `email=${email}&password=${password}`;
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/update/deleteAccount');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          alert("Successuful deleting userEmail: " +this.state.selectedEmail);
        } else {
          alert("Failure to delete userEmail: " +this.state.selectedEmail);
        }
      });

      xhr.send(formData);

    }

/**
 * Routine to detect current rowNumber
*/
    handleRowHover (rowNumber) {
      this.state.selectedEmail = this.state.tableData[rowNumber].email;
    }

/**
 * Render function of Admin class
*/
    render() {

      return (
        <div>
          <Card className="container"  style={marginMedium}>
              <CardTitle title="Administration Page"
              subtitle="Manage user account and remove violated post"
              style={textCenter}/>

            <Tabs>
              <TabList>
                 <Tab>User List</Tab>
                 <Tab>Reports</Tab>
              </TabList>

               <TabPanel>
                 <h3>List of registered users</h3>
                 <Table selectable={true} onRowHover = {this.handleRowHover}>
                    <TableHeader>
                       <TableRow>
                         <TableHeaderColumn>Name</TableHeaderColumn>
                         <TableHeaderColumn>e-mail</TableHeaderColumn>
                         <TableHeaderColumn>Status</TableHeaderColumn>
                         <TableHeaderColumn>Actions</TableHeaderColumn>
                       </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true}>
                       {this.state.tableData.map( (row, index) => (
                         <TableRow key={index} selected={row.selected} >
                           <TableRowColumn>{row.userName}</TableRowColumn>
                           <TableRowColumn>{row.email}</TableRowColumn>
                           <TableRowColumn>{row.status}</TableRowColumn>
                           <TableRowColumn>
                             <IconButton disabled={(row.status=='Locked')} onTouchTap={this.handleLock}>
                               <ActionLock />
                             </IconButton>
                             <IconButton disabled={(row.status=='Active')} onTouchTap={this.handleUnLock}>
                               <ActionLockOpen />
                             </IconButton>
                             <IconButton disabled={false} onTouchTap={this.handleDelete}>
                               <ActionDelete />
                             </IconButton>
                           </TableRowColumn>
                         </TableRow>
                       ))}
                    </TableBody>
                 </Table>
               </TabPanel>

               <TabPanel>
                  <h3>Displaying User Reports</h3>
               </TabPanel>

            </Tabs>

          </Card>

        </div>
      );
    }
}

export default Admin;
