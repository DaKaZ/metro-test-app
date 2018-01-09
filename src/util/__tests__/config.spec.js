import Config from '../config';

describe('/src/utils/config', () => {
  it('returns a valid config object', () => {
    const config = Config();
    expect(config.name).toBeDefined();
    expect(config.version).toBeDefined();
    expect(config.apiHost).toBeDefined();
    expect(config.apiBase).toBeDefined();
  });

  it('works in all environemnts', () => {
    const origEnv = global.NODE_ENV;
    global.NODE_ENV = 'randomjimberish';
    let config = Config();
    expect(config.apiBase).toEqual('/api/v1');
    global.NODE_ENV = 'production';
    config = Config();
    expect(config.name).toEqual('FODlink');
    expect(config.apiHost).toEqual('https://fodlink.uscis.dhs.gov');
    global.NODE_ENV = 'staging';
    config = Config();
    expect(config.apiHost).toEqual('https://fodlink_staging.uscis.dhs.gov');
    global.NODE_ENV = origEnv;
  });
});
