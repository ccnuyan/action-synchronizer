import _ from 'lodash';

export class Synchronizer {
  constructor(id, getStore, isParent) {
    this.id = id;
    this.getStore = getStore;
    this.isParent = isParent || false;
    this.listerners = {};

    this.dispatch = this.dispatch.bind(this);
    this.middleware = this.middleware.bind(this);
    this.registerListerner = this.registerListerner.bind(this);
  }

  // listerner is webview ,iframe or their parent;
  registerListerner(id, listerner) {
    this.listerners[id] = listerner;
  }

  // when message received
  dispatch(action) {
    // action.from = this.id;
    this.getStore().dispatch(action);
  }

  // all actions luanched from this store should announce the listerners with the from property;
  middleware(store) {
    return next => action => {
      next(action);

      if (typeof action !== 'object') {
        return;
      }

      if (!action.from) {
        // it's action from this store, just send action to all listerners
        action.from = this.id;

        _.keys(this.listerners).forEach(k => {
          this.listerners[k].postMessage(JSON.stringify({ type: 'sync_action', action }));
        });
        return;
      }

      if (action.from !== this.id) {
        // if parent, means it's action from another child, then send action to other children
        if (this.isParent) {
          _.keys(this.listerners).forEach(k => {
            if (k !== action.from) {
              this.listerners[k].postMessage(JSON.stringify({ type: 'sync_action', action }));
            }
          });
        }
        // if child, means it's action from the parent, then do nothing
      }
    };
  }
}
