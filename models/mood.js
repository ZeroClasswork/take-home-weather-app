const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoodSchema = new Schema({
  moodRating: { type: Number, required: true },
  location: { type: Number, required: true },
  degreesF: { type: Number, required: true },
})

module.exports = mongoose.model('Mood', MoodSchema)