const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Artist = require('../models/Artist');

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
  // .get('/:id/topart', async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     const topArtists = await Artist.findArtistsByUserId(id);

  //     res.send(topArtists);
  //   } catch (error) {
  //     next(error);
  //   }
  // })
  .post('/', async (req, res, next) => {
    try {
      const topArtists = await Artist.insert(req.body);

      res.send(topArtists);
    } catch (error) {
      next(error);
    }
  });
