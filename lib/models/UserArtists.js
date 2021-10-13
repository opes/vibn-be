const pool = require('../utils/pool.js');

module.exports = class UserArtists {
  userId;
  artistId;

  constructor(row) {
    this.userId = row.user_id;
    this.artistid = row.artist_id;
  }

  static async insert({ userId, artistId }) {
    const { rows } = await pool.query(
      'INSERT INTO user_artists (user_id, artist_id) VALUES ($1, $2) RETURNING *',
      [userId, artistId]
    );

    return new UserArtists(rows[0]);
  }

  toJSON() {
    return {
      userId: this.userId,
      artistId: this.artistId,
    };
  }
};
