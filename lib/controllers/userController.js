const { Router } = require('express');
const User = require('../models/User.js');
const UserArtists = require('../models/UserArtists.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allUsers = await User.getAll();

      res.send(allUsers);
    } catch (error) {
      next(error);
    }
  })
  .get('/artists', async (req, res, next) => {
    console.log('this route ran');
    try {
      const allUserArtists = await UserArtists.getAll();

      // res.json({ allUserArtists });
      res.send(allUserArtists);
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
  });
