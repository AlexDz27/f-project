import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {token} from "../../services/passport/index";

import {
  index, showMe, show, signUp, isLoggedIn , showMyPrograms,
  createMyProgram, updateMyProgram
} from './controller'
import { schema } from './model'
export User, { schema } from './model'
const User = require('./model');

const router = new Router()
const { email, password, username } = schema.tree

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me',
  token({ required: true }),
  showMe)

router.get('/check',
  token({ required: true }),
  isLoggedIn)

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin} [role=user] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  body({ email, password, username }),
  signUp)


/**PROGRAMS SECTION /users/...SOME_URL...  LISTED DOWN BELOW **/

/**
 * POST /:id/my_programs
 * CREATE a program for the user
 */
router.post('/:id/my_programs',
  token({required: true}),
  createMyProgram)

/**
 * GET /:id/my_programs
 * Get all programs for the user
 */
router.get('/:id/my_programs',
  token({required: true}),
  showMyPrograms)

/**
 * PUT /:id/my_programs
 * Update a program for the user
 */
/*router.put('/:id/my_programs',
  token({required: true}),
  updateMyProgram)*/

export default router
