import React, { Component } from 'react';

export const UserContext = React.createContext({
  isLoggedIn: true
});

// class ContextProvider extends Component {
//   state = {
//     isLoggedIn: true
//   }
//   render() {
//     return (
//       <UserContext.Provider value={{
//           state: this.state,
//           logIn: () => this.setState({
//             isLoggedIn: true
//           }),
//           logOut: () => this.setState({
//             isLoggedIn: false
//           })
//       }}>
//       {this.props.children}
//       </UserContext.Provider>
//     );
//   }
// } 

export default UserContext;