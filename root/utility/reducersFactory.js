import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';

const combineReducers = config => {
  const defaultStore = fromJS(
    Object.keys(config).reduce((a, key) => {
      a[key] = config[key](undefined, []);
      return a;
    }, {})
  );
  return (state = defaultStore, action) => {
    return Object.keys(config).reduce((state, key) => {
      const reducer = config[key];
      const previousState = state.get(key);
      const newValue = reducer(previousState, action);
      if (newValue === undefined) {
        throw new Error(`A reducer returned undefined when reducing key::"${key}"`);
      }
      return state.set(key, newValue);
    }, state);
  };
};

export const reducersFactory = reducers => combineReducers({ ...reducers, router: routerReducer });
