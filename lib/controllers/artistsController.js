const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Artist = require('../models/Artist');
const UserArtists = require('../models/UserArtists');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allUsers = await Artist.getAll();

      res.send(allUsers);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await Artist.findById(id);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id/topart', async (req, res, next) => {
    try {
      const id = req.params.id;
      const topArtists = await Artist.findArtistsByUserId(id);

      res.send(topArtists);
    } catch (error) {
      next(error);
    }
  })
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      console.log(req);
      const artists = await Promise.all(req.body?.artistsArray?.map(async (artistObj) => {
        let artist = await Artist.findById(artistObj.id);
        if(!artist) artist = await UserArtists.insert({userId: req.user.id, artistId: artist.id});
        return artist;
      }))

      res.send(artists);
    } catch (error) {
      next(error);
    }
  });
