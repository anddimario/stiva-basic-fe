import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const contentService = {
  add,
  list,
  delete: _delete,
  get,
  update
};


function get(content) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), ...config.siteHeader }
  };

  const querystring = `?type=get&contentType=${content.contentType}&id=${content.id}`;
  return fetch(`${config.apiUrl}/contents${querystring}`, requestOptions).then(handleResponse);
}

function add(content) {
  const body = content;
  body.type = 'add';
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), ...config.siteHeader },
    body: JSON.stringify(body)
  };

  return fetch(`${config.apiUrl}/contents`, requestOptions).then(handleResponse);
}

function update(content) {
  const body = content;
  body.type = 'update';
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json', ...config.siteHeader },
    body: JSON.stringify(body)
  };

  return fetch(`${config.apiUrl}/contents`, requestOptions).then(handleResponse);
}


function list(contentType, filters) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), ...config.siteHeader }
  };
  let url = `${config.apiUrl}/contents?type=list&contentType=${contentType}`;

  if (filters) {
    filters = encodeURIComponent(filters);
    url += `&filters=${filters}`;
  }

  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(values) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), ...config.siteHeader }
  };

  const querystring = `?type=delete&id=${values.id}&contentType=${values.contentType}`;
  return fetch(`${config.apiUrl}/contents${querystring}`, requestOptions).then(handleResponse);
}

