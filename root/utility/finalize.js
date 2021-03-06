import _ from 'lodash';
import { createReducer, getStore } from './';

export const finalize = apps => {
  const backend = _.reduce(
    apps,
    (result, value, key) => {
      return {
        defaultStore: {
          ...(result.defaultStore || {}),
          ...(value.defaultStore || {})
        },
        reducers: {
          ...(result.reducers || {}),
          ...(value.reducers || {})
        },
        sagas: {
          ...(result.sagas || {}),
          ...(value.sagas || {})
        }
      };
    },
    {}
  );

  backend.reducers = _.mapValues(backend.reducers, rdc => createReducer(null, rdc));

  return getStore(backend);
};
