import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

export class LoginForm extends Component {
  onGetReposClick = () => {
    this.props.startGetUserRepos();
  };

  render() {
    const { username } = this.props;
    return (
      <div>
        <div>{username}</div>
        <div>
          <button onClick={this.onGetReposClick}>get repos</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: window.state.apps.root.selectors.usernameSelector(state)
});

const mapDispatchToProps = d => ({
  startGetUserRepos: () => d(window.state.apps.root.actions.startGetUserRepos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
