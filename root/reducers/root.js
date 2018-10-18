import _ from 'lodash';
import { SET_USERNAME } from '../actions';

export const root = {
  [SET_USERNAME](state, { username }) {
    return state.set('username', username);
  }
};
