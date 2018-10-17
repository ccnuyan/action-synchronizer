import { createSelector } from 'reselect';

export const authSelector = createSelector(state => state.get('root'), root => root.toJS().auth);
