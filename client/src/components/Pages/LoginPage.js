// http://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { userService } from '../../services/user-service.js';
import UserContext from '../Context/ContextProvider';
import './LoginPage.css';


class LoginPage extends React.Component {
  constructor(props) {
      super(props);

      // userService.logout();

      this.state = {
          username: '',
          password: '',
          submitted: false,
          loading: false,
          error: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();

      this.setState({ submitted: true });
      const { username, password, returnUrl } = this.state;

      // stop here if form is invalid
      if (!(username && password)) {
          return;
      }

      this.setState({ loading: true });
      this.context.login(username, password);
  }

  render() {
      console.log(this.context)
      const { username, password, submitted, loading, error } = this.state;
      if (this.context.isLoggedIn) {
          console.log('FUCK');
        //   return <Redirect to="/" />
      }
      return (
          <div className="loginPage">
              <h2 className="pageTitle">Login</h2>
              <form name="form" onSubmit={this.handleSubmit}>
                  <div className={'form-group'}>
                      <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                      {submitted && !username &&
                          <div className="help-block">Username is required</div>
                      }
                  </div>
                  <div className={'form-group'}>
                      <input type="password" className="form-control" name="password" placeholder="Password"  value={password} onChange={this.handleChange} />
                      {submitted && !password &&
                          <div className="help-block">Password is required</div>
                      }
                  </div>
                  <div className="form-group">
                      <button className="btn btn-primary" disabled={loading}>Login</button>
                      {loading &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                  </div>
                  <Link to="/create_account">Don't have an account yet? Sign up here!</Link>
                  {error &&
                      <div className={'alert alert-danger'}>{error}</div>
                  }
              </form>
          </div>
      );
  }
}
LoginPage.contextType = UserContext;

export default LoginPage;
