import HMACSHA1 from 'hmacsha1';
import md5Hex from 'md5-hex';
import axios from 'axios';
import Config from './config';

const baseHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Date: (new Date()).toUTCString()
};

const signHeaders = (opts) => {
  const headers = { ...baseHeaders };

  if (opts.data) {
    let { data } = opts;
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    headers['Content-MD5'] = md5Hex(data);
  }

  const canonicalString = `${opts.method.toUpperCase()},${headers['Content-Type']},${headers['Content-MD5']},${opts.uri},${headers.Date}`;
  const signature = HMACSHA1(opts.secretKey, canonicalString);
  headers.Authorization = `APIAuth ${opts.id}:${signature}`;
  return headers;
};

const api = (uri, method = 'GET', data = null) => {
  const fullURI = `${Config().apiBase}${uri}`;
  const url = `${Config().apiHost}${fullURI}`;
  const instance = axios.create({
    headers: signHeaders({ method, data, uri: fullURI, secretKey: 'changeme' }),
    timeout: 30000
  });
  switch (method.toUpperCase()) {
    case 'GET':
      return instance.get(url);
    case 'PUT':
      return instance.put(url, data);
    case 'PATCH':
      return instance.patch(url, data);
    case 'POST':
      return instance.post(url, data);
    case 'DELETE':
      return instance.delete(url);
    default:
      throw new Error('Invalid Method');
  }
};

const apiLogin = (opts) => {
  // does not use signed headers
  const fullURI = `${Config().apiBase}/sessions`;
  const url = `${Config().apiHost}${fullURI}`;
  console.log('Logging in!', url);

  const instance = axios.create({
    headers: baseHeaders,
    timeout: 10000
  });
  return instance.post(url, { email: opts.email, password: opts.password });
};

export {
  apiLogin
};

export default api;
