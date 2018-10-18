import { fromJS } from 'immutable';
import _ from 'lodash';
import { SET_USERNAME } from '../../../../root/actions';

export const auth = {
  [SET_USERNAME](state, { auth }) {
    return state.set('auth', fromJS(auth));
  }
};
