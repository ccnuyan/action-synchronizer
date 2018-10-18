import { createStore, compose, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMW from 'redux-thunk';
import { fromJS } from 'immutable';

import { reducersFactory } from './';

import { Synchronizer } from '../../synchronizer';

const composeEnhancers = compose;

const getGlobalStore = () => {
  return global.store;
};

export const synchronizer = new Synchronizer('root', getGlobalStore, true);

export const getStore = ({ defaultStore, reducers, sagas }) => {
  const sagaMW = createSagaMiddleware();
  // const loggerMW = createLogger({ collapsed: true });

  const middleWares = [sagaMW, thunkMW, synchronizer.middleware];

  // middleWares.push(loggerMW);

  const enhancer = composeEnhancers(applyMiddleware(...middleWares));

  const store = createStore(reducersFactory(reducers), fromJS(defaultStore), enhancer);

  global.store = store;

  Object.keys(sagas)
    .map(k => sagas[k])
    .forEach(sagaMW.run.bind(sagaMW));

  return { store };
};
