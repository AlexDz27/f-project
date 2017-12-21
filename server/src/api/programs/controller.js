import {success, notFound} from '../../services/response/'
import {Programs} from '.'
import mongoose from 'mongoose'
const Program = require('./model');
const User = require('../user/model');

export const create = ({bodymen: {body}}, res, next) =>
  Programs.create(body)
    .then((programs) => programs.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({querymen: {query, select, cursor}}, res, next) =>
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

export const update = ({bodymen: {body}, params}, res, next) =>
  Programs.findById(params.id)
    .then(notFound(res))
    .then((programs) => programs ? Object.assign(programs, body).save() : null)
    .then((programs) => programs ? programs.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({params}, res, next) =>
  Programs.findById(params.id)
    .then(notFound(res))
    .then((programs) => programs ? programs.remove() : null)
    .then(success(res, 204))
    .catch(next)

/** MY CODE **/
export const showOneProgram = ({params}, res, next) =>
  Program.findById(params.id, (err, program) => {
    if (err) return res.json(err)

    console.log(program);
    res.json(program)
  })

// export const deleteOneProgram = ({ params }, res, next) =>
//   Program.findById(params.id, (err, program) => {
//     if (err) return res.json(err)
//
//     program.remove(err => {
//       if (err) return res.json(err)
//
//       res.json({msg: 'removed!!!'})
//     })
//   })
exports.deleteOneProgram = (req, res, next) => {
  Promise.all([Program.findById(req.params.id), User.findOne({programs:{$elemMatch:{_id:(req.params.id)}}})])
    .then((responses) => {
     success(res, 200)(responses)
    })
    .catch(next);
}


exports.showAllPrograms = (req, res) => {
  Program.find({}, (err, programs) => {
    if (err) return res.json(err);

    res.json(programs);
  })
};

