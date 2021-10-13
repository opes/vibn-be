const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const Artist = require('../lib/models/Artist');
const User = require('../lib/models/User');
const app = require('../lib/app');

describe('Artist routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('Finds an users Artist by ID', async () => {
    const artist = await Artist.insert({
      artistName: 'Pierce The Veil',
      artistImage:
        'https://i.scdn.co/image/ab6761610000e5eb58c744a03131b95b9e846ff5',
      artistLink: 'https://open.spotify.com/artist/4iJLPqClelZOBCBifm8Fzv',
      artistGenre: ['post-hardcore', 'hardcore', 'screamo'],
    });

    const user = await User.insert({
      displayName: 'Sbeve',
      email: 'sbeve@busey.co',
      profileURL: 'http://spotify.com',
      image:
        'https://upload.wikimedia.org/wikipedia/en/8/8b/ST3_Steve_Harrington_portrait.jpg',
    });

    const UserArtist = await {
      userName: user.displayName,
      artist: artist.artistName,
      image: artist.artistImage,
      link: artist.artistLink,
      image: artist.artistImage,
    };

    const res = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .send(UserArtist);

    expect(res.body).toEqual({
      id: 1,
      ...UserArtist,
    });
  });
});
