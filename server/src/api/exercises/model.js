import mongoose, { Schema } from 'mongoose'

const exercisesSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  group: {
    type: String
  }
}
)

const model = mongoose.model('Exercises', exercisesSchema)
module.exports = mongoose.model('Exercise', exercisesSchema);

export const schema = model.schema
export default model
