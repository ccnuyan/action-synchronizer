import _ from 'lodash';

export class Synchronizer {
  constructor(id, getStore, isParent) {
    this.id = id;
    this.getStore = getStore;
    this.isParent = isParent || false;
    this.listeners = {};

    this.dispatch = this.dispatch.bind(this);
    this.middleware = this.middleware.bind(this);
    this.registerListener = this.registerListener.bind(this);
  }

  // listener is webview ,iframe or their parent;
  registerListener(id, listener) {
    this.listeners[id] = listener;
  }

  // when message received
  dispatch(action) {
    // action.from = this.id;
    this.getStore().dispatch(action);
  }

  // all actions luanched from this store should announce the listeners with the from property;
  middleware(store) {
    return next => action => {
      next(action);

      if (typeof action !== 'object') {
        return;
      }

      if (!action.from) {
        // it's action from this store, just send action to all listeners
        action.from = this.id;

        _.keys(this.listeners).forEach(k => {
          this.listeners[k].postMessage(JSON.stringify({ type: 'sync_action', action }));
        });
        return;
      }

      if (action.from !== this.id) {
        // if parent, means it's action from another child, then send action to other children
        if (this.isParent) {
          _.keys(this.listeners).forEach(k => {
            if (k !== action.from) {
              this.listeners[k].postMessage(JSON.stringify({ type: 'sync_action', action }));
            }
          });
        }
        // if child, means it's action from the parent, then do nothing
      }
    };
  }
}
