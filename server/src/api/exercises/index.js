import {
  getAll, getArms, getBack, getChest, getLegs, getShoulders, setup
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

/**
 * api/...
 * exercises/:part
 * GET
 * Get particular exercises which belong to a specified group from db
 */

router.get('/chest', getChest)

router.get('/back', getBack)

router.get('/arms', getArms)

router.get('/shoulders', getShoulders)

router.get('/legs', getLegs)

router.get('/setup', setup)


module.exports = router

