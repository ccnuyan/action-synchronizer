import querystring from 'querystring';

export const getQuery = () => {
  return querystring.parse(window.location.search.slice(1));
};
