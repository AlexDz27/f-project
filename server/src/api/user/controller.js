import {success, notFound} from '../../services/response/'
import {User} from '.'

const Program = require('../programs/model');

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({params}, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({user}, res) =>
  res.json(user.view(true))

export const create = ({bodymen: {body}}, res, next) =>
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

export const signUp = ({bodymen: {body}}, res, next) => {
  console.log(body);
  User.create(body)
    .then(console.log(body))
    .then(success(res, 201))
}

export const isLoggedIn = (req, res, next) => {
    const {_id,email, username, programs} = req.user;
    return res.json({_id,email, username, programs});
}

/** PROGRAMS SECTION **/

export const createMyProgram = (req, res, next) => {
  User.findById({_id: req.params.id})
    .then((user) => {
      if (!user) {
        res.json('User not found')
      } else {
        const newProgram = new Program({
          title: req.body.title,
          exercises: req.body.exercises
        });
        return newProgram.save()
          .then((program) => {
            console.log(program);
            user.programs.push(newProgram);
            return user.save();
          })
          .then(() => {
            res.json(user)
          })
      }
    }).catch(next);
};


// export const updateMyProgram = (req, res) => {
//   User.findById({_id: req.params.id})
//     .then((user) => {
//       if (!user) {
//         res.json('User not found')
//       } else {
//         const updatedProgram = new Program({
//           title: req.body.title,
//           exercises: req.body.exercises
//         })
//         return updatedProgram.save()
//           .then((program) => {
//             console.log(program);
//             user.programs
//           })
//       }
//     })
// }

/*export const updateMyProgram = (req, res) => {
  User.findById({_id: req.params.id}, (err, user) => {
    res.json(user.programs)
  })
}*/


export const showMyPrograms = (req, res) => {
  User.findById({_id: req.params.id}, (err, user) => {
    res.json(user.programs)
  })
}

