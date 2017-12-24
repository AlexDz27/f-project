import {token} from "../../services/passport/index";

import {deleteOneProgram, showAllPrograms, showOneProgram, updateOneProgram} from "./controller";

const programsController = require('./controller')
const Program = require('./model');

const express = require('express');
const router = express.Router();

/**
 * GET /programs
 * Get all programs from all users
 */
router.get('/', showAllPrograms)

/**
 * GET /programs/:id
 * Get one program for the user
 */
router.get('/:id',
  token({required: true}),
  showOneProgram)

/**
 * PUT /programs/:id
 * Update one program for the user
 */

router.put('/:id',
  token({required: true}),
  updateOneProgram)

/**
 * DELETE /programs/:id
 * Delete one program for the user
 */
router.delete('/:id',
  token({required: true}),
  deleteOneProgram)

module.exports = router
