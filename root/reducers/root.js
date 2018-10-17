import { fromJS } from "immutable";
import _ from "lodash";
import { SET_AUTH, SET_REPOS} from "../actions";

export const root = {
  [SET_AUTH](state, { auth }) {
    return state.set("auth", fromJS(auth));
  },
  [SET_REPOS](state, { repos }) {
    return state.set("repos", fromJS(_.keyBy(repos, r => r.id)));
  }
};
