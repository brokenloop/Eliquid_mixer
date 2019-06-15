import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user-service.js';
import './LoginPage.css';


class SignUpPage extends React.Component {
  constructor(props) {
      super(props);

      // userService.logout();

      this.state = {
          username: '',
          password: '',
          repeatPassword: '',
          submitted: false,
          loading: false,
          error: '',
          passwordMismatch: false
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
      const { username, password, repeatPassword, returnUrl } = this.state;

      if (!(username && password && repeatPassword)) {
          return;
      }

      if (!(password === repeatPassword)) {
          this.setState({passwordMismatch: true})
          return;
      }

      this.setState({ loading: true });
      userService.createUser(username, password)
      .then( x => {
        this.props.history.push('/');
      })
      .catch(error => {
          console.log('error')
          console.log(error)
          this.setState({
            error: "Username already exists", 
            loading: false,
            submitted: false,
          });
      });
  }

  render() {
      const { username, password, repeatPassword, submitted, loading, passwordMismatch, error } = this.state;
      return (
          <div className="loginPage">
              <h2 className="pageTitle">Create Account</h2>
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
                  <div className={'form-group'}>
                      <input type="password" className="form-control" name="repeatPassword" placeholder="Repeat Password"  value={repeatPassword} onChange={this.handleChange} />
                      {submitted && !repeatPassword &&
                          <div className="help-block">Please repeat password</div>
                      }
                  </div>
                  {submitted && passwordMismatch &&
                    <div className={'alert alert-danger'}>Passwords must match!</div>
                  }
                  <div className="form-group">
                      <button className="btn btn-primary" disabled={loading}>Login</button>
                      {loading &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                  </div>
                  <Link to="/account">Already have an account? Sign in.</Link>
                  {error &&
                      <div className={'alert alert-danger'}>{error}</div>
                  }
              </form>
          </div>
      );
  }
}

export default SignUpPage;
