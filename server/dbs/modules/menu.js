const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MenuSchema = new Schema({
  _id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    unique: true,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  child: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('Menu', MenuSchema)
