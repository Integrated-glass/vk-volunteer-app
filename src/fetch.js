const SERVER_BASE = 'https://demo130.foxtrot.vkhackathon.com/api';

export default (url, method, payload) => {
  return fetch(SERVER_BASE + url, {
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
