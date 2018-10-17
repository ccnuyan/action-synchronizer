import { createSelector } from "reselect";

export const reposSelector = createSelector(
  state => state.get("root"),
  root => root.toJS().repos
);
