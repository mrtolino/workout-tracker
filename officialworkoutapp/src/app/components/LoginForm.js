import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {withCookies, Cookies} from 'react-cookie';

import WorkoutList from './WorkoutList';
import {loginAuth, createAccount} from '../actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      createAccount: false
    };
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
    fetch('/api/login',
      {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          type: 'LOGIN_AUTH',
          username: this.state.username,
          password: this.state.password
        })
      }
    ).then(response => response.json())
    .then(json => {
      // check if login successful, then dispatch loginAuthSuccess
      // otherwise, dispatch loginAuthFailure
      if (json.message === 'ok') {
        this.props.cookies.set('token', json.token);
        this.props.history.push('/workoutlist');
      }
    })
  }

  onCreateAccountSubmit() {
    this.props.onCreateAccount(this.state.username, this.state.password, this.state.fname, this.state.lname);
  }

  renderCreateAccountForm() {
    if (this.state.createAccount) {
      return (
        <div className='form-group'>
          <input className='form-control' type='text' placeholder='username'
            onChange={(e) => this.onChangeUsername(e)} />
          <input className='form-control input-margin-top' type='password' placeholder='password'
            onChange={(e) => this.onChangePassword(e)} />
          <input className='form-control input-margin-top' type='text' placeholder='first name' onChange={(e) => this.onChangeFirstName(e)} />
          <input className='form-control input-margin-top' type='text' placeholder='last name' onChange={(e) => this.onChangeLastName(e)} />
          <input className='btn btn-primary btn-block btn-margin-top no-gutters' type='button' value='Create my account!'
            onClick={() => this.onCreateAccountSubmit()} />
          <input className='btn btn-secondary btn-block btn-margin-top no-gutters' type='button' value='Already have an account?'
            onClick={() => this.onLoginForm()} />
        </div>
      );
    }
  }

  renderLoginForm() {
    if (!this.state.createAccount) {
      return (
        <div className='form-group'>
          <input className='form-control' type='text' placeholder='username'
            onChange={(e) => this.onChangeUsername(e)} />
          <input className='form-control input-margin-top' type='password' placeholder='password'
            onChange={(e) => this.onChangePassword(e)} />
          <input className='btn btn-primary btn-block btn-margin-top no-gutters' type='button' value='Login'
            onClick={() => this.onLoginSubmit()} />
          <input className='btn btn-secondary btn-block btn-margin-top no-gutters' type='button' value='Create Account'
            onClick={() => this.onCreateAccountForm()} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          {this.renderLoginForm()}
          {this.renderCreateAccountForm()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginAuth: (username, password) => dispatch(loginAuth(username, password)),
    onCreateAccount: (username, password, fname, lname) => dispatch(createAccount(username, password, fname, lname))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withCookies(LoginForm)));
