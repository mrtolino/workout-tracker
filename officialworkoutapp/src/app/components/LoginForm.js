import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import WorkoutList from './WorkoutList';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      reEnteredPassword: '',
      fname: '',
      lname: '',
      createAccount: false,
      loginError: false,
      loginErrorMessage: '',
      loading: false,
      passwordMatchAlert: false,
      filloutFieldsAlert: false,
    };
  }

  componentWillMount() {
    if (this.props.cookies.get('token')) {
      this.props.history.push('/workoutlist');
    }
  }

  onCreateAccountForm() {
    this.setState({
      createAccount: true,
    });
  }

  onLoginForm() {
    this.setState({
      createAccount: false,
    });
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onChangeReEnterPW(event) {
    this.setState({
      reEnteredPassword: event.target.value,
    });
  }

  onChangeFirstName(event) {
    this.setState({
      fname: event.target.value,
    });
  }

  onChangeLastName(event) {
    this.setState({
      lname: event.target.value,
    });
  }

  onLoginSubmit() {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      this.props.client.query({
        query: gql`
          query LoginQuery($username: String!, $password: String!) {
            login(username: $username, password: $password)
          }
        `,
        variables: {
          username: this.state.username,
          password: this.state.password,
        },
      })
        .then((response) => {
          if (response.data.login) {
            this.props.cookies.set('token', response.data.login, { maxAge: 60 * 60 });
            this.props.client.query({
              query: gql`
                query UserQuery {
                  user {
                    fname,
                    lname
                  }
                }
              `
            })
              .then((response) => {
                if (response.data.user) {
                  this.props.cookies.set('name', `${response.data.user.fname} ${response.data.user.lname}`, { maxAge: 60 * 60 });
                }
                this.props.history.push('/workoutlist');
              })
          } else {
            this.setState({
              loginError: true,
              loginErrorMessage: 'Invalid credentials.',
              loading: false,
            });
          }
        });

      this.setState({
        loading: true,
      });
    } else {
      this.setState({
        filloutFieldsAlert: true,
      });
    }
  }

  onCreateAccountSubmit() {
    if (this.state.password === this.state.reEnteredPassword &&
        (this.state.username.length > 0 && this.state.password.length > 0
        && this.state.fname.length > 0 && this.state.lname.length > 0)) {
      this.props.client.mutate({
        mutation: gql`
          mutation Register($username: String!, $password: String!, $fname: String!, $lname: String!) {
            register(username: $username, password: $password, fname: $fname, lname: $lname) {
              username
            }
          }
        `,
        variables: {
          username: this.state.username,
          password: this.state.password,
          fname: this.state.fname,
          lname: this.state.lname,
        },
      })
        .then((response) => {
          if (response.data.register.username === this.state.username) {
            this.onLoginSubmit();
          } else {
          // show error alert
          }
        });

      this.setState({
        passwordMatchAlert: false,
      });
    } else if (this.state.password !== this.state.reEnteredPassword) {
      this.setState({
        passwordMatchAlert: true,
        filloutFieldsAlert: false,
      });
    } else {
      this.setState({
        filloutFieldsAlert: true,
        passwordMatchAlert: false,
      });
    }
  }

  renderPasswordMatchAlert() {
    if (this.state.passwordMatchAlert) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>Oops!</strong> Your passwords don't match.
        </div>
      );
    }
  }

  renderLoginErrorAlert() {
    if (this.state.loginError) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>Oops!</strong> {this.state.loginErrorMessage}
        </div>
      );
    }
  }

  renderFilloutFieldsAlert() {
    if (this.state.filloutFieldsAlert) {
      return (
        <div className="alert alert-danger" role="alert">
          Please make sure to fill out all fields.
        </div>
      );
    }
  }

  renderLoginProgressBar() {
    if (this.state.loading) {
      return (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated prog-bar-width"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      );
    }
  }

  renderCreateAccountForm() {
    if (this.state.createAccount) {
      return (
        <div className="medium-8 medium-offset-2 cell">
          <input
            className=""
            type="text"
            placeholder="username"
            onChange={e => this.onChangeUsername(e)}
          />
          <input
            className=""
            type="password"
            placeholder="password"
            onChange={e => this.onChangePassword(e)}
          />
          <input
            className=""
            type="password"
            placeholder="re-enter password"
            onChange={e => this.onChangeReEnterPW(e)}
          />
          <input
            className=""
            type="text"
            placeholder="first name"
            onChange={e => this.onChangeFirstName(e)}
          />
          <input
            className=""
            type="text"
            placeholder="last name"
            onChange={e => this.onChangeLastName(e)}
          />
          <input
            className="hollow button radius btn-margin-right"
            type="button"
            value="Create my account!"
            onClick={() => this.onCreateAccountSubmit()}
          />
          <input
            className="hollow button radius"
            type="button"
            value="Already have an account?"
            onClick={() => {
              this.setState({
                username: '',
                password: '',
                reEnteredPassword: '',
                fname: '',
                lname: '',
                createAccount: false,
                loginError: false,
                loginErrorMessage: '',
                loading: false,
                passwordMatchAlert: false,
                filloutFieldsAlert: false,
              });
              return this.onLoginForm();
            }}
          />
        </div>
      );
    }
  }

  renderLoginForm() {
    if (!this.state.createAccount) {
      return (
        <div className="medium-8 medium-offset-2 cell">
          <input
            className=""
            type="text"
            placeholder="username"
            onChange={e => this.onChangeUsername(e)}
          />
          <input
            className=""
            type="password"
            placeholder="password"
            onChange={e => this.onChangePassword(e)}
          />
          <input
            className="hollow button radius btn-margin-right"
            type="button"
            value="Login"
            onClick={() => this.onLoginSubmit()}
          />
          <input
            className="hollow button radius"
            type="button"
            value="Create Account"
            onClick={() => {
              this.setState({
                username: '',
                password: '',
                reEnteredPassword: '',
                fname: '',
                lname: '',
                createAccount: false,
                loginError: false,
                loginErrorMessage: '',
                loading: false,
                passwordMatchAlert: false,
                filloutFieldsAlert: false,
              });
              return this.onCreateAccountForm();
            }}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="grid-x grid-margin-x">
        {this.renderFilloutFieldsAlert()}
        {this.renderPasswordMatchAlert()}
        {this.renderLoginErrorAlert()}
        {this.renderLoginForm()}
        {this.renderCreateAccountForm()}
        {this.renderLoginProgressBar()}
      </div>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withApollo(withRouter(withCookies(LoginForm)));
