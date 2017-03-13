import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { marginMedium, textCenter } from '../styles';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import LocalAuth from '../modules/LocalAuth';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          tableData : [],
          //tableData : [{
          //  userName: 'William Elliott',
          //  email : 'welliot0@aol.com'
          //},],
          updateRequired: false
          };

          //this.handleSelect = this.handleSelect.bind(this);
    }

    //handleSelect(index) {
    componentDidMount() {
       console.log ('componentDidMount is invoke');

       //if(index === 0) {
          var rowArray = [];
          // Query all users
          const email = encodeURIComponent('Admin123@bvw.net');
          const password = encodeURIComponent('Admin123');
          const formData = `email=${email}&password=${password}`;

          // create an AJAX request
          const xhr = new XMLHttpRequest();
          xhr.open('post', '/query/users');
          xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          xhr.responseType = 'json';
          xhr.addEventListener('load', () => {
             if (xhr.status === 200) {
                // Turns a Javascript object into JSON text into JSON string.
                var userStr = JSON.stringify(xhr.response.queryUser);
                console.log('\nuserStr: ' + userStr);
                var email = "";
                var userName = "";
                var userStatus = "";

                for(var index = 0; index < userStr.length; index++) {
                   // Extract user's email
                   if(userStr.charAt(index)   === 'e' &&
                      userStr.charAt(index+1) === 'm' &&
                      userStr.charAt(index+2) === 'a' &&
                      userStr.charAt(index+3) === 'i' &&
                      userStr.charAt(index+4) === 'l' )
                   {
                     //console.log('\n ======= Detecting email pattern ====== \n');
                     //console.log('\n ====================================== \n');
                     for (var eId = index+8; eId < userStr.length; eId++) {
                        if(userStr[eId]   === '"' &&
                           userStr[eId+1] === ',' &&
                           userStr[eId+2] === '"') {
                           break;
                        }
                        else {
                          email += userStr.charAt(eId);
                        }
                     }
                     //console.log('\nuser email is: ' + email);
                     //console.log('\n ====================================== \n');
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
                     //console.log('\n ======= Detecting name pattern ====== \n');
                     //console.log('\n ====================================== \n');
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
                     //console.log('\nuser name is: ' + userName);
                     //console.log('\n ====================================== \n');

                     rowArray.push({userName: userName, email: email, status:'Active'});
                     //console.log('rowArray[0].userName: ' + rowArray[0].userName +
                     //           '\nrowArray[0].email: ' + rowArray[0].email);

                     this.setState({
                       tableData: rowArray
                     });
                     // Reset the local variables
                     userName = "";
                     email    = "";
                   }
                }

              }
          });

          xhr.send(formData);
       //}

    }

    render() {
      return (
        <div>
          <Card className="container"  style={marginMedium}>
              <CardTitle title="Administration Page"
              subtitle="This is a restrict page."
              style={textCenter}/>

            <Tabs>
              <TabList>
                 <Tab>User List</Tab>
                 <Tab>Reports</Tab>
                 <Tab>Dashboard</Tab>
              </TabList>

               <TabPanel>
                 <h3>Displaying list of users</h3>
                 <Table>
                    <TableHeader>
                       <TableRow>
                         <TableHeaderColumn>Name</TableHeaderColumn>
                         <TableHeaderColumn>e-mail</TableHeaderColumn>
                         <TableHeaderColumn>Status</TableHeaderColumn>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {this.state.tableData.map( (row, index) => (
                         <TableRow key={index}>
                           <TableRowColumn>{row.userName}</TableRowColumn>
                           <TableRowColumn>{row.email}</TableRowColumn>
                           <TableRowColumn>{row.status}</TableRowColumn>
                         </TableRow>
                       ))}
                    </TableBody>
                 </Table>
               </TabPanel>

               <TabPanel>
                  <h3>Displaying User Reports</h3>
               </TabPanel>

               <TabPanel>
                 <h3>Displaying Dashboard status</h3>
               </TabPanel>
            </Tabs>

          </Card>

        </div>

      );
    }
}

export default Admin;
