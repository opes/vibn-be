const { Router } = require('express');
const Convo = require('../models/Convo');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allConvos = await Convo.getAll();

      res.send(allConvos);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const convo = await Convo.findById(id);

      res.send(convo);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id/convo', async (req, res, next) => {
    try {
      const id = req.params.id;
      const allConvosByUser = await Convo.findConvosByUserId(id);

      res.send(allConvosByUser);
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const convo = await Convo.insert(req.body);

      res.send(convo);
    } catch (error) {
      next(error);
    }
  });
