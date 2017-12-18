import mongoose, { Schema } from 'mongoose'

const programsSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

programsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Programs', programsSchema)
module.exports = mongoose.model('Program', programsSchema);

export const schema = model.schema
export default model
