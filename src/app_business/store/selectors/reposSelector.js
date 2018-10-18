import { createSelector } from 'reselect';

export const reposSelector = createSelector(state => state.get('business'), root => root.toJS().repos);
