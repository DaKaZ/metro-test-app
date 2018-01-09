import { Platform } from 'react-native';

const globalConfig = {
  development: {
    name: 'FODlink',
    version: '0.0.1',
    apiHost: Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'https://localhost:3333',
    apiBase: '/api/v1'
  },
  staging: {
    apiHost: 'https://fodlink_staging.uscis.dhs.gov'
  },
  production: {
    apiHost: 'https://fodlink.uscis.dhs.gov'
  }
};

const config = () => {
  let currentEnv;
  if (typeof NODE_ENV === 'undefined') {
    currentEnv = 'development';
  } else {
    currentEnv = NODE_ENV;
  }

  let rtn = Object.assign(globalConfig.development);
  if (globalConfig[currentEnv]) {
    rtn = Object.assign(rtn, globalConfig[currentEnv]);
  }
  return rtn;
};

// console.log('returning config', config);
export default config;
