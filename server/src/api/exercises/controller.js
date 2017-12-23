import { success, notFound } from '../../services/response/'
import { Exercises } from '.'

const Exercise = require('./model');

// export const create = ({ bodymen: { body } }, res, next) =>
//   Exercises.create(body)
//     .then((programs) => programs.view(true))
//     .then(success(res, 201))
//     .catch(next)
//
// export const index = ({ querymen: { query, select, cursor } }, res, next) =>
//   Exercises.count(query)
//     .then(count => Programs.find(query, select, cursor)
//       .then((programs) => ({
//         count,
//         rows: programs.map((programs) => programs.view())
//       }))
//     )
//     .then(success(res))
//     .catch(next)

// export const show = ({ params }, res, next) =>
//   Exercises.findById(params.id)
//     .then(notFound(res))
//     .then((programs) => programs ? programs.view() : null)
//     .then(success(res))
//     .catch(next)

// export const update = ({ bodymen: { body }, params }, res, next) =>
//   Exercises.findById(params.id)
//     .then(notFound(res))
//     .then((programs) => programs ? Object.assign(programs, body).save() : null)
//     .then((programs) => programs ? programs.view(true) : null)
//     .then(success(res))
//     .catch(next)
//
// export const destroy = ({ params }, res, next) =>
//   Exercises.findById(params.id)
//     .then(notFound(res))
//     .then((programs) => programs ? programs.remove() : null)
//     .then(success(res, 204))
//     .catch(next)

/** MY CODE **/
// export const show = ({ params }, res, next) =>
//   Programs.findById(params.id)
//     .then(notFound(res))
//     .then((programs) => programs ? programs.view() : null)
//     .then(success(res))
//     .catch(next)
//

// exports.show = (req, res) => {
//   Program.find({}, (err, programs) => {
//     if (err) return res.json(err);
//
//     res.json(programs);
//   })
// };

export const getAll = (req, res) => {
  Exercise.find({}, (err, exercises) => {
    if (err) return res.json(err);

    res.json(exercises)
  })
}

export const getChest = (req, res) => {
  Exercise.find({group: "Chest"}, (err, exercises) => {
    if (err) return res.json(err);

    res.json(exercises)
  })
}

export const getBack = (req, res) => {
  Exercise.find({group: "Back"}, (err, exercises) => {
    if (err) return res.json(err);

    res.json(exercises)
  })
}

export const getArms = (req, res) => {
  Exercise.find({group: "Arms"}, (err, exercises) => {
    if (err) return res.json(err);

    res.json(exercises)
  })
}

export const getShoulders = (req, res) => {
  Exercise.find({group: "Shoulders"}, (err, exercises) => {
    if (err) return res.json(err);

    res.json(exercises)
  })
}

export const getLegs = (req, res) => {
  Exercise.find({group: "Legs"}, (err, exercises) => {
    if (err) return res.json(err);

    res.json(exercises)
  })
}

// export const setup = (req, res) => {
//   const newExercise = new Exercise({
//     title: "Рвзодки глей",
//     content: "раз разд",
//     group: "Shoulders"
//   })
//   newExercise.save()
//
//   res.json(newExercise)
// }

