import _ from 'lodash';
import { createReducer } from '../../root/utility';
import { getStoreAndHistory } from './';

export const finalize = (apps, synchronizer) => {
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

  return getStoreAndHistory(backend, synchronizer);
};
