const pool = require('../utils/pool.js');

module.exports = class Artist {
  id;
  artistsArray;

  constructor(row) {
    this.id = row.id;
    this.artistsArray = row.artists_array
  }

  static async insert({ artistsArray }) {
    const { rows } = await pool.query(
      'INSERT INTO artists (artists_array) VALUES($1::TEXT[]) RETURNING *',
      [artistsArray]
    );

    return new Artist(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM artists WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Artist(rows[0]);
  }

  static async findArtistsByUserId(id) {
    const { rows } = await pool.query(
      `SELECT * FROM users
      LEFT JOIN user_artists
      ON users.id=user_artists.user_id
      LEFT JOIN artists
      ON user_artists.artist_id=artists.id
      WHERE id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Artist(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM artists');

    return rows.map((row) => new Artist(row));
  }

  toJSON() {
    return {
      id: this.id,
      artistsArray: this.artistsArray,
    };
  }
};
