import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import thunkMW from 'redux-thunk';
import { fromJS } from 'immutable';

import { reducersFactory } from '../../../root/utility';
import { getQuery, history } from './';

// logger
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export const getStoreAndHistory = ({ defaultStore, reducers, sagas }) => {
  const sagaMW = createSagaMiddleware();
  const loggerMW = createLogger({ collapsed: true });
  const routerMW = routerMiddleware(history);

  const middleWares = [sagaMW, thunkMW, routerMW];
  getQuery()['logger'] && middleWares.push(loggerMW);

  const enhancer = composeEnhancers(applyMiddleware(...middleWares));

  const store = createStore(reducersFactory(reducers), fromJS(defaultStore), enhancer);

  Object.keys(sagas)
    .map(k => sagas[k])
    .forEach(sagaMW.run.bind(sagaMW));

  return { store, history };
};
