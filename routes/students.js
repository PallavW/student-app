const express = require('express');
const router = express.Router();
const student = require('../services/students')

// GET
router.get('/',async function(req,res,next){
    try{
        res.json(await student.getMultiple())
    }
    catch(err){
        console.log(err.message);
    }
});

// POST
router.post('/', async function(req, res, next) {
    try {
        console.log(req.body);
      res.json(await student.create(req.body));
    } catch (err) {
      console.error(`Error while posting student: `, err.message);
      next(err);
    }
  });

module.exports = router;