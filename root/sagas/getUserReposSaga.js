import { take, call, put, apply, select } from 'redux-saga/effects';
import { usernameSelector } from '../selectors';
import { START_GET_USER_REPOS, setRepos } from '../actions';
import fetch from 'cross-fetch';

export function* getUserReposSaga() {
  while (true) {
    yield take(START_GET_USER_REPOS);

    const username = yield select(usernameSelector);

    const fetchPayload = {
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    };

    const response = yield call(fetch, `https://api.github.com/users/${username}/repos`, fetchPayload);

    const repos = yield apply(response, response.json);

    console.log(1);

    yield put(setRepos(_.take(repos, Math.random() * 10 + 5)));
  }
}
