import { success, notFound } from '../../services/response/'
import { User } from '.'

const LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = new LocalStorage('./scratch');

// const programsController = require('../programs/controller');

const Program = require('../programs/model');

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then((user) => user.view(true))
    .then(console.log(body))
    .then(success(res, 201))
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const debugSignUp = ({ bodymen: { body } }, res, next) => { //bodymen -> body = req.body
  console.log(body);
  User.create(body)
    .then(console.log(body))
    .then(success(res, 201))
}

export const debugIsLoggedIn = (req, res, next) => {
  // console.log(req.body.token); // gets token, it works
  // const tokenValue = req.headers.authorization.substring(6);
  // console.log(tokenValue);
  User.findOne({token: req.headers.token}, (err, user) => {
    if (err) throw err;

    if (!user) {
      console.log('no scuh a user');
    } else {
      console.log('user found');
      res.send(user)
    }
  })
  console.log(req.headers);
}

// export const logOut = (req, res, next) => {
//
// }



// export const update = ({ bodymen: { body }, params, user }, res, next) =>
//   User.findById(params.id === 'me' ? user.id : params.id)
//     .then(notFound(res))
//     .then((result) => {
//       if (!result) return null
//       const isAdmin = user.role === 'admin'
//       const isSelfUpdate = user.id === result.id
//       if (!isSelfUpdate && !isAdmin) {
//         res.status(401).json({
//           valid: false,
//           message: 'You can\'t change other user\'s data'
//         })
//         return null
//       }
//       return result
//     })
//     .then((user) => user ? Object.assign(user, body).save() : null)
//     .then((user) => user ? user.view(true) : null)
//     .then(success(res))
//     .catch(next)
//
// export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
//   User.findById(params.id === 'me' ? user.id : params.id)
//     .then(notFound(res))
//     .then((result) => {
//       if (!result) return null
//       const isSelfUpdate = user.id === result.id
//       if (!isSelfUpdate) {
//         res.status(401).json({
//           valid: false,
//           param: 'password',
//           message: 'You can\'t change other user\'s password'
//         })
//         return null
//       }
//       return result
//     })
//     .then((user) => user ? user.set({ password: body.password }).save() : null)
//     .then((user) => user ? user.view(true) : null)
//     .then(success(res))
//     .catch(next)
//
// export const destroy = ({ params }, res, next) =>
//   User.findById(params.id)
//     .then(notFound(res))
//     .then((user) => user ? user.remove() : null)
//     .then(success(res, 204))
//     .catch(next)

/** PROGRAMS SECTION **/

// export const createMyProgram = ({ bodymen: { body } }, res, next) =>
//   Program.create(body)
//     .then((program) => program.view(true)) //may be not working
//     .then(success(res, 201))
//     .catch(next)

export const createMyProgram = (req, res) => {
  User.findById({_id: req.params.id}, (err, user) => {
    // res.json(user.programs)
    // if (err) res.json(err);

    if (!user) {
      res.json('User not found')
    } else {
      const newProgram = new Program({
        title: req.body.title,
        exercises: req.body.exercises
      });
      newProgram.save(err => {
        if (err) res.json(err)
      });
      user.programs.push(newProgram); //ADDING THE PROGRAM TO THE USER'S ACCOUNT
      user.save(err => {
        if (err) res.json(err)
      });
      // res.json(user.programs)
      // res.json(newProgram)
      res.json(user)

    }
    })
  }


export const showMyPrograms = (req, res) => {
  User.findById({_id: req.params.id}, (err, user) => {
  res.json(user.programs)
  })
}
