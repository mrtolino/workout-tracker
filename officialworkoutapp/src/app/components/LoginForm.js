import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {withCookies, Cookies} from 'react-cookie';
import {withApollo} from 'react-apollo';
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
      filloutFieldsAlert: false
    };
  }

  componentWillMount() {
    if (this.props.cookies.get('token')) {
      this.props.history.push('/workoutlist');
    }
  }

  onCreateAccountForm() {
    this.setState({
      createAccount: true
    })
  }

  onLoginForm() {
    this.setState({
      createAccount: false
    })
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  onChangeReEnterPW(event) {
    this.setState({
      reEnteredPassword: event.target.value
    })
  }

  onChangeFirstName(event) {
    this.setState({
      fname: event.target.value
    })
  }

  onChangeLastName(event) {
    this.setState({
      lname: event.target.value
    })
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
          password: this.state.password
        }
      })
      .then(response => {
        if (response.data.login) {
          this.props.cookies.set('token', response.data.login, {maxAge: 60 * 60});
          this.props.history.push('/workoutlist');
        } else {
          this.setState({
            loginError: true,
            loginErrorMessage: 'Invalid credentials.',
            loading: false
          });
        }
      });

      this.setState({
        loading: true
      });
    } else {
      this.setState({
        filloutFieldsAlert: true
      })
    }
  }

  onCreateAccountSubmit() {
    if (this.state.password === this.state.reEnteredPassword &&
        (this.state.username.length > 0 && this.state.password.length > 0
        && this.state.fname.length > 0 && this.state.lname.length > 0)) {
      fetch('/api/createaccount',
        {
          method: 'POST',
          headers: new Headers({'content-type': 'application/json'}),
          body: JSON.stringify({
            type: 'CREATE_ACCOUNT',
            username: this.state.username,
            password: this.state.password,
            fname: this.state.fname,
            lname: this.state.lname
          })
        }
      )
      .then(response => response.json())
      .then(() => {
        this.onLoginSubmit();
      });

      this.setState({
        passwordMatchAlert: false
      });
    } else {
      if (this.state.password !== this.state.reEnteredPassword) {
        this.setState({
          passwordMatchAlert: true,
          filloutFieldsAlert: false
        });
      } else {
        this.setState({
          filloutFieldsAlert: true,
          passwordMatchAlert: false
        })
      }
    }
  }

  renderPasswordMatchAlert() {
    if (this.state.passwordMatchAlert) {
      return (
        <div className='alert alert-danger' role='alert'>
          <strong>Oops!</strong> Your passwords don't match.
        </div>
      );
    }
  }

  renderLoginErrorAlert() {
    if (this.state.loginError) {
      return (
        <div className='alert alert-danger' role='alert'>
          <strong>Oops!</strong> {this.state.loginErrorMessage}
        </div>
      );
    }
  }

  renderFilloutFieldsAlert() {
    if (this.state.filloutFieldsAlert) {
      return (
        <div className='alert alert-danger' role='alert'>
          Please make sure to fill out all fields.
        </div>
      );
    }
  }

  renderLoginProgressBar() {
    if (this.state.loading) {
      return (
        <div className='progress'>
          <div className='progress-bar progress-bar-striped progress-bar-animated prog-bar-width' role='progressbar'
            aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>
          </div>
        </div>
      );
    }
  }

  renderCreateAccountForm() {
    if (this.state.createAccount) {
      return (
        <div className='form-group'>
          <input className='form-control' type='text' placeholder='username'
            onChange={(e) => this.onChangeUsername(e)} />
          <input className='form-control input-margin-top' type='password' placeholder='password'
            onChange={(e) => this.onChangePassword(e)} />
          <input className='form-control input-margin-top' type='password' placeholder='re-enter password'
            onChange={(e) => this.onChangeReEnterPW(e)} />
          <input className='form-control input-margin-top' type='text' placeholder='first name'
            onChange={(e) => this.onChangeFirstName(e)} />
          <input className='form-control input-margin-top' type='text' placeholder='last name'
            onChange={(e) => this.onChangeLastName(e)} />
          <input className='btn btn-primary btn-block btn-margin-top no-gutters' type='button' value='Create my account!'
            onClick={() => this.onCreateAccountSubmit()} />
          <input className='btn btn-secondary btn-block btn-margin-top no-gutters' type='button' value='Already have an account?'
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
                filloutFieldsAlert: false
              });
              return this.onLoginForm();
            }} />
        </div>
      );
    }
  }

  renderLoginForm() {
    if (!this.state.createAccount) {
      return (
        <div className='cell medium-8'>
          <input className='' type='text' placeholder='username'
            onChange={(e) => this.onChangeUsername(e)} />
          <input className='' type='password' placeholder='password'
            onChange={(e) => this.onChangePassword(e)} />
          <input className='hollow button' type='button' value='Login'
            onClick={() => this.onLoginSubmit()} />
          <input className='hollow button' type='button' value='Create Account'
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
                filloutFieldsAlert: false
              });
              return this.onCreateAccountForm();
            }} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className='grid-x grid-margin-x'>
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
  cookies: PropTypes.object.isRequired
};

export default withApollo(withRouter(withCookies(LoginForm)));
