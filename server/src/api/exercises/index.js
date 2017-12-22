const exercisesController = require('./controller')
const Exercise = require('./model');

import {
  getAll, getChest
} from './controller'

const express = require('express');
const router = express.Router();


/**
 * api/...
 * exercises/all_exercises
 * GET
 * Get all exercises from db
 */

router.get('/', getAll)

router.get('/chest', getChest)

// router.get('/setup', setupLegs)


module.exports = router

