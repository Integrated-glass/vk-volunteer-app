import {API_HOST} from './constants';

export default (url, method, payload) => {
  return fetch(API_HOST + '/api' + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return myJson;
    });
};
