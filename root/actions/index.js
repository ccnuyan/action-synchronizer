import { makeActionCreator } from '../utility';

export const SET_USERNAME = 'SET_USERNAME';
export const setUsername = makeActionCreator(SET_USERNAME, 'username');

export const START_GET_USER_REPOS = 'START_GET_USER_REPOS';
export const startGetUserRepos = makeActionCreator(START_GET_USER_REPOS);

export const SET_REPOS = 'SET_REPOS';
export const setRepos = makeActionCreator(SET_REPOS, 'repos');
