// import { Router } from 'express'
// import { middleware as query } from 'querymen'
// import { middleware as body } from 'bodymen'
// import { create, index, show, update, destroy } from './controller'
// import { schema } from './model'
// import {query} from "express";
// import index from "../../services/express/index";
import {token} from "../../services/passport/index";
// export Programs, { schema } from './model'

import {deleteOneProgram, showAllPrograms, showOneProgram, updateOneProgram} from "./controller";

const programsController = require('./controller')
const Program = require('./model');

const express = require('express');
const router = express.Router();
//
// const router = new Router()
// const { title, content } = schema.tree
//
// /**
//  * @api {post} /programs Create programs
//  * @apiName CreatePrograms
//  * @apiGroup Programs
//  * @apiPermission master
//  * @apiParam {String} access_token master access token.
//  * @apiParam title Programs's title.
//  * @apiParam content Programs's content.
//  * @apiSuccess {Object} programs Programs's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Programs not found.
//  * @apiError 401 master access only.
//  */
// router.post('/',
//   token({ required: true }),
//   body({ title, content }),
//   create)
//
// /**
//  * @api {get} /programs Retrieve programs
//  * @apiName RetrievePrograms
//  * @apiGroup Programs
//  * @apiPermission master
//  * @apiParam {String} access_token master access token.
//  * @apiUse listParams
//  * @apiSuccess {Number} count Total amount of programs.
//  * @apiSuccess {Object[]} rows List of programs.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 401 master access only.
//  */
// router.get('/',
//   query(),
//   index)
//
// /**
//  * @api {get} /programs/:id Retrieve programs
//  * @apiName RetrievePrograms
//  * @apiGroup Programs
//  * @apiPermission master
//  * @apiParam {String} access_token master access token.
//  * @apiSuccess {Object} programs Programs's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Programs not found.
//  * @apiError 401 master access only.
//  */
/**
 * GET /programs
 * Get all programs from all users
 */
//todo: add admin role to get all the programs, not all users - пока так, чтобы легче проверять
router.get('/', showAllPrograms)

/**
 * GET /programs/:id
 * Get one program for the user
 */
router.get('/:id',
  token({required: true}),
  showOneProgram)

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

//
// /**
//  * @api {put} /programs/:id Update programs
//  * @apiName UpdatePrograms
//  * @apiGroup Programs
//  * @apiPermission master
//  * @apiParam {String} access_token master access token.
//  * @apiParam title Programs's title.
//  * @apiParam content Programs's content.
//  * @apiSuccess {Object} programs Programs's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Programs not found.
//  * @apiError 401 master access only.
//  */
// router.put('/:id',
//   token({ required: true }),
//   body({ title, content }),
//   update)
//
// /**
//  * @api {delete} /programs/:id Delete programs
//  * @apiName DeletePrograms
//  * @apiGroup Programs
//  * @apiPermission master
//  * @apiParam {String} access_token master access token.
//  * @apiSuccess (Success 204) 204 No Content.
//  * @apiError 404 Programs not found.
//  * @apiError 401 master access only.
//  */
// router.delete('/:id',
//   token({ required: true }),
//   destroy)
//
// export default router
module.exports = router
