import { eat, finalize } from './utility';
import * as selectors from './selectors';
import * as actions from './actions';
import * as reducers from './reducers';
import * as sagas from './sagas';
import defaultStore from './rootStore.js';

const root = {
  defaultStore,
  reducers,
  sagas,
  selectors,
  actions: actions
};

global.state = { apps: {}, finalize, eat };
global.state.eat(global.state, 'root', root);
