import '../../root/root';
// import * as selectors from "./selectors";
// import * as actions from "./actions";
// import * as reducers from "./reducers";
// import * as sagas from "./sagas";
// import defaultStore from "./webStore.js";

import { finalize } from './utility';

const web = {
  defaultStore: {},
  reducers: {},
  sagas: {},
  selectors: {},
  actions: {}
};

global.state.finalize = finalize;
global.state.eat(global.state, 'web', web);
