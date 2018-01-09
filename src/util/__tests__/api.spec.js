import MockAdapter from 'axios-mock-adapter';
import api, { apiLogin } from '../api';

const axios = require('axios');

const mockAxios = new MockAdapter(axios);

describe('/src/utils/api', () => {
  beforeEach(() => {
    mockAxios.onGet('https://localhost:3333/api/v1/testing').reply(200, {
      result: {
        org: ['1', '2', '3']
      }
    });
    mockAxios.onPatch('https://localhost:3333/api/v1/testing').reply(200, {
      result: {
        org: ['1', '2', '3']
      }
    });
    mockAxios.onPut('https://localhost:3333/api/v1/testing').reply(200, {
      result: {
        org: ['1', '2', '3']
      }
    });
    mockAxios.onPost('https://localhost:3333/api/v1/testing').reply(200, {
      result: {
        org: ['1', '2', '3']
      }
    });
    mockAxios.onDelete('https://localhost:3333/api/v1/testing').reply(200, {
      result: {
        org: ['1', '2', '3']
      }
    });
    mockAxios.onPost('https://localhost:3333/api/v1/sessions').reply(200, {
      result: {
        user: { name: 'John Doe', email: 'doe@nowhere.com' },
        apiToken: 'random token here'
      }
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('exports a proper api object', async () => {
    expect(typeof api).toEqual('function');
    const response = await api('/testing');
    expect(response.status).toEqual(200);
  });

  it('handles all known methods', async () => {
    let response = await api('/testing', 'GET');
    expect(response.status).toEqual(200);
    response = await api('/testing', 'PUT');
    expect(response.status).toEqual(200);
    response = await api('/testing', 'PATCH');
    expect(response.status).toEqual(200);
    response = await api('/testing', 'POST', { hello: 'world' });
    expect(response.status).toEqual(200);
    response = await api('/testing', 'DELETE');
    expect(response.status).toEqual(200);
  });

  it('throws error on unkown method', () => {
    expect(() => { api('/', 'BLAH'); }).toThrow('Invalid Method');
  });

  it('properly logs in using apiLogin', async () => {
    const response = await apiLogin({ email: 'doe@nowhere.com', password: 'password' });
    expect(response.status).toEqual(200);
  });
});
