import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMW from 'redux-thunk';
import { fromJS } from 'immutable';

import { reducersFactory } from './';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export const getStore = ({ defaultStore, reducers, sagas }) => {
  const sagaMW = createSagaMiddleware();
  const loggerMW = createLogger({ collapsed: true });

  const middleWares = [sagaMW, thunkMW];

  middleWares.push(loggerMW);

  const enhancer = composeEnhancers(applyMiddleware(...middleWares));

  const store = createStore(reducersFactory(reducers), fromJS(defaultStore), enhancer);

  Object.keys(sagas)
    .map(k => sagas[k])
    .forEach(sagaMW.run.bind(sagaMW));

  return { store };
};
