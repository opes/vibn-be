const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const Artist = require('../lib/models/Artist');

describe('Artist routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('does nothing important yet', async () => {
    const res = 'hi';

    expect(res).toEqual('hi');
  });
});
