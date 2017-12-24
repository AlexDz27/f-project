import {success, notFound} from '../../services/response/'
import {Programs} from '.'
import mongoose from 'mongoose'

const Program = require('./model');
const User = require('../user/model');

//todo: mb nado uldali't
export const update = ({bodymen: {body}, params}, res, next) =>
  Programs.findById(params.id)
    .then(notFound(res))
    .then((programs) => programs ? Object.assign(programs, body).save() : null)
    .then((programs) => programs ? programs.view(true) : null)
    .then(success(res))
    .catch(next)

/** MY CODE **/
export const showOneProgram = ({params}, res, next) =>
  Program.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

exports.deleteOneProgram = (req, res, next) => {
  Promise.all([Program.remove(req.params.id), User.findOne({programs: {$elemMatch: {_id: req.params.id}}})])
    .then(([, user]) => {
      user.programs = user.programs.filter((program) => program._id + '' !== req.params.id);
      console.log(user.programs)
      return user.save();
    })
    .then(success(res, 200))
    .catch(next);
};

exports.updateOneProgram = (req, res, next) => {
/*  Program.findById(req.params.id, (err, program) => {
    if (err) return res.json(err)

    program.title = req.body.title;
    program.exercises = req.body.exercises;

    program.save((err, updatedProgram) => {
      if (err) return res.json(err)

      res.json(updatedProgram)
    })
  })*/
  Promise.all([Program.findById(req.params.id), User.findOne({programs: {$elemMatch: {_id: req.params.id}}})])
    .then(([program, user]) => {
      program.title = req.body.title;
      program.exercises = req.body.exercises;

      program.save()
      return user.save()
    })
    .then(success(res, 200))
    .catch(next);
}


exports.showAllPrograms = (req, res) => {
  Program.find({})
    .then(notFound(res))
    .then(success(res))
    .catch(next)
};

