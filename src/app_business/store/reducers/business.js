import { fromJS } from 'immutable';
import _ from 'lodash';
import { SET_REPOS } from '../../../../root/actions';

export const business = {
  [SET_REPOS](state, { repos }) {
    return state.set('repos', fromJS(_.keyBy(repos, r => r.id)));
  }
};
