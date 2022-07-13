const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try{
      const user_id = req.user.id;
      const items = await Item.getAll(user_id);
      res.json(items);
    } catch(err){
      next(err);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try{
      const user_id = req.user.id;
      const item = await Item.insert({ ...req.body, user_id });
      res.json(item);
    } catch(err){
      next(err);
    }
  })
  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try{
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch(err){
      next(err);
    }
  }).delete('/:id', authenticate, authorize, async (req, res, next) => {
    try{
      const item = await Item.getById(req.params.id);
      await Item.delete(req.params.id);
      res.json(item);
    } catch(err){
      next(err);
    }
  });
