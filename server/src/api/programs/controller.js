import { success, notFound } from '../../services/response/'
import { Programs } from '.'

const Program = require('./model');

export const create = ({ bodymen: { body } }, res, next) =>
  Programs.create(body)
    .then((programs) => programs.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Programs.count(query)
    .then(count => Programs.find(query, select, cursor)
      .then((programs) => ({
        count,
        rows: programs.map((programs) => programs.view())
      }))
    )
    .then(success(res))
    .catch(next)

// export const show = ({ params }, res, next) =>
//   Programs.findById(params.id)
//     .then(notFound(res))
//     .then((programs) => programs ? programs.view() : null)
//     .then(success(res))
//     .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Programs.findById(params.id)
    .then(notFound(res))
    .then((programs) => programs ? Object.assign(programs, body).save() : null)
    .then((programs) => programs ? programs.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Programs.findById(params.id)
    .then(notFound(res))
    .then((programs) => programs ? programs.remove() : null)
    .then(success(res, 204))
    .catch(next)

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

