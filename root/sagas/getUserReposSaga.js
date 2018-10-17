import { take, call, put, apply, select } from "redux-saga/effects";
import { authSelector } from "../selectors";
import { START_GET_USER_REPOS, setRepos } from "../actions";
import fetch from "cross-fetch";

export function* getUserReposSaga() {
  yield take(START_GET_USER_REPOS);

  const auth = yield select(authSelector);

  const fetchPayload = {
    method: "get",
    headers: {
      "content-type": "application/json",
    }
  };

  fetchPayload.credentials = "include";

  const response = yield call(
    fetch,
    `https://api.github.com/users/${auth.username}/repos`,
    fetchPayload
  );
  const repos = yield apply(response, response.json);

  yield put(setRepos(repos));
}
