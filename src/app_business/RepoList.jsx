import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

export class RepoList extends Component {
  render() {
    const { repos } = this.props;
    return (
      <div>
        {_.values(repos).map(r => {
          return <div k={r}>{r.name}</div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repos: window.state.apps.business.selectors.reposSelector(state)
});

export default connect(mapStateToProps)(RepoList);
