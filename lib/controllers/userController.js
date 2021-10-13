const { Router } = require('express');
const User = require('../models/User.js');
const Artist = require('../models/Artist');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allUsers = await User.getAll();

      res.send(allUsers);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id/artists', async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      const topArtists = await Artist.findArtistsByUserId(user.id);

      res.send(topArtists);
    } catch (error) {
      next(error);
    }
  })
  .post('/artists', async (req, res, next) => {
    try {
      const topArtists = await Artist.insert(req.body);

      res.send(topArtists);
    } catch (error) {
      next(error);
    }
  });
