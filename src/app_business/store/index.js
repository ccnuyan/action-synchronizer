import '../../../root';
import * as selectors from './selectors';
// import * as actions from "./actions";
import * as reducers from './reducers';
// import * as sagas from "./sagas";
// import defaultStore from "./webStore.js";

import { finalize } from '../../utility';

const business = {
  defaultStore: {
    business: {
      repos: {}
    }
  },
  reducers: reducers,
  sagas: {},
  selectors: selectors,
  actions: {}
};

global.state.finalize = finalize;
global.state.eat(global.state, 'business', business);
