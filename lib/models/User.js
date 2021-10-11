const pool = require('../utils/pool.js');

module.exports = class User {
  id;
  displayName;
  email;
  profileURL;
  image;

  constructor(row) {
    this.id = row.id;
    this.displayName = row.spotify_username;
    this.email = row.spotify_email;
    this.profileURL = row.spotify_profile;
    this.image = row.spotify_image;
  }

  static async insert({ displayName, email, profileURL, image }) {
    const { rows } = await pool.query(
      'INSERT INTO users (spotify_username, spotify_email, spotify_profile, spotify_image) VALUES ($1, $2, $3, $4) RETURNING *',
      [displayName, email, profileURL, image]
    );

    return new User(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async findByDisplayName(displayName) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE spotify_username=$1',
      [displayName]
    );

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM users');

    return rows.map((row) => new User(row));
  }

  toJSON() {
    return {
      id: this.id,
      displayName: this.displayName,
      email: this.email,
      profileURL: this.profileURL,
      image: this.image,
    };
  }
};
