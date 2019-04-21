import React, { Component } from 'react';
import { userService } from '../../services/user-service';

class ProtectedPage extends Component {
    

  render() {
      let message = "hello";
      // message = userService.getProtected();
      userService.getProtected()
      .then(data => {
        console.log('Signed in')
        console.log(data)
      })
      .catch(e => {
        console.log('Not signed in')
        console.log(e)
      });
      // console.log(protectedResult);
        
    return message;
  }
}

export default ProtectedPage;
