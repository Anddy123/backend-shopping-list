const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
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
  });

// TO DO - implement items CRUD
