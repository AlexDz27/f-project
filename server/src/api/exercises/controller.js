import { Exercises } from '.'
import {notFound, success} from "../../services/response/index";

const Exercise = require('./model');

export const getAll = (req, res, next) => {
  Exercise.find({})
    .then(notFound(res))
    .then(success(res))
    .catch(next)
}

export const getChest = (req, res, next) => {
  Exercise.find({group: "Chest"})
    .then(notFound(res))
    .then(success(res))
    .catch(next)
}

export const getBack = (req, res, next) => {
  Exercise.find({group: "Back"})
    .then(notFound(res))
    .then(success(res))
    .catch(next)
}

export const getArms = (req, res, next) => {
  Exercise.find({group: "Arms"})
    .then(notFound(res))
    .then(success(res))
    .catch(next)
}

export const getShoulders = (req, res, next) => {
  Exercise.find({group: "Shoulders"})
    .then(notFound(res))
    .then(success(res))
    .catch(next)
}

export const getLegs = (req, res, next) => {
  Exercise.find({group: "Legs"})
    .then(notFound(res))
    .then(success(res))
    .catch(next)
}

export const setup = (req, res) => {
  const newExercise = new Exercise({
    title: "Тяга рог блока",
    content: `<ul><ol>Тянем вверх</ol><ol>Тянем к себе</ol></ul>`,
    group: "Shoulders"
  })
  newExercise.save()

  res.json(newExercise)
}

