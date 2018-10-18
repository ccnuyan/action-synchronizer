import { createSelector } from 'reselect';

export const usernameSelector = createSelector(state => state.get('root'), root => root.toJS().username);
